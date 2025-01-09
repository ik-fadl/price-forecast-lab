<template>
  <div class="w-full h-full flex flex-col">
    <!-- MENU TAB -->
    <MenuTab :key="config.key" @refresh="fetch" />
    <!-- end:menu -->
    <!-- CONTENT -->
    <div class="w-full h-full px-10 py-3">
      <div class="flex flex-wrap gap-3">
        <!-- LEFT SIDE -->
        <div class="w-full md:w-[22%]  h-full flex flex-col gap-2">
          <!-- MAPE -->
          <div class="w-full h-max flex flex-col gap-2 p-3 border rounded-lg">
            <span class="font-medium text-gray-900 text-sm">MAPE: <span class="text-red-400">{{ mape ?? 0
                }}%</span></span>
          </div>
          <!-- end:mape -->
          <!-- SET PARAMETER -->
          <div class="w-full h-max flex flex-col gap-2 px-2 py-3 border rounded-lg">
            <InputOption label="metode" keys="metode" :value="metode.active"
              :menu_opt="metode?.options.map(opt => opt.name)" @callback-option="setMethod" />
            <template v-for="param in metode.options.find(m => m.name == metode.active)?.parameter">
              <InputNumber :label="param.title" :keys="param.key" :step="parameter[param.key].steps"
                :min="parameter[param.key].steps" :max="parameter[param.key].max" :value="parameter[param.key].value"
                @callback-number="setParams" />
            </template>
          </div>
          <!-- end:parameter -->
          <!-- TAB MODE -->
          <div class="w-full h-7 flex gap-1">
            <template v-for="tab in tab_mode">
              <button @click="activeMode(tab)" class="px-3 rounded flex items-center justify-center text-xs"
                :class="tab.active ? 'bg-blue-100' : 'bg-slate-50 text-gray-900'">{{ tab.name }}</button>
            </template>
          </div>
          <!-- end:tab -->
          <!-- ACTION -->
          <div class="w-full h-full min-h-[150px] border rounded-lg px-3 py-4">
            <template v-if="tab_mode[0].active">
              <div class="flex flex-col gap-2">
                <InputNumber label="harga" keys="harga" :value="parameter.data_train" @callback-number="setParams" />
                <button @click="addData()"
                  class="text-sm bg-blue-400 h-[37px] px-3 w-max flex gap-1 items-center justify-center text-white rounded-lg focus-within:bg-blue-500 focus:shadow-xl shadow-blue-400">
                  <span class="ri-add-line rounded bg-[#ffffff29] w-4 h-4 text-xs"></span>
                  <span>Data train</span>
                </button>
              </div>
            </template>
            <template v-else>
              <div class="flex flex-col gap-2">
                <span class="text-sm text-gray-900">Prediksi harga dalam (bulan):</span>
                <InputNumber keys="n_periode" :value="parameter.n_periode" placeholder="2 bulan"
                  @callback-number="setParams" />
                <button @click="nextPredict()"
                  class="text-sm bg-blue-400 h-[37px] px-3 w-max flex gap-1 items-center justify-center text-white rounded-lg focus-within:bg-blue-500 focus:shadow-xl shadow-blue-400">
                  <span>Prediksi</span>
                </button>
              </div>
            </template>
          </div>
          <!-- end:action -->
        </div>
        <!-- end:left -->
        <!-- RIGHT SIDE -->
        <div class="w-full md:w-[76%] h-[78vh]">
          <div class="w-full h-full flex flex-col gap-3">
            <!-- FORMULA -->
            <div v-if="openFormula && config.key == 'forecast'"
              class="w-full overflow-hidden border rounded-lg ps-5 py-3">
              <FormulaView :data_formula="data_formula" :alpha="parameter.alpha.value" :beta="parameter.beta.value"
                @close="openFormula = false" />
            </div>
            <!-- TAB CONTENT -->
            <div v-else class="w-full h-max flex flex-wrap justify-between items-end gap-1">
              <div class="h-max flex gap-1">
                <template v-for="tab in tab_content">
                  <button @click="activeContent(tab)" class=" h-7 px-3 rounded flex items-center justify-center text-xs"
                    :class="tab.active ? 'bg-blue-100' : 'bg-slate-50 text-gray-900'">{{ tab.name }}</button>
                </template>
              </div>
              <div class="flex flex-wrap gap-2 items-center">
                <InputDate keys="tgl_awal" :value="periode.tgl_awal" @callback-date="setDate" />
                <span class="text-xs text-gray-900">to</span>
                <InputDate keys="tgl_akhir" :value="periode.tgl_akhir" @callback-date="setDate" />
                <button @click="submitDate()"
                  class="text-sm bg-blue-400 h-[37px] px-3  text-white rounded-lg focus-within:bg-blue-500 focus:shadow-xl shadow-blue-400">Terapkan</button>
              </div>
            </div>
            <!-- end:tab -->
            <!-- CONTENT -->
            <div v-if="!openFormula" class="w-full flex flex-col rounded-lg h-[68vh] overflow-auto">
              <!-- TOP CONTENT -->
              <div v-if="tab_content[0].active" class="w-full h-[40vh] flex flex-col items-end">
                <LineChart v-if="tab_content[0].active && tab_content[1].active" :series="data_series" height="250" />
                <LineChart v-else :series="data_series" height="400" />
              </div>
              <!-- end:top -->
              <!-- BOTTOM CONTENT -->
              <div v-if="tab_content[1].active" class="w-fullf lex flex-col items-end"
                :class="!tab_content[0].active ? 'h-full' : 'h-[40vh]'">
                <ListTable :headers="fields" :items="items" :rowClicked="true" @callback-table="resTable" />
              </div>
              <!-- end:bottom -->
            </div>
            <!-- end:content -->
          </div>
        </div>
        <!-- end:right -->
      </div>
    </div>
    <!-- end:content -->
  </div>
