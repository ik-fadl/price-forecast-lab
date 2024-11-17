import { store } from '@/stores/store'
import utils from '@/utils/utils'

export default class DataSeries {
  constructor(data, x_axis) {
    this.data = data
    this.x_axis = x_axis
  }

  setDataSeries() {
    return this.data
  }
}
