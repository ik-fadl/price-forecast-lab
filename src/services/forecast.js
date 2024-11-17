import utils from '@/utils/utils'
import AR from './ar_model'
import arima from './arima'
import ar_model from './ar_model'
import ma_model from './ma_model'

export default class Forecast {
  constructor(parameter, data_aktual) {
    this.parameter = parameter
    ;(this.data_aktual = data_aktual), (this.mape = 0), (this.items = [])
  }

  forecast_des() {
    let Lt = [0]
    let Tt = [0]
    let Error = [0]
    let Ft = [0]
    let Yt = this.data_aktual.map(item => item.harga)

    // Lt1 = Yt1
    Lt.push(Yt[1])
    // Tt1 = Yt1 - Yt0
    Tt.push(Yt[1] - Yt[0])
    // Ft1 = 0 (undefined)
    Ft.push(0)
    // error = 0
    Error.push(0)
    // START FORECAST
    for (let i = 2; i < Yt.length; i++) {
      // Lti = alpha * Yti + (1 - alpha) * (Lti-1 + Tti-1)
      Lt[i] =
        this.parameter.alpha * Yt[i] +
        (1 - this.parameter.alpha) * (Lt[i - 1] + Tt[i - 1])
      // Tti = beta * (Lti - Lti-1) + (1-beta) * Tti-1
      Tt[i] =
        this.parameter.beta * (Lt[i] - Lt[i - 1]) +
        (1 - this.parameter.beta) * Tt[i - 1]
      // Fti = Lti +Tti
      Ft[i] = Lt[i] + Tt[i]
      // Err = abs(Yti - Fti)
      Error[i] = Math.abs(Yt[i] - Ft[i]) / Yt[i]
    }

    let new_items = []

    for (let i = 0; i < this.data_aktual.length; i++) {
      new_items.push({
        periode: this.data_aktual[i].periode,
        x: this.data_aktual[i].periode,
        x2: this.data_aktual[i].periode,
        harga: this.data_aktual[i].harga,
        y: this.data_aktual[i].harga,
        level: Lt[i],
        trend: Tt[i],
        data_prediksi: Ft[i],
        y2: Ft[i],
        error: Error[i],
        color:
          Error[i] < 0.01 && i > 1 && this.data_aktual[i].color == undefined
            ? 'bg-green-100'
            : (this.data_aktual[i].color ?? ''),
      })
    }
    let err = Error.slice(2)
    this.mape = utils.numb((utils.sum(err) / err.length) * 100)
    this.items = new_items
  }
  prediction_des(n) {
    let last_level = this.items[this.items.length - 1].level
    let last_trend = this.items[this.items.length - 1].trend
    for (let i = 0; i < n; i++) {
      // Fti = Lt + (h.Tt)

      this.items[this.items.length] = {
        state: 'next',
        m: i == 0 ? i + 1 : i,
        periode: this.items.length + 1,
        level: last_level,
        x: this.items.length + 1,
        x2: this.items.length + 1,
        trend: last_trend,
        data_prediksi: last_level + (i + 1) * last_trend,
        y: 0,
        y2: last_level + (i + 1) * last_trend,
        color: 'bg-red-200',
      }
    }
  }

  forecast_ses() {
    // initial value
    let alpha = this.parameter.alpha
    let Ft = []
    let data_prediksi = []
    let Error = [0]

    for (let i = 0; i < this.data_aktual.length; i++) {
      // Ft = a . Xt-1 + (1 - a) . Ft-1
      let Xt = this.data_aktual[i].harga
      let _xt =
        i == 0 ? this.data_aktual[i].harga : this.data_aktual[i - 1].harga
      if (i == 0) Ft.push(Xt)
      else {
        Ft.push(alpha * _xt + (1 - alpha) * Ft[i - 1])
        Error.push(Math.abs(Xt - Ft[i]) / Xt)
      }
      data_prediksi.push({
        periode: this.data_aktual[i].periode,
        x: this.data_aktual[i].periode,
        x2: this.data_aktual[i].periode,
        harga: Xt,
        y: Xt,
        data_prediksi: Ft[i],
        y2: Ft[i],
        error: Error[i],
        color:
          Error[i] < 0.01 && i > 1 && this.data_aktual[i].color == undefined
            ? 'bg-green-100'
            : (this.data_aktual[i].color ?? ''),
      })
    }
    let err = Error.slice(1)

    this.mape = utils.numb((utils.sum(err) / err.length) * 100)
    this.items = data_prediksi
  }

