import { store } from '@/stores/store'
import axios from 'axios'

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const instance = axios.create({
  // baseURL: 'https://www.bi.go.id/hargapangan/WebSite/TabelHarga',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Access-Control-Allow-Origin': '*',
  },

  withCredentials: true,
})

export default {
  async get(code_comodity, start_date, end_date) {
    store().loader = true
    // start_date: '2023-01-01',
    //   end_date: '2023-12-31',
    let param = {
      price_type_id: 1,
      comcat_id: code_comodity,
      province_id: 14,
      regency_id: 35,
      market_id: '',
      tipe_laporan: 5,
      start_date: start_date,
      end_date: end_date,
      _: '1701235320803',
    }
    try {
      const res = await instance.get('/api/GetGridDataDaerah', {
        params: param,
      })
      store().loader = false
      return res.data.data
    } catch (error) {
      store().loader = false
      return error.data
    }
  },
}
