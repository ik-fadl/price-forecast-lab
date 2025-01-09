export default {
  des(data, alpha, beta) {
    let Lt = [0]
    let Tt = [0]
    let Error = [0]
    let Ft = [0]
    let Yt = data

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
      Lt[i] = alpha * Yt[i] + (1 - alpha) * (Lt[i - 1] + Tt[i - 1])
      // Tti = beta * (Lti - Lti-1) + (1-beta) * Tti-1
      Tt[i] = beta * (Lt[i] - Lt[i - 1]) + (1 - beta) * Tt[i - 1]
      // Fti = Lti +Tti
      Ft[i] = Lt[i] + Tt[i]
      // Err = abs(Yti - Fti)
      Error[i] = Math.abs(Yt[i] - Ft[i]) / Yt[i]
    }

    return { Lt, Tt, Error, Ft }
  },
}