  prediction_ses(n) {
    // Ft = a . Ft-1 + (1 - a) . Ft
    for (let i = 0; i < n; i++) {
      let xt = this.items[this.items.length - 1].harga
      let past_forecast = this.items[this.items.length - 1].y2

      let Ft =
        i == 0
          ? this.parameter.alpha * xt +
            (1 - this.parameter.alpha) * past_forecast
          : this.parameter.alpha * past_forecast +
            (1 - this.parameter.alpha) * past_forecast

      this.items[this.items.length] = {
        periode: this.items.length + 1,
        x: this.items.length + 1,
        x2: this.items.length + 1,
        harga: 0,
        y: 0,
        data_prediksi: Ft,
        y2: Ft,
        color: 'bg-red-200',
      }
    }
  }

  forecast_sma() {
    // SMA(3,3,3)
    let avg = this.parameter.avg
    let data_prediksi = []
    let Err = []
    let data = []

    for (let i = 0; i < this.data_aktual.length; i++) {
      let tanggal = this.data_aktual[i].periode
      let Yt = this.data_aktual[i].harga

      // cari data di mana index >= i dan i  <  i+avg
      data.push(
        this.data_aktual
          .filter((dt, index) => index >= i && index < i + avg)
          .map(dt2 => dt2.harga),
      )
      let Ft = i < avg ? 0 : utils.avg(data[i - avg])
      let err = 0
      if (i >= avg) {
        err = Math.abs(Yt - Ft) / Yt
        Err.push(err)
      }
      data_prediksi.push({
        periode: tanggal,
        x: tanggal,
        x2: tanggal,
        harga: Yt,
        y: Yt,
        data_prediksi: Ft,
        y2: Ft,
        error: err,
        color:
          err < 0.01 && i >= avg && this.data_aktual[i].color == undefined
            ? 'bg-green-100'
            : (this.data_aktual[i].color ?? ''),
      })
    }

    this.items = data_prediksi
    this.mape = utils.numb((utils.sum(Err) / Err.length) * 100)
  }

  prediction_sma(n) {
    let avg = this.parameter.avg
    for (let i = 0; i < n; i++) {
      let Ft = 0
      if (i == 0) {
        let last_data = this.data_aktual
          .filter((dt, index) => index <= this.data_aktual.length)
          .map(dt => dt.harga)
          .slice(-avg)
        Ft = utils.avg(last_data)
      } else {
        let data = this.items
          .filter((item, index) => index <= this.items.length)
          .slice(-avg)
        let avg_data = data.map(dt => (dt.harga ? dt.harga : dt.y2))
        Ft = utils.avg(avg_data)
      }
      this.items[this.items.length] = {
        periode: this.items.length + 1,
        x: this.items.length + 1,
        x2: this.items.length + 1,
        harga: 0,
        y: 0,
        data_prediksi: Ft,
        y2: Ft,
        color: 'bg-red-200',
      }
    }
  }

