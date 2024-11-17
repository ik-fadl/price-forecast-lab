<template>
  <div class="w-full h-full flex flex-col">
    <!-- MENU TAB -->
    <MenuTab :tab_menu="tab_menu" />
    <!-- end:menu -->
    <!-- CONTENT -->
    <div class="w-full h-full px-10 py-3">
      <div class="flex flex-wrap gap-3">
        <!-- LEFT SIDE -->
        <div class="w-full md:w-[22%]  h-full flex flex-col gap-2">
          <!-- MAPE -->
          <div class="w-full h-max flex flex-col gap-2 p-3 border rounded-lg">
            <span class="font-medium text-gray-500 text-sm">MAPE: <span class="text-red-400">{{ mape ?? 0
                }}%</span></span>
          </div>
          <!-- end:mape -->
          <!-- SET ALPHA & BETA -->
          <div class="w-full h-max flex flex-col gap-2 px-2 py-3 border rounded-lg">
            <InputNumber label="alpha" keys="alpha" :value="alpha" @callback-number="setParams" />
            <InputNumber label="beta" keys="beta" :value="beta" @callback-number="setParams" />
          </div>
          <!-- end:alpha -->
          <!-- TAB MODE -->
          <div class="w-full h-7 flex gap-1">
            <template v-for="tab in tab_mode">
              <button @click="activeMode(tab)" class="px-3 rounded flex items-center justify-center text-xs"
                :class="tab.active ? 'bg-blue-100' : 'bg-slate-50 text-gray-500'">{{ tab.name }}</button>
            </template>
          </div>
          <!-- end:tab -->
          <!-- ACTION -->
          <div class="w-full h-full min-h-[150px] border rounded-lg px-3 py-4">
            <template v-if="tab_mode[0].active">
              <div class="flex flex-col gap-2">
                <InputNumber label="harga" keys="harga" :value="train_harga" @callback-number="setParams" />
                <button @click="addData()"
                  class="text-sm bg-blue-400 h-[37px] px-3 w-max flex gap-1 items-center justify-center text-white rounded-lg focus-within:bg-blue-500 focus:shadow-xl shadow-blue-400">
                  <span class="ri-add-line rounded bg-[#ffffff29] w-4 h-4 text-xs"></span>
                  <span>Data train</span>
                </button>
              </div>
            </template>
            <template v-else>
              <div class="flex flex-col gap-2">
                <span class="text-sm text-gray-600">Prediksi harga dalam (bulan):</span>
                <InputNumber keys="n_month" :value="n_month" placeholder="2 bulan" @callback-number="setParams" />
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
            <!-- TAB CONTENT -->
            <div v-if="openFormula" class="w-full overflow-hidden border rounded-lg ps-5 py-3">
              <FormulaView :data_formula="data_formula" :alpha="alpha" :beta="beta" @close="openFormula = false" />
            </div>
            <div v-else class="w-full h-max flex flex-wrap justify-between items-end gap-1">
              <div class="h-max flex gap-1">
                <template v-for="tab in tab_content">
                  <button @click="activeContent(tab)" class=" h-7 px-3 rounded flex items-center justify-center text-xs"
                    :class="tab.active ? 'bg-blue-100' : 'bg-slate-50 text-gray-500'">{{ tab.name }}</button>
                </template>
              </div>
              <div class="flex flex-wrap gap-2 items-center">
                <InputDate keys="tgl_awal" :value="periode.tgl_awal" @callback-date="setDate" />
                <span class="text-xs text-gray-600">to</span>
                <InputDate keys="tgl_akhir" :value="periode.tgl_akhir" @callback-date="setDate" />
                <button @click="submitDate()"
                  class="text-sm bg-blue-400 h-[37px] px-3  text-white rounded-lg focus-within:bg-blue-500 focus:shadow-xl shadow-blue-400">Terapkan</button>
              </div>
            </div>
            <!-- end:tab -->
            <!-- CONTENT -->
            <div v-if="!openFormula" class="w-full flex flex-col rounded-lg h-[68vh] overflow-auto">
              <!-- TOP CONTENT -->
              <div v-if="tab_content[0].active && openFormula != true" class="w-full h-[40vh] flex flex-col items-end">
                <LineChart v-if="tab_content[0].active && tab_content[1].active" :series="data_series" height="250" />
                <LineChart v-else :series="data_series" height="400" />
              </div>
              <!-- end:top -->
              <!-- BOTTOM CONTENT -->
              <div v-if="tab_content[1].active && openFormula != true" class="w-fullf lex flex-col items-end"
                :class="!tab_content[0].active ? 'h-full' : 'h-[40vh]'">
                <ListTable :headers="headers" :items="items" :rowClicked="true" @callback-table="resTable" />
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
import InputText from '@/components/component/InputText.vue';
import LineChart from '@/components/component/LineChart.vue';
import ListTable from '@/components/component/ListTable.vue';
import MenuTab from '@/components/component/MenuTab.vue';
import api from '@/services/api';
import utils from '@/utils/utils';
import FormulaView from './FormulaView.vue';
import ApiService from '@/services/api';
import Forecast from '@/services/forecast';
</script>

