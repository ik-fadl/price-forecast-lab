// import ar_model from './ar_model'
// import ma_model from './ma_model'

import utils from '@/utils/utils'

// export default {
//   /**
//    * Fungsi untuk menghitung prediksi menggunakan model ARIMA(p, d, q)
//    * @param {Array} data - Data time series (array dari nilai aktual)
//    * @param {number} p - Orde AR (jumlah lag untuk AR)
//    * @param {number} d - Orde differencing
//    * @param {number} q - Orde MA (jumlah lag residual untuk MA)
//    * @returns {Object} - Prediksi dan parameter model (c, phi, theta)
//    */
//   calculateARIMA(data, p, d, q) {
//     if (data.length <= p + d + q) {
//       throw new Error(
//         'Data tidak cukup untuk model ARIMA dengan parameter yang ditentukan.',
//       )
//     }

//     // Step 1: Differencing (I)
//     const differencedData = this.difference(data, d)

//     // Step 2: Hitung residual awal (dummy untuk MA)
//     const residuals = this.calculateInitialResiduals(differencedData, q)

//     // Step 3: Hitung parameter AR dan MA
//     const arResult = ar_model.calculateAR(differencedData, p)
//     const maResult = ma_model.calculateMA(differencedData, residuals, q)

//     // Step 4: Gabungkan prediksi AR dan MA
//     const predictions = []
//     for (let i = Math.max(p, q); i < differencedData.length; i++) {
//       let prediction = arResult.c + maResult.c // Tambahkan konstanta AR dan MA

//       // Komponen AR
//       for (let j = 0; j < p; j++) {
//         prediction += arResult.phi[j] * differencedData[i - 1 - j]
//       }

//       // Komponen MA
//       for (let j = 0; j < q; j++) {
//         prediction += maResult.theta[j] * residuals[i - 1 - j]
//       }

//       predictions.push(prediction)
//     }

//     return {
//       differencedData,
//       ar: arResult,
//       ma: maResult,
//       predictions,
//     }
//   },

//   /**
//    * Fungsi untuk melakukan differencing
//    * @param {Array} data - Data time series
//    * @param {number} d - Orde differencing
//    * @returns {Array} - Data yang sudah di-differencing
//    */
//   difference(data, d) {
//     if (d <= 0) return data // Jika tidak ada differencing
//     let differencedData = [...data]
//     for (let i = 0; i < d; i++) {
//       differencedData = differencedData
//         .slice(1)
//         .map((val, index) => val - differencedData[index])
//     }
//     return differencedData
//   },

//   /**
//    * Fungsi untuk menghitung residual awal (dummy)
//    * @param {Array} data - Data time series yang sudah di-differencing
//    * @param {number} q - Orde MA
//    * @returns {Array} - Array residual
//    */
//   calculateInitialResiduals(data, q) {
//     const residuals = []
//     for (let i = 0; i < data.length; i++) {
//       residuals.push(Math.random() * 0.1) // Dummy residual (bisa diganti dengan nilai error awal)
//     }
//     return residuals
//   },
// }
// export default {
//   arima(data, p, d, q, phi, theta, c) {
//     // Step 1: Differencing data sebanyak d kali
//     const differencedData = this.difference(data, d)

//     // Step 2: Placeholder residuals (inisialisasi dengan nol)
//     const residuals = Array(differencedData.length).fill(0)

//     // Step 3: Prediksi menggunakan ARIMA
//     const predictions = []

//     for (let t = Math.max(p, q); t < differencedData.length; t++) {
//       let prediction = c // Mulai dengan konstanta

//       // Komponen AR
//       for (let i = 0; i < p; i++) {
//         prediction += phi[i] * (differencedData[t - 1 - i] || 0)
//       }

//       // Komponen MA
//       for (let j = 0; j < q; j++) {
//         prediction += theta[j] * (residuals[t - 1 - j] || 0)
//       }