  forecast_wma() {
    let bobot = utils.sortNumber(this.parameter.bobot, true)
    let avg = this.parameter.avg
    let data_prediksi = []
    let Err = []
    let result = []

    for (let i = 0; i < this.data_aktual.length; i++) {
      let tanggal = this.data_aktual[i].periode
      let Yt = this.data_aktual[i].harga

      // cari data di mana index >= i dan i  <  i+avg
      let data = this.data_aktual
        .filter((dt, index) => index >= i && index < i + avg)
        .map(dt2 => dt2.harga)

      let r = []
      for (let j = 0; j < data.length; j++) {
        r.push(data[j] * bobot[j])
      }
      result.push(utils.sum(r))
      let Ft = i < avg ? 0 : result[i - avg]
      let err = 0
      if (i >= avg) {
        err = Math.abs(Yt - Ft) / Yt
        Err.push(err)
      }
      data_prediksi.push({
        periode: tanggal,
        x: tanggal,
        x2: tanggal,
        harga: Yt,
        y: Yt,
        data_prediksi: Ft,
        y2: Ft,
        error: err,
        color:
          err < 0.01 && i >= avg && this.data_aktual[i].color == undefined
            ? 'bg-green-100'
            : (this.data_aktual[i].color ?? ''),
      })
    }

    this.items = data_prediksi
    this.mape = utils.numb((utils.sum(Err) / Err.length) * 100)
  }

  // forecast_arima() {
  //   // identifikasi items
  //   let data = this.data_aktual.map(item => item.harga)
  //   // parameter p, d, q
  //   // differencing
  //   let differencing = []

  //   for (let i = 1; i < data.length; i++) {
  //     differencing.push(data[i] - data[i - 1])
  //   }
  //   let c = utils.avg(differencing)
  //   console.log(c)

  //   let p
  //   if (this.parameter.p == null) {
  //     // MENCARI PARAMETER P dengan ACF
  //     let acf = this.calculateACF(data, 5)
  //     let setACF = []

  //     for (let i = 0; i < acf.length; i++) {
  //       setACF.push(Math.abs(acf[i + 1] - acf[i]))
  //     }
  //     for (let j = 0; j < setACF.length; j++) {
  //       if (setACF[j] == utils.sortNumber(setACF, false)[0]) {
  //         p = j + 1
  //       }
  //     }
  //   } else {
  //     p = this.parameter.p
  //   }

  //   // Jika ACF menurun secara signifikan setelah satu atau dua lag, ini merupakan tanda stasionaritas.
  //   // Jika ACF tetap tinggi dalam beberapa lag pertama, data mungkin masih memiliki tren atau pola musiman.
  //   // didapat setelah perhitungan acf, data mengalami penurunan secara signifikan pada lag 1, maka data dianggap stasioner dg 1 kali differencing saja
  //   let d = this.parameter.d ?? p

  //   // MENCARI PARAMETER q DENGAN PACF
  //   let pacf = this.calculatePACF(data, 5)
  //   let q = this.parameter.q ?? pacf.find(pcf => pcf <= 0.2)

  //   // MENCARI PARAMETER ϕ
  //   // MODEL ARIMA(1,1,1)
  //   // ϕ = Cov(Yt, Yt-1) / Var(Yt-1)
  //   // rata-rata Y = c
  //   // Cov(Yt, Yt-1)
  //   let cov = []
  //   for (let i = 1; i < differencing.length; i++) {
  //     cov.push(
  //       Math.abs(differencing[i] - c) * Math.abs(differencing[i - 1] - c),
  //     )
  //   }
  //   cov = utils.sum(cov) / (cov.length - 1)
  //   // Var(Yt-1)
  //   let VR = []
  //   for (let i = 0; i < differencing.length; i++) {
  //     VR.push(Math.pow(differencing[i] - c, 2))
  //   }
  //   VR = utils.sum(VR) / (VR.length - 1)
  //   // NILAI ϕ
  //   // cov/var
  //   let phi = cov / VR

  //   // MENCARI PARAMETER θ

  //   // PREDIKSI
  //   // Yt = c + phi1 * Yt-1 + teta1*epst-1
  //   let data_prediksi = []
  //   let Ft = [0, 0],
  //     eps = [0, 0],
  //     teta = [0, 0.5]
  //   for (let i = 0; i < this.data_aktual.length; i++) {
  //     let Xt = this.data_aktual[i].harga
  //     let periode = this.data_aktual[i].periode