</template>

<script setup>
import InputDate from '@/components/component/InputDate.vue';
import InputNumber from '@/components/component/InputNumber.vue';
import LineChart from '@/components/component/LineChart.vue';
import ListTable from '@/components/component/ListTable.vue';
import MenuTab from '@/components/component/MenuTab.vue';
import utils from '@/utils/utils';
import InputOption from '@/components/component/InputOption.vue';
import Forecast from '@/services/forecast';
import ApiService from '@/services/api';
import FormulaView from '@/views/FormulaView.vue';
</script>

<script>
export default {
  props: {
    config: { required: true }
  },
  data() {
    return {
      tab_mode: [
        { key: "uji", name: "Uji", active: true },
        { key: "prediksi", name: "prediksi", active: false },
      ],
      tab_content: [
        { key: "grafik", name: "grafik", active: true },
        { key: "table", name: "tabel", active: true },
      ],
      periode: {
        tgl_awal: '2022-08-01',
        tgl_akhir: '2024-12-31',
      },
      parameter: {
        data_train: 0,
        n_periode: 0
      },
      headers: [
        { key: "periode", name: "Periode", type: "text" },
        { key: "harga", name: "Data aktual", type: "number" },
        { key: "data_prediksi", name: "Data Prediksi", type: "number" },
        { key: "error", name: "Error", type: "number" },
      ],
      metode: {},
      items: [],
      old_items: [],
      data_forecast: '',
      data_series: [],
      data_formula: '',
      openFormula: false,
      state: '',
      // n_month: 5,
      // train_periode: 0,
      mape: 0,
    }
  },
  created() {
    // INITALIZE METODE
    this.metode = this.config.metode
    // INITIALIZE PARAMETER
    let param = Object.keys(this.config.parameter)
    for (let i = 0; i < param.length; i++) {
      this.parameter[param[i]] = this.config.parameter[param[i]]
    }

    if (this.metode.active) {
      this.fields
    }
  },
  computed: {
    fields() {
      let h = [...this.headers]
      let nw = this.config.headers[this.metode.active]
      return [
        ...h.slice(0, 2),
        ...nw,
        ...h.slice(h.length - 2),
      ]
    }
  },
  methods: {
    async fetch(id = 'com_15') {
      this.head
      this.items = []
      let start_date = this.periode?.tgl_awal
      let end_date = this.periode?.tgl_akhir
      let apiService = new ApiService(id, start_date, end_date)

      this.items = await apiService.fetchData()
      this.old_items = [...this.items]

      this.forecast()

    },
    forecast() {

      this.data_forecast = new Forecast(this.parameter, this.items)
      if (this.metode.active == 'DES') this.data_forecast.forecast_des()
      else if (this.metode.active == 'SES') this.data_forecast.forecast_ses()
      else if (this.metode.active == 'SMA') this.data_forecast.forecast_sma()
      else if (this.metode.active == 'WMA') this.data_forecast.forecast_wma()
      else if (this.metode.active == 'ARIMA') this.data_forecast.forecast_arima()

      this.items = this.data_forecast.items
      this.mape = this.data_forecast.mape

      this.setSeries()

    },

    setSeries() {
      let data_aktual = this.items.filter(dt => dt.data_prediksi != 0 && dt.data_prediksi * 0 == 0).map(dt => dt.y)
      let data_prediksi = this.items.filter(dt => dt.data_prediksi != 0 && dt.data_prediksi * 0 == 0).map(dt => dt.y2)

      this.data_series = [
        { name: "Data aktual", data: data_aktual },
        { name: "Data prediksi", data: data_prediksi }
      ]

    },
    activeMode(t) {
      this.tab_mode.map(tab => tab.active = tab == t)
    },
    activeContent(t) {
      this.tab_content.map(tab => tab.active = tab == t ? !tab.active : tab.active)
      // if (this.tab_content[0].active) {
      this.setSeries()
      // }
    },
    setDate(value) {
      let key = Object.keys(value)[0]
      this.periode[key] = value[key]
    },

    submitDate() {
      let id = this.$router.currentRoute.value.query.id
      this.fetch(id)
    },
    setMethod(value) {
      this.metode.active = value.metode
      this.items = this.old_items
      this.forecast()
    },
    setParams(value) {
      let key = Object.keys(value)
      if (key == 'harga') {
        this.parameter.data_train = value[key]
      } else if (key == 'n_periode') {
        this.parameter.n_periode = value[key];
      } else {
        this.parameter[key].value = value[key]
        this.items = this.old_items
        this.forecast()
      }

    },
    addData() {
      if (this.state == 'next') {
        this.items = this.old_items
      }
      this.state = 'add'
      this.items.push({
        periode: this.items.length + 1,
        harga: this.parameter.data_train,
        color: 'bg-red-200'
      })
      this.forecast()

    },
    resTable(value, index) {
      this.openFormula = true
      this.data_formula = {
        data_sebelumnya: this.items[index - 1],
        data_sekarang: value,
        data_index: index
      }
    },
    nextPredict() {
      this.state = 'next'
      if (this.metode.active == 'DES') this.data_forecast.prediction_des(this.parameter.n_periode)
      else if (this.metode.active == 'SES') this.data_forecast.prediction_ses(this.parameter.n_periode)
      else if (this.metode.active == 'SMA') this.data_forecast.prediction_sma(this.parameter.n_periode)
      else if (this.metode.active == 'WMA') this.data_forecast.prediction_wma(this.parameter.n_periode)
      else if (this.metode.active == 'ARIMA') this.data_forecast.prediction_arima(this.parameter.n_periode)

      this.items = this.data_forecast.items
      this.setSeries()
      this.data_series.map((ds, i) => ds.data = i == 0 ? ds.data.slice(0, ds.data.length - this.parameter.n_periode) : ds.data)
    },
  },


  mounted() {
    this.fetch()
  }

}
</script>
