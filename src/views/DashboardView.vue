<template>
  <div class="w-full h-full flex flex-col gap-5 items-center p-10">
    <!-- INFORMASI HARGA TERKINI -->
    <div class="w-full flex flex-col gap-5">
      <!-- TITLE -->
      <div class="w-full flex flex-col">
        <span class="font-semibold text-lg capitalize text-gray-900">Informasi Harga Terkini</span>
        <span class="text-xs capitalize text-gray-600">pasar tradisional | {{ utils.formatMonth(new Date()) }}</span>
      </div>
      <!-- end:title -->
      <!-- CONTENT -->
      <div class="w-full flex flex-wrap gap-3">
        <template v-for="data in card_items">
          <div
            class="min-w-max w-full md:w-[40%] lg:w-[18%] flex items-center rounded-md border border-gray-100 hover:shadow-lg duration-300 px-5">
            <div class="w-full flex justify-between items-center gap-2">
              <!-- TEXT -->
              <div class="min-w-max flex flex-col">
                <span class="text-xs text-gray-600">{{ data.name }}</span>
                <span class="font-semibold text-lg capitalize text-gray-900">{{
                  'Rp. ' + utils.numb(items[data.key][items[data.key].length - 2].y)
                }}</span>
                <span class="text-xs text-gray-600"><span class="ri-arrow-left-line"></span>{{
                  'Rp. ' + utils.numb(items[data.key][items[data.key].length - 3].y) }}</span>
              </div>
              <!-- end:text -->
              <!-- CHART -->
              <LineChart width="75" height="120" type="area"
                :series="[{ data: items[data.key].slice(-4).map(dt => dt.y).filter(dt => dt != 0) }]" :hidden="true" />
              <!-- end:chart -->
            </div>
          </div>
        </template>
      </div>
      <!-- end:content -->
    </div>
    <!-- end -->
    <!-- MORE CONTENT -->
    <div class="w-full flex flex-col lg:flex-row gap-2">
      <!-- PREDIKSI HARGA -->
      <div class="w-full px-5 py-7 rounded-lg border border-gray-100 flex flex-col gap-10">
        <!-- TITLE -->
        <div class="w-full flex flex-col">
          <span class="font-semibold text-lg capitalize text-gray-900">Prediksi Bulan {{ utils.monthTomorrow()
            }}</span>
        </div>
        <!-- end:title -->
        <!-- CONTENT -->
        <div class="flex flex-col gap-4">
          <template v-for="data in card_items">
            <div
              class="w-full flex gap-2 justify-between border-b border-dashed border-gray-100 text-sm text-gray-900 py-1">
              <span>{{ data.name }}</span>
              <div class="flex w-40 justify-between">
                <span class="font-semibold">{{ 'Rp. ' + utils.numb(items[data.key][items[data.key].length - 1].y2)
                  }}</span>
                <div class="p-1 text-xs font-semibold rounded"
                  :class="items[data.key][items[data.key].length - 1].y2 > items[data.key][items[data.key].length - 2].y ? 'bg-red-200 text-red-500' : 'bg-green-100 text-green-500'">
                  <span
                    v-if="(items[data.key][items[data.key].length - 1].y2).toFixed(2) != items[data.key][items[data.key].length - 2].y"
                    :class="items[data.key][items[data.key].length - 1].y2 > items[data.key][items[data.key].length - 2].y ? 'ri-arrow-up-line' : 'ri-arrow-down-line'"></span>
                  {{ ((Math.abs(items[data.key][items[data.key].length - 1].y2 -
                    items[data.key][items[data.key].length - 2].y) / items[data.key][items[data.key].length - 2].y) *
                    100).toFixed(2) + ' %' }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- end -->
      </div>
      <!-- end -->
      <!-- OTHER STAT -->
      <div class="w-full px-5 py-7 rounded-lg border border-gray-100 flex flex-col gap-10">
        <BarChart :series="data_series" :yaxis="yaxis" />
      </div>
      <!-- end -->
    </div>
    <!-- end -->
  </div>
</template>

<script setup>
import comodities from '@/comodities';
import BarChart from '@/components/component/BarChart.vue';
import LineChart from '@/components/component/LineChart.vue';
import ApiService from '@/services/api';
import Forecast from '@/services/forecast';
import utils from '@/utils/utils';
</script>

<script>
export default {

  data() {
    return {
      yaxis: [],
      data_series: [],
      card_items: [],
      items: {}
    }
  },

  methods: {
    async fetch() {
      this.xaxis = []
      let data = {}
      let parameter = { alpha: { value: 0.9 }, beta: { value: 0.4 } }
      let c = comodities.data.map(dt => dt.children)
      let comd = [].concat(...c);
      this.card_items = comd
      let series = []

      for (let i = 0; i < comd.length; i++) {
        let getdata = new ApiService(comd[i].id, '2024-01-01', new Date())
        let res = await getdata.fetchData()
        let forecast = new Forecast(parameter, res)
        forecast.forecast_des()
        forecast.prediction_des(1)
        data[comd[i].key] = forecast.items
        // series.push({ name: comd[i].name, data: forecast.items[forecast.items.length - 2].y, })
        series.push({ x: comd[i].name, y: forecast.items[forecast.items.length - 2].y })
      }
      this.items = data
      this.data_series = series.sort((a, b) => b.y - a.y)
      this.data_series = [{ data: series }]

    },
  },
  /**
   * Fetch data when component is mounted
   */
  mounted() {
    this.fetch()
  }
}
</script>
