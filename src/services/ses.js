export default {
  ses(data, alpha) {
    let Ft = []
    let Error = [0]

    for (let i = 0; i < data.length; i++) {
      // Ft = a . Xt-1 + (1 - a) . Ft-1
      let Xt = data[i]
      let _xt = i == 0 ? data[i] : data[i - 1]
      if (i == 0) Ft.push(Xt)
      else {
        Ft.push(alpha * _xt + (1 - alpha) * Ft[i - 1])
        Error.push(Math.abs(Xt - Ft[i]) / Xt)
      }
    }

    return { Ft, Error }
  },
}
