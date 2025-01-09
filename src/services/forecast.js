import utils from '@/utils/utils'
import arima from './arima'
import des from './des'
import ses from './ses'

export default class Forecast {
  constructor(parameter, data_aktual) {
    this.parameter = parameter
    ;(this.data_aktual = data_aktual), (this.mape = 0), (this.items = [])
  }

  forecast_des() {
    let result = des.des(
      this.data_aktual.map(item => item.harga),
      this.parameter.alpha.value,
      this.parameter.beta.value,
    )
    let new_items = []

    for (let i = 0; i < this.data_aktual.length; i++) {
      new_items.push({
        periode: this.data_aktual[i].periode,
        x: this.data_aktual[i].periode,
        x2: this.data_aktual[i].periode,
        harga: this.data_aktual[i].harga,
        y: this.data_aktual[i].harga,
        level: result.Lt[i],
        trend: result.Tt[i],
        data_prediksi: result.Ft[i],
        y2: result.Ft[i],
        error: result.Error[i],
        color:
          result.Error[i] < 0.01 &&
          i > 1 &&
          this.data_aktual[i].color == undefined
            ? 'bg-green-100'
            : (this.data_aktual[i].color ?? ''),
      })
    }
    let err = result.Error.slice(2)
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
    let data_prediksi = []

    let result = ses.ses(
      this.data_aktual.map(item => item.harga),
      this.parameter.alpha.value,
    )
    for (let i = 0; i < this.data_aktual.length; i++) {
      // Ft = a . Xt-1 + (1 - a) . Ft-1
      data_prediksi.push({
        periode: this.data_aktual[i].periode,
        x: this.data_aktual[i].periode,
        x2: this.data_aktual[i].periode,
        harga: this.data_aktual[i].harga,
        y: this.data_aktual[i].harga,
        data_prediksi: i == 0 ? 0 : result.Ft[i],
        y2: i == 0 ? 0 : result.Ft[i],
        error: result.Error[i],
        color:
          result.Error[i] < 0.01 &&
          i > 1 &&
          this.data_aktual[i].color == undefined
            ? 'bg-green-100'
            : (this.data_aktual[i].color ?? ''),
      })
    }
    let err = result.Error.slice(1)

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
          ? this.parameter.alpha.value * xt +
            (1 - this.parameter.alpha.value) * past_forecast
          : this.parameter.alpha.value * past_forecast +
            (1 - this.parameter.alpha.value) * past_forecast

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
    let avg = this.parameter.avg.value
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
    let avg = this.parameter.avg.value
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
    let bobot = [
      this.parameter.bobot1.value,
      this.parameter.bobot2.value,
      this.parameter.bobot3.value,
    ].filter(b => b > 0)

    let avg = bobot.length
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
      for (let j = 0; j < bobot.length; j++) {
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

  prediction_wma(n) {
    let historicalData = this.data_aktual.map(dt => dt.harga)

    let bobot = [
      this.parameter.bobot1.value,
      this.parameter.bobot2.value,
      this.parameter.bobot3.value,
    ].filter(b => b > 0)

    let data = [...historicalData.slice(-bobot.length)]
    for (let i = 0; i < n; i++) {
      let data2 = data.slice(-bobot.length)
      let dt =
        utils.sum(data2.map((dt, index) => dt * bobot[index])) /
        utils.sum(bobot)
      data.push(dt)
      this.items[this.items.length] = {
        periode: this.items.length + 1,
        x: this.items.length + 1,
        x2: this.items.length + 1,
        harga: 0,
        y: 0,
        data_prediksi: dt,
        y2: dt,
        color: 'bg-red-200',
      }
    }
  }

  forecast_arima() {
    let data_prediksi = []
    let data = this.data_aktual.map(dt => dt.harga)
    let p = this.parameter.p.value ?? 1
    let d = this.parameter.d.value ?? 0
    let q = this.parameter.q.value ?? 1
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
        error: i == 0 ? 0 : Math.abs(Yt - result[i]) / Yt,
        color:
          Math.abs(Yt - result[i]) / Yt < 0.01 &&
          i > 1 &&
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
    let p = this.parameter.p.value ?? 1
    let d = this.parameter.d.value ?? 0
    let q = this.parameter.q.value ?? 1

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

      // MENGHITUNG AR
      for (let j = 1; j <= p; j++) {
        if (predictions.length - j >= 0) {
          prediction +=
            predictions[predictions.length - j] * arCoefficients[j - 1]
        }
      }

      // MENGHITUNG MA
      for (let j = 1; j <= q; j++) {
        if (data.length - j >= 0) {
          prediction +=
            (lastDataPoint - utils.avg(data)) * maCoefficients[j - 1]
        }
      }

      futurePredictions.push(prediction)
      lastDataPoint += prediction
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