//       // Simpan prediksi
//       predictions.push(prediction)

//       // Hitung residual (selisih antara data aktual dan prediksi)
//       residuals[t] = differencedData[t] - prediction
//     }

//     // Kembalikan hasil
//     return {
//       differencedData,
//       residuals,
//       predictions,
//     }
//   },
//   arima111(data) {
//     // Step 1: Differencing (d=1)
//     let differenced = []
//     for (let i = 1; i < data.length; i++) {
//       differenced.push(data[i] - data[i - 1])
//     }

//     // Step 2: Estimasi Koefisien AR (phi_1) dan MA (theta_1)
//     const lag1 = differenced.slice(0, -1) // Lagged values (differenced)
//     const current = differenced.slice(1) // Current values (differenced)

//     // Hitung phi_1 (koefisien AR)
//     const sumLagCurrent = lag1.reduce(
//       (sum, val, i) => sum + val * current[i],
//       0,
//     )
//     const sumLagSquared = lag1.reduce((sum, val) => sum + val * val, 0)
//     const phi_1 = sumLagCurrent / sumLagSquared

//     // Hitung theta_1 (koefisien MA)
//     const errors = current.map((val, i) => val - phi_1 * lag1[i])
//     const lagErrors = errors.slice(0, -1)
//     const currentErrors = errors.slice(1)
//     const sumErrorLagCurrent = lagErrors.reduce(
//       (sum, val, i) => sum + val * currentErrors[i],
//       0,
//     )
//     const sumErrorLagSquared = lagErrors.reduce(
//       (sum, val) => sum + val * val,
//       0,
//     )
//     const theta_1 = sumErrorLagCurrent / sumErrorLagSquared

//     // Step 3: Prediksi differenced data dengan ARIMA(1,1,1)
//     const predictedDifferenced = [differenced[0]]
//     let errorPrev = 0
//     for (let i = 1; i < differenced.length; i++) {
//       const predicted = phi_1 * differenced[i - 1] + theta_1 * errorPrev
//       errorPrev = differenced[i] - predicted
//       predictedDifferenced.push(predicted)
//     }

//     // Step 4: Kembalikan ke skala asli
//     const predicted = [data[0]]
//     for (let i = 0; i < predictedDifferenced.length; i++) {
//       predicted.push(predicted[predicted.length - 1] + predictedDifferenced[i])
//     }

//     return predicted
//   },

//   arima211(data) {
//     // Step 1: Differencing (d=1)
//     const differenced = []
//     for (let i = 1; i < data.length; i++) {
//       differenced.push(data[i] - data[i - 1])
//     }

//     // Step 2: Estimasi Koefisien AR (phi_1, phi_2) dan MA (theta_1)
//     const lag1 = differenced.slice(0, -2) // Lag-1
//     const lag2 = differenced.slice(1, -1) // Lag-2
//     const current = differenced.slice(2) // Current values

//     // Estimasi phi_1 dan phi_2 dengan regresi linier ganda
//     const X_ar = lag1.map((val, i) => [val, lag2[i]])
//     const y_ar = current
//     const X_ar_matrix = X_ar.map(row => [row[0], row[1]])
//     const XtX = X_ar_matrix.reduce(
//       (acc, row) => row.map((val, j) => acc[j] + val * row[j]),
//       Array(2).fill(0),
//     )
//     const Xty = X_ar_matrix.reduce(
//       (acc, row, i) => row.map((val, j) => acc[j] + val * y_ar[i]),
//       Array(2).fill(0),
//     )
//     const XtX_inv = [1 / XtX[0], 1 / XtX[1]]
//     const phi = XtX_inv.map((val, i) => val * Xty[i])