  //     if (i > 1) {
  //       Ft.push(
  //         this.data_aktual[i - 1].harga +
  //           c +
  //           phi *
  //             (this.data_aktual[i - 1].harga - this.data_aktual[i - 2].harga) +
  //           teta[1] * eps[i - 1],
  //       )
  //       eps.push(Xt - Ft[i])
  //     }
  //     data_prediksi.push({
  //       periode: periode,
  //       x: periode,
  //       x2: periode,
  //       harga: Xt,
  //       y: Xt,
  //       differencing: i == 0 ? 0 : differencing[i - 1],
  //       data_prediksi: Ft[i],
  //       y2: Ft[i],
  //       error: eps[i],
  //       color:
  //         eps[i] < 0.01 && i > 1 && this.data_aktual[i].color == undefined
  //           ? 'bg-green-100'
  //           : (this.data_aktual[i].color ?? ''),
  //     })
  //   }
  //   this.items = data_prediksi
  //   this.mape = utils.numb(
  //     (utils.sum(eps.slice(2)) / eps.slice(2).length) * 100,
  //   )

  //   console.log(phi)
  //   console.log(teta)
  //   console.log(c)
  // }

  // calculateACF(data, maxLag) {
  //   const n = data.length
  //   const mean = data.reduce((a, b) => a + b, 0) / n

  //   // Menghitung varians total
  //   const totalVariance = data.reduce(
  //     (sum, x) => sum + Math.pow(x - mean, 2),
  //     0,
  //   )

  //   const acf = []
  //   for (let k = 0; k <= maxLag; k++) {
  //     let covariance = 0
  //     for (let i = 0; i < n - k; i++) {
  //       covariance += (data[i] - mean) * (data[i + k] - mean)
  //     }
  //     acf.push(covariance / totalVariance)
  //   }

  //   return acf
  // }
  // calculatePACF(data, maxLag) {
  //   const n = data.length
  //   const mean = data.reduce((a, b) => a + b, 0) / n

  //   // Array untuk menyimpan nilai PACF
  //   const pacf = []

  //   // Hitung ACF untuk lag 1 (sama dengan PACF untuk lag 1)
  //   pacf.push(this.calculateACF(data, 1)[1])

  //   // Hitung PACF untuk lag lebih besar
  //   for (let k = 2; k <= maxLag; k++) {
  //     // Menggunakan regresi untuk PACF
  //     let sumLag = 0
  //     let sumProduct = 0
  //     for (let i = k; i < n; i++) {
  //       sumLag += (data[i - 1] - mean) * (data[i - k] - mean)
  //       sumProduct += (data[i] - mean) * (data[i - k] - mean)
  //     }

  //     // PACF untuk lag k
  //     const pacfValue = sumProduct / sumLag
  //     pacf.push(pacfValue)
  //   }

  //   return pacf
  // }

  // Fungsi untuk menghitung differencing
  // calculateDifferencing(data) {
  //   let differencing = [0] // Differencing pertama adalah 0 karena tidak ada nilai sebelumnya
  //   for (let i = 1; i < data.length; i++) {
  //     differencing.push(data[i] - data[i - 1])
  //   }
  //   return differencing
  // }

  // // Fungsi untuk menghitung prediksi sederhana
  // calculatePrediction(data, differencing) {
  //   let predictions = [0] // Asumsi awal prediksi pertama adalah 0
  //   for (let i = 1; i < data.length; i++) {
  //     predictions.push(data[i - 1] + differencing[i])
  //   }
  //   return predictions
  // }

  // // Fungsi untuk menghitung error antara data aktual dan prediksi
  // calculateError(data, predictions) {
  //   let errors = []
  //   for (let i = 0; i < data.length; i++) {
  //     errors.push(data[i] - predictions[i])
  //   }
  //   return errors
  // }
  // arima() {
  //   let actualData = this.data_aktual.map(dt => dt.harga)
  //   const differencing = this.calculateDifferencing(actualData)
  //   const predictions = this.calculatePrediction(actualData, differencing)
  //   const errors = this.calculateError(actualData, predictions)

