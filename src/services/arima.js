import utils from '@/utils/utils'

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

  // Fungsi untuk mengembalikan data ke asli
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
