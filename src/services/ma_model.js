export default {
  /**
   * Fungsi untuk menghitung nilai MA(q)
   * @param {Array} data - Data time series (array dari nilai aktual)
   * @param {Array} residuals - Array dari residual (error) sebelumnya
   * @param {number} q - Orde MA (jumlah lag residual yang digunakan)
   * @returns {Object} - Konstanta (c), koefisien MA (theta), dan prediksi
   */

  calculateMA(data, residuals, q) {
    // Validasi input
    if (residuals.length < q) {
      throw new Error(
        'Residual tidak cukup untuk model MA dengan lag yang ditentukan.',
      )
    }

    // Hitung matriks X (lagged residuals) dan Y (data saat ini)
    const X = []
    const Y = []
    for (let i = q; i < data.length; i++) {
      Y.push(data[i]) // Nilai aktual
      const row = [1] // Elemen pertama untuk konstanta (c)
      for (let j = 1; j <= q; j++) {
        row.push(residuals[i - j]) // Tambahkan residual lag ke baris
      }
      X.push(row)
    }

    // Transpose matriks X
    const XT = this.transposeMatrix(X)

    // Hitung X^T * X
    const XTX = this.multiplyMatrices(XT, X)

    // Invers dari X^T * X
    const XTXInverse = this.invertMatrix(XTX)

    // Hitung X^T * Y
    const XTY = this.multiplyMatrixVector(XT, Y)

    // Hitung parameter (beta) -> [c, theta1, theta2, ..., thetaq]
    const beta = this.multiplyMatrixVector(XTXInverse, XTY)

    // Ekstrak konstanta (c) dan koefisien MA (theta)
    const c = beta[0]
    const theta = beta.slice(1)

    // Hitung prediksi untuk in-sample data
    const predictions = []
    for (let i = q; i < data.length; i++) {
      let prediction = c
      for (let j = 0; j < q; j++) {
        prediction += theta[j] * residuals[i - 1 - j]
      }
      predictions.push(prediction)
    }

    return {
      c, // Konstanta
      theta, // Koefisien MA
      predictions, // Prediksi in-sample
    }
  },

  /**
   * Transpose matriks
   * @param {Array} matrix
   * @returns {Array}
   */
  transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
  },

  /**
   * Perkalian dua matriks
   * @param {Array} A
   * @param {Array} B
   * @returns {Array}
   */
  multiplyMatrices(A, B) {
    return A.map(row =>
      B[0].map((_, colIndex) =>
        row.reduce(
          (sum, value, rowIndex) => sum + value * B[rowIndex][colIndex],
          0,
        ),
      ),
    )
  },

  /**
   * Perkalian matriks dengan vektor
   * @param {Array} matrix
   * @param {Array} vector
   * @returns {Array}
   */
  multiplyMatrixVector(matrix, vector) {
    return matrix.map(row =>
      row.reduce((sum, value, index) => sum + value * vector[index], 0),
    )
  },

  /**
   * Invers matriks 2x2 atau 3x3 (untuk penyederhanaan)
   * @param {Array} matrix
   * @returns {Array}
   */
  invertMatrix(matrix) {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Hanya mendukung matriks persegi.')
    }

    const n = matrix.length

    if (n === 2) {
      // Invers matriks 2x2
      const [[a, b], [c, d]] = matrix
      const determinant = a * d - b * c
      if (determinant === 0) {
        throw new Error('Matriks tidak invertibel.')
      }
      return [
        [d / determinant, -b / determinant],
        [-c / determinant, a / determinant],
      ]
    } else if (n === 3) {
      // Invers matriks 3x3 (gunakan metode cofactor expansion)
      const det =
        matrix[0][0] *
          (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] *
          (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] *
          (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])

      if (det === 0) {
        throw new Error('Matriks tidak invertibel.')
      }

      const inv = []
      for (let i = 0; i < n; i++) {
        inv[i] = []
        for (let j = 0; j < n; j++) {
          const minor = matrix
            .filter((_, row) => row !== i)
            .map(row => row.filter((_, col) => col !== j))
          const cofactor =
            ((i + j) % 2 === 0 ? 1 : -1) *
            (minor[0][0] * minor[1][1] - minor[0][1] * minor[1][0])
          inv[i][j] = cofactor / det
        }
      }
      return this.transposeMatrix(inv)
    } else {
      throw new Error('Hanya mendukung invers untuk matriks 2x2 atau 3x3.')
    }
  },
}