  //   console.log(differencing)
  //   console.log(predictions)
  //   console.log(errors)
  // }
  forecast_arima() {
    // let differencing = this.calculateDifferencing()
    // console.log('differencing:')
    // console.log(differencing)

    // let ar = this.calculateAR(differencing)
    // let ma = this.calculateMA(differencing)

    // let _y = []
    // let err = []

    // for (let i = 0; i < differencing.length; i++) {
    //   if (i == 0) {
    //     _y.push(0)
    //     err.push(0)
    //   } else {
    //     _y.push(ar + ma)
    //     err.push(differencing[i] - _y[i])
    //   }
    // }
    // console.log('forecast')
    // console.log(_y)

    // let data_prediksi = this.inverseDifference()
    let data_prediksi = []
    let data = this.data_aktual.map(dt => dt.harga)
    // let avg_aktual = utils.avg(data)
    let p = this.parameter.p ?? 1
    let d = this.parameter.d ?? 0
    let q = this.parameter.q ?? 1
    // let rer = data.map(dt => dt - avg_aktual)
    // let ar = ar_model.calculateAR(data, p)
    // let ma = ma_model.calculateMA(data, rer, q)
    let result = arima.arima(data, p, d, q)
    let Err = []

    for (let i = 0; i < this.data_aktual.length; i++) {
      let tanggal = this.data_aktual[i].periode
      let Yt = this.data_aktual[i].harga
      Err.push(Math.abs(Yt - result[i]) / Yt)

      data_prediksi.push({
        periode: tanggal,
        x: tanggal,
        x2: tanggal,
        harga: Yt,
        y: Yt,
        data_prediksi: result[i],
        y2: result[i],
        error: Math.abs(Yt - result[i]) / Yt,
        color:
          Math.abs(Yt - result[i]) < 0.01 &&
          this.data_aktual[i].color == undefined
            ? 'bg-green-100'
            : (this.data_aktual[i].color ?? ''),
      })
    }

    this.items = data_prediksi
    let err = Err.slice(0).filter(er => er * 0 == 0)
    this.mape = utils.numb(utils.avg(err) * 100)
  }

  prediction_arima(n) {
    let data = this.data_aktual.map(dt => dt.harga)
    let p = this.parameter.p ?? 1
    let d = this.parameter.d ?? 0
    let q = this.parameter.q ?? 1

    const predictions = arima.arima(data, p, d, q)
    let lastDataPoint = data[data.length - 1]
    let futurePredictions = []

    const arCoefficients = []
    const maCoefficients = []

    let differencedData = [...data]
    for (let i = 0; i < d; i++) {
      differencedData = differencedData
        .slice(1)
        .map((val, index) => val - differencedData[index])
    }

    for (let i = 1; i <= p; i++) {
      arCoefficients.push(arima.autocorrelation(differencedData, i))
    }
    for (let i = 1; i <= q; i++) {
      maCoefficients.push(arima.autocorrelation(data, i))
    }

    for (let step = 0; step < n; step++) {
      let prediction = 0

      // AR part
      for (let j = 1; j <= p; j++) {
        if (predictions.length - j >= 0) {
          prediction +=
            predictions[predictions.length - j] * arCoefficients[j - 1]
        }
      }

      // MA part
      for (let j = 1; j <= q; j++) {
        if (data.length - j >= 0) {
          prediction +=
            (lastDataPoint - utils.avg(data)) * maCoefficients[j - 1]
        }
      }

      futurePredictions.push(prediction)
      lastDataPoint += prediction // Update lastDataPoint for next prediction
    }

    let avg = utils.avg(this.data_aktual.map(dt => dt.harga))

    for (let i = 0; i < n; i++) {
      this.items[this.items.length] = {
        periode: this.items.length + 1,
        x: this.items.length + 1,
        x2: this.items.length + 1,
        harga: 0,
        y: 0,
        data_prediksi: futurePredictions[i] + avg,
        y2: futurePredictions[i] + avg,
        color: 'bg-red-200',
      }
    }
  }
}
