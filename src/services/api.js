import { store } from '@/stores/store'
import utils from '@/utils/utils'
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://latteace.com',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Access-Control-Allow-Origin': '*',
  },
})

export default class ApiService {
  constructor(code_comodity, start_date, end_date) {
    this.code_comodity = code_comodity
    this.start_date = start_date
    this.end_date = end_date
  }

  async fetchData() {
    store().loader = true
    let param = {
      comcat_id: this.code_comodity,
      price_type_id: 1,
      province_id: 14,
      regency_id: 35,
      market_id: '',
      tipe_laporan: 5,
      start_date: this.start_date,
      end_date: this.end_date,
      _: '1701235320803',
    }
    try {
      const res = await instance.get('/api/GetGridDataDaerah', {
        params: param,
      })
      store().loader = false
      return this.normalizeData(res.data.data)
    } catch (error) {
      store().loader = false
      return error.data
    }
  }

  normalizeData(data) {
    let items = []
    let filtered = data.find(dt => dt.level == 2)
    let keys = Object.keys(filtered).filter(
      ft => ft != 'no' && ft != 'name' && ft != 'level',
    )

    for (let i = 0; i < keys.length; i++) {
      items.push({
        periode:
          keys[i].split('/').length > 1 ? utils.unSlashDate(keys[i]) : keys[i],
        harga: utils.justNumber(filtered[keys[i]]),
      })
    }
    items = items.filter(item => item.harga != 0)
    items.sort((a, b) => a.periode.localeCompare(b.periode))

    return items
  }
}
