<template>
  <div class="w-full h-full flex flex-col">
    <!-- MENU TAB -->
    <MenuTab :key="config.key" @refresh="fetch" />
    <!-- end:menu -->
    <!-- TITLE -->
    <div class="w-full flex flex-wrap gap-3 justify-between px-10 py-5">
      <div class="flex flex-col">
        <span class="font-semibold text-lg capitalize text-gray-900">{{ $route.name.replaceAll('-', ' ') }}</span>
        <span class="text-xs capitalize text-gray-600">pasar tradisional | Laporan
          Bulanan</span>
      </div>
      <div class="flex flex-wrap gap-1 items-end">
        <!-- <InputDate label="Tgl awal" keys="tgl_awal" :value="periode.tgl_awal" @callback-date="formInput" />
        <InputDate label="Tgl akhir" keys="tgl_akhir" :value="periode.tgl_akhir" @callback-date="formInput" />
        <button @click="submitDate()"
          class="text-sm bg-blue-400 h-[37px] px-3  text-white rounded-lg focus-within:bg-blue-500 focus:shadow-xl shadow-blue-400">Terapkan</button> -->
      </div>
    </div>
    <!-- end:title -->
    <!-- CONTENT -->
    <div class="w-full h-[75%] px-10 flex flex-col-reverse lg:flex-row gap-2 overflow-y-auto">
      <div class="w-full lg:w-1/3">
        <ListTable :headers="config.headers" :items="items" />
      </div>
      <div class="w-full h-[400px] lg:h-[97%] p-3 border border-gray-100 rounded-lg">
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
      periode: {
        tgl_awal: '2023-01-01',
        tgl_akhir: utils.today(),
      },
      items: [],
      data_series: ''
    }
  },

  methods: {
    async fetch(id = 'com_15') {
      let start_date = this.periode?.tgl_awal
      let end_date = this.periode?.tgl_akhir
      let apiService = new ApiService(id, start_date, end_date)

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
