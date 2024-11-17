<template>
  <div class="w-full h-full flex flex-col">
    <!-- MENU TAB -->
    <MenuTab :tab_menu="tab_menu" />
    <!-- end:menu -->
    <!-- TITLE -->
    <div class="w-full flex flex-wrap gap-3 justify-between px-10 py-5">
      <div class="flex flex-col">
        <span class="font-semibold text-lg capitalize text-gray-600">{{ $route.name.replaceAll('-', ' ') }}</span>
        <span class="text-xs capitalize text-gray-400">pasar tradisional | Laporan
          Bulanan</span>
      </div>
      <div class="flex flex-wrap gap-1 items-end">
        <InputDate label="Tgl awal" keys="tgl_awal" :value="periode.tgl_awal" @callback-date="formInput" />
        <InputDate label="Tgl akhir" keys="tgl_akhir" :value="periode.tgl_akhir" @callback-date="formInput" />
        <button @click="submitDate()"
          class="text-sm bg-blue-400 h-[37px] px-3  text-white rounded-lg focus-within:bg-blue-500 focus:shadow-xl shadow-blue-400">Terapkan</button>
      </div>
    </div>
    <!-- end:title -->
    <!-- CONTENT -->
    <div class="w-full h-[75%] px-10 flex gap-2">
      <ListTable :headers="headers" :items="items" />
      <div class="w-full h-[97%] p-3 border border-gray-100 rounded-lg">
        <LineChart height="400" :series="data_series" />
      </div>
    </div>
    <!-- end:content -->
  </div>
</template>

<script setup>
import InputDate from '@/components/component/InputDate.vue';
import LineChart from '@/components/component/LineChart.vue';
import ListTable from '@/components/component/ListTable.vue';
import MenuTab from '@/components/component/MenuTab.vue';
import ApiService from '@/services/api';
import DataSeries from '@/services/data_series';
import utils from '@/utils/utils';
</script>

<script>
export default {
  props: {
    config: { required: true }
  },
  data() {
    return {
      tab_menu: [
        {
          key: "cabairawit", name: "Cabai Rawit", active: false, children: [
            { parent: "master", key: "cabai-rawit-hijau", name: "Cabai Rawit Hijau" },
            { parent: "master", key: "cabai-rawit-merah", name: "Cabai Rawit Merah" },
          ]
        },
        {
          key: "cabaimerah", name: "Cabai Merah", active: false, children: [
            { parent: "master", key: "cabai-merah-besar", name: "Cabai Merah Besar" },
            { parent: "master", key: "cabai-merah-keriting", name: "Cabai Merah Keriting" },
          ]
        },
        {
          key: "minyakgoreng", name: "Minyak Goreng", active: false, children: [
            { parent: "master", key: "minyak-goreng-curah", name: "Minyak Goreng Curah" },
            { parent: "master", key: "minyak-goreng-kemasan", name: "Minyak Goreng Kemasan Bermerk 1" },
          ]
        },
        {
          key: "telurayam", name: "Telur Ayam", active: false, children: [
            { parent: "master", key: "telur-ayam-ras", name: "Telur Ayam Ras" }
          ]
        },
        {
          key: "gulapasir", name: "Gula Pasir", active: false, children: [
            { parent: "master", key: "gula-pasir-premium", name: "Gula Pasir Kualitas Premium" },
            { parent: "master", key: "gula-pasir-lokal", name: "Gula Pasir Lokal" },
          ]
        }
      ],
      periode: {
        tgl_awal: '2024-10-01',
        tgl_akhir: utils.today(),
      },
      headers: [
        { key: "tanggal", name: "Tanggal", type: "text" },
        { key: "harga", name: "Harga/kg", type: "number" },
      ],
      items: [],
      data_series: ''
    }
  },

  methods: {
    async fetch() {
      let start_date = this.periode?.tgl_awal
      let end_date = this.periode?.tgl_akhir
      let apiService = new ApiService(this.config.code_comodity, start_date, end_date)

      this.items = await apiService.fetchData()
      this.setSeries()

    },

    setSeries() {
      let data = [{ name: "Data aktual", data: this.items.map(dt => dt.harga) }]
      let data_series = new DataSeries(data, this.items.map(item => item.tanggal))
      this.data_series = data_series.setDataSeries()

    },
    formInput(value) {
      let key = Object.keys(value)[0]
      this.periode[key] = value[key]
    },
    submitDate() {
      this.fetch()
    }
  },

  mounted() {
    this.fetch()
  }

}
</script>
