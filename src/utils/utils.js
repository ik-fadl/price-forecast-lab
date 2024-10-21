import { format } from 'date-fns'
import { moment } from 'moment-timezone'
import * as XLSX from 'xlsx'

export default {
  formatDate(value) {
    let options = {
      day: '2-digit',
      year: 'numeric',
      month: 'long',
    }
    // let getHour = new Date(value).toLocaleTimeString('id', {timeStyle:'short'})
    let date = new Date(value).toLocaleDateString('id', options)
    if (value != '-') {
      return date
    } else return '-'
  },
  formatMonth(value) {
    let option = {
      year: 'numeric',
      month: 'long',
    }
    let date = new Date(value).toLocaleDateString('id', option)
    return date
  },
  today() {
    let currentDate = format(new Date(), 'yyyy-MM-dd')
    return currentDate
    // return currentDate.toLocaleDateString().slice(0, 10);
  },
  unSlashDate(date) {
    let array_date = date.split('/')
    let day = array_date[0]
    let month = array_date[1]
    let year = array_date[2]
    return year + '-' + month + '-' + day
  },
  justNumber(data) {
    let num = data?.replaceAll(',', '')
    return parseInt(num) || 0
  },
  last_month() {
    // set a month
    let d = new Date()
    let m = d.getMonth()
    d.setMonth(d.getMonth() - 1)

    if (d.getMonth() == m) d.setDate(0)

    // set a week
    // d.setDate(d.getDate() - 7)

    //tl_awal
    return format(d, 'yyyy-MM-dd')
  },
  numb(value) {
    let val = (value / 1).toFixed(2).replace(',', ',')
    if (
      val
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .slice(-2) == '00'
    ) {
      let a = (value / 1).toFixed(0).replace(',', ',')
      return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
      let b = (value / 1).toFixed(2).replace(',', ',')
      return b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  TimeNow() {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString('ID')
    return formattedTime
  },
  getDateTime(data) {
    const utcDate = new Date(data).toISOString()
    const datetime = moment(utcDate)
      .tz('Asia/Jakarta')
      .format('YYYY-MM-DD HH:mm:ss')
      .toString()
    return datetime
  },
  formatText(type, target) {
    if (type == 'date') {
      return this.formatDate(target)
    } else if (type == 'number') {
      return this.numb(target) == 'NaN' ? '-' : this.numb(target)
    } else return target
  },
  sum(data) {
    return data.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    )
  },
  async exportExcel(title, headers, items) {
    // Buat data dengan format array of arrays, array pertama adalah header
    const data = [
      headers, // Header di baris pertama
      ...items, // Data di baris berikutnya
    ]

    // Buat workbook dan worksheet
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    // Ekspor workbook ke file
    XLSX.writeFile(wb, `${title}.xlsx`)
  },
}