<script>
export default {
  props: {
    config: { required: true }
  },
  data() {
    return {
      data_forecast: '',
      tab_menu: [
        {
          key: "cabairawit", name: "Cabai Rawit", active: false, children: [
            { parent: "forecast", key: "cabai-rawit-hijau", name: "Cabai Rawit Hijau" },
            { parent: "forecast", key: "cabai-rawit-merah", name: "Cabai Rawit Merah" },
          ]
        },
        {
          key: "cabaimerah", name: "Cabai Merah", active: false, children: [
            { parent: "forecast", key: "cabai-merah-besar", name: "Cabai Merah Besar" },
            { parent: "forecast", key: "cabai-merah-keriting", name: "Cabai Merah Keriting" },
          ]
        },
        {
          key: "minyakgoreng", name: "Minyak Goreng", active: false, children: [
            { parent: "forecast", key: "minyak-goreng-curah", name: "Minyak Goreng Curah" },
            { parent: "forecast", key: "minyak-goreng-kemasan", name: "Minyak Goreng Kemasan Bermerk 1" },
          ]
        },
        {
          key: "telurayam", name: "Telur Ayam", active: false, children: [
            { parent: "forecast", key: "telur-ayam-ras", name: "Telur Ayam Ras" }
          ]
        },
        {
          key: "gulapasir", name: "Gula Pasir", active: false, children: [
            { parent: "forecast", key: "gula-pasir-premium", name: "Gula Pasir Kualitas Premium" },
            { parent: "forecast", key: "gula-pasir-lokal", name: "Gula Pasir Lokal" },
          ]
        }
      ],
      tab_mode: [
        { key: "uji", name: "uji", active: true },
        { key: "prediksi", name: "prediksi", active: false },
      ],
      tab_content: [
        { key: "grafik", name: "grafik", active: true },
        { key: "table", name: "tabel", active: true },
      ],
      periode: {
        tgl_awal: '2024-10-01',
        tgl_akhir: utils.today(),
      },
      headers: [
        { key: "periode", name: "Periode", type: "text" },
        { key: "harga", name: "Data aktual", type: "number" },
        { key: "level", name: "Level", type: "number" },
        { key: "trend", name: "Trend", type: "number" },
        { key: "data_prediksi", name: "Data Prediksi", type: "number" },
        { key: "error", name: "Error", type: "number" },
      ],
      items: [],
      old_items: [],
      data_series: [],
      data_formula: '',
      openFormula: false,
      state: '',
      alpha: 0.9,
      beta: 0.4,
      n_month: 0,
      train_harga: 0,
      mape: 0,
    }
  },

  methods: {
    async fetch() {
      this.items = []
      let start_date = this.periode?.tgl_awal
      let end_date = this.periode?.tgl_akhir
      let apiService = new ApiService(this.config.code_comodity, start_date, end_date)

      this.items = await apiService.fetchData()
      this.old_items = [...this.items]

    },
    forecast() {
      let param = {
        alpha: this.alpha,
        beta: this.beta,
      }
      this.data_forecast = new Forecast(param, this.items)
      this.data_forecast.forecast_des()
      this.items = this.data_forecast.items
      this.mape = this.data_forecast.mape

      this.setSeries()

    },

    setSeries() {
      let data_aktual = []
      let data_prediksi = []

      for (let i = 0; i < this.items.length; i++) {
        data_aktual.push(this.items[i].y)
        data_prediksi.push(this.items[i].y2)
      }
      this.data_series = [
        { name: "Data aktual", data: data_aktual.slice(2) },
        { name: "Data prediksi", data: data_prediksi.slice(2) },
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
      this.fetch().then(() => this.forecast())
    },
    setParams(value) {
      let key = Object.keys(value)
      if (key == 'alpha') {
        this.alpha = value[key]
        this.items = this.old_items
        this.forecast()
      } else if (key == 'beta') {
        this.beta = value[key]
        this.items = this.old_items
        this.forecast()
      } else if (key == 'harga') {
        this.train_harga = value[key]
      } else if (key == 'n_month') {
        this.n_month = value[key]
      }

      this.data_formula


    },
    addData() {
      if (this.state == 'next') {
        this.items = this.old_items
      }
      this.state = 'add'
      this.items.push({
        periode: this.items.length + 1,
        harga: this.train_harga,
        color: 'bg-red-200'
      })
      this.forecast()

    },
    nextPredict() {
      this.state = 'next'
      this.data_forecast.prediction_des(this.n_month)

      this.items = this.data_forecast.items
      this.setSeries()
      this.data_series.map((ds, i) => ds.data = i == 0 ? ds.data.slice(0, ds.data.length - this.n_month) : ds.data)
    },
    resTable(value, index) {
      this.openFormula = true
      this.data_formula = {
        data_sebelumnya: this.items[index - 1],
        data_sekarang: value,
        data_index: index
      }
    }
  },


  mounted() {
    this.fetch().then(() => this.forecast())
  }

}
</script>