//     // Hitung theta_1
//     const errors = current.map(
//       (val, i) => val - phi[0] * lag1[i] - phi[1] * lag2[i],
//     )
//     const lagErrors = errors.slice(0, -1)
//     const currentErrors = errors.slice(1)
//     const sumErrorLagCurrent = lagErrors.reduce(
//       (sum, val, i) => sum + val * currentErrors[i],
//       0,
//     )
//     const sumErrorLagSquared = lagErrors.reduce((sum, val) => sum + val ** 2, 0)
//     const theta_1 = sumErrorLagCurrent / sumErrorLagSquared

//     // Step 3: Prediksi differenced dengan ARIMA(2,1,1)
//     const predictedDifferenced = [...differenced.slice(0, 2)]
//     let errorPrev = 0
//     for (let i = 2; i < differenced.length; i++) {
//       const predicted =
//         phi[0] * differenced[i - 1] +
//         phi[1] * differenced[i - 2] +
//         theta_1 * errorPrev
//       errorPrev = differenced[i] - predicted
//       predictedDifferenced.push(predicted)
//     }

//     // Step 4: Kembalikan ke skala asli
//     const predicted = [data[0]]
//     for (let i = 0; i < predictedDifferenced.length; i++) {
//       predicted.push(predicted[predicted.length - 1] + predictedDifferenced[i])
//     }

//     return predicted
//   },
//   difference(data, d) {
//     if (d <= 0) return data // Tidak ada differencing
//     let differencedData = [...data]
//     for (let i = 0; i < d; i++) {
//       differencedData = differencedData
//         .slice(1)
//         .map((val, index) => val - differencedData[index])
//     }
//     return differencedData
//   },
// }

export default {
  mean(arr) {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length
  },

  // Fungsi untuk menghitung Autocorrelation
  autocorrelation(data, lag) {
    const n = data.length
    const meanValue = this.mean(data)
    let num = 0
    let den = 0

    for (let i = lag; i < n; i++) {
      num += (data[i] - meanValue) * (data[i - lag] - meanValue)
    }

    for (let i = 0; i < n; i++) {
      den += (data[i] - meanValue) ** 2
    }

    return num / den
  },

  // Fungsi untuk menghitung ARIMA
  arima(data, p, d, q) {
    // Melakukan differencing jika d > 0
    let differencedData = [...data]
    for (let i = 0; i < d; i++) {
      differencedData = differencedData
        .slice(1)
        .map((val, index) => val - differencedData[index])
    }

    // Menghitung koefisien AR dan MA (sederhana)
    const arCoefficients = []
    const maCoefficients = []

    for (let i = 1; i <= p; i++) {
      arCoefficients.push(this.autocorrelation(differencedData, i))
    }

    for (let i = 1; i <= q; i++) {
      maCoefficients.push(this.autocorrelation(data, i))
    }

    // Membuat prediksi
    const predictions = []
    for (let i = 0; i < differencedData.length; i++) {
      let prediction = 0

      // AR part
      for (let j = 1; j <= p; j++) {
        if (i - j >= 0) {
          prediction += arCoefficients[j - 1] * differencedData[i - j]
        }
      }

      // MA part
      for (let j = 1; j <= q; j++) {
        if (i - j >= 0) {
          prediction += maCoefficients[j - 1] * (data[i - j] - this.mean(data))
        }
      }

      predictions.push(prediction)
    }

    let result =
      d > 0 ? this.restoreToOriginalScale(data, predictions) : predictions
    return result
  },

  restoreToOriginalScale(originalData, differencedPredictions) {
    let restoredValues = []

    // Ambil nilai terakhir dari data asli
    let lastOriginalValue = originalData[originalData.length - 1]

    // Loop melalui prediksi yang di-differencing
    let avg = utils.avg(originalData)
    for (let i = 0; i < differencedPredictions.length; i++) {
      // Hitung nilai asli dengan menambahkan prediksi yang di-differencing ke nilai terakhir
      let restoredValue = avg + differencedPredictions[i]
      restoredValues.push(restoredValue)

      // Update nilai terakhir untuk prediksi berikutnya
      lastOriginalValue = restoredValue
    }

    return restoredValues
  },
}
