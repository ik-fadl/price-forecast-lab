<template>
  <div class="relative w-full h-full flex flex-col gap-5 text-sm text-gray-700 overflow-auto">
    <!-- HEADER FORMULA -->
    <div class="flex justify-end me-5">
      <button @click="close()"
        class="ri-close-line w-8 h-8 rounded-full fixed text-lg text-gray-500 bg-[#21212117]"></button>
    </div>
    <!-- end:header -->
    <!-- CONTENT -->
    <div class="flex flex-row-reverse gap-2 justify-between">
      <!-- KETERANGAN -->
      <div class="flex flex-col gap-1 me-0 md:me-10 h-max p-3 border rounded-md">
        <span class="font-semibold">Keterangan:</span>
        <template v-for="f in fl.filter(fll => fll.show.keterangan)">
          <div class="flex gap-3">
            <div class="flex flex-col w-10">
              <span v-html="f.name"></span>
            </div>
            <div class="flex flex-col">
              <span>: {{ f.title }}</span>
            </div>
          </div>
        </template>
      </div>
      <!-- end:keterangan -->
      <div class="flex flex-col gap-5">
        <!-- DIKETAHUI -->
        <div class="flex flex-col gap-1">
          <span class="font-semibold">Diketahui:</span>
          <template v-for="f in fl.filter(fll => fll.value && fll.show.diketahui)">
            <div class="flex gap-3">
              <div class="flex flex-col w-10">
                <span v-html="f.name"></span>
              </div>
              <div class="flex flex-col">
                <span>: {{ utils.numb(f.value) }}</span>
              </div>
            </div>
          </template>
        </div>
        <!-- end:diketahui -->
        <!-- PENYELESAIAN -->
        <div class="flex flex-col gap-3">
          <span class="font-semibold">Penyelesaian:</span>
          <template v-if="data_formula.data_index < 2 && data_formula.data_sekarang.state != 'next'">
            <div class="py-2 px-3 border rounded-md flex flex-col w-max">
              <span class="mb-2">inisialisasi:</span>
              <span>Lt = {{ data_formula.data_index == 0 ? '0' : 'At' }}</span>
              <span>Tt = {{ data_formula.data_index == 0 ? '0' : 'At - Ato' }}</span>
              <span>Ft = 0</span>
              <span>Error = 0</span>
            </div>
            <div class="py-2 px-3 flex flex-col">
              <span class="font-semibold">Lt = {{ utils.numb(data_formula.data_index == 0 ? 0 : At) }}</span>
              <span class="font-semibold">Tt = {{ data_formula.data_index == 0 ? 0 : utils.numb(At - Atx) }}</span>
              <span class="font-semibold">Ft = 0</span>
              <span class="font-semibold">Error = 0</span>
            </div>
          </template>
          <template v-else-if="data_formula.data_sekarang.state != 'next'">
            <!-- LEVEL -->
            <div class="w-max px-3 border rounded-md">
              <img src="../assets/img/lt_formula.jpeg" class="h-10" alt="level_formula">
            </div>
            <div class="ms-5 flex flex-col">
              <span>Lt = {{ alpha }} . {{ utils.numb(At) }} + ( 1 - {{
                alpha
              }} ) ( {{ utils.numb(Ltx) }} + ({{
                  utils.numb(Ttx) }}) )</span>
              <span>Lt = {{ utils.numb(alpha * At) }} + {{ utils.numb(1 - alpha)
                }} . {{ utils.numb(Ltx + Ttx)
                }}</span>
              <span>Lt = {{ utils.numb(alpha * At) }} + {{ utils.numb((1 - alpha) *
                (Ltx + Ttx))
                }}</span>
              <span class="bg-green-200 w-max px-2">Lt = {{ utils.numb((alpha * At) + (1 -
                alpha) *
                (Ltx + Ttx)) }}</span>
            </div>
            <!-- end:level -->
            <!-- TREND -->
            <div class="w-max px-3 border rounded-md">
              <img src="../assets/img/tt_formula.jpeg" class="h-10" alt="level_formula">
            </div>
            <div class="ms-5 flex flex-col">
              <span>Tt = {{ beta }} ( {{ utils.numb(Lt) }} - {{
                utils.numb(Ltx) }}) + (1
                - {{ beta }}) . ({{ Ttx }})</span>
              <span>Tt = {{ beta }} . {{ utils.numb(Lt - Ltx)
                }} + {{ 1 - beta }} . ({{ Ttx }})</span>
              <span>Tt = {{ utils.numb(beta * (Lt - Ltx))
                }} + ({{ utils.numb((1 - beta) * Ttx) }})</span>
              <span class="bg-green-200 w-max px-2">Tt = {{ utils.numb((beta * (Lt -
                Ltx)) + ((1
                  - beta) *
                  Ttx)) }}</span>
            </div>
            <!-- end:trend -->
            <!-- FORECAST -->
            <div class="w-max px-3 border rounded-md">
              <img src="../assets/img/ft_formula.jpeg" class="h-10" alt="forcast_formula">
            </div>
            <div class="ms-5 flex flex-col">
              <span>Ft = {{ utils.numb(Lt) }} + {{
                utils.numb(Tt)
              }}</span>
              <span class="bg-green-200 w-max px-2">Ft = {{ utils.numb(Lt + Tt) }}</span>
            </div>
            <!-- end:forecast -->
            <!-- ERROR -->
            <div class="w-max px-3 border rounded-md">
              <div class="flex gap-1 items-center">
                <span class="text-md">Error = </span>
                <img src="../assets/img/err_formula.jpeg" class="h-12" alt="forcast_formula">
              </div>
            </div>
            <div class="ms-5 flex flex-col">
              <span>Error = {{ utils.numb(At) }} - {{ utils.numb(Ft) }} / {{ utils.numb(At) }}</span>
              <span>Error = {{ utils.numb(Math.abs(At - Ft)) }} / {{ utils.numb(At) }}</span>
              <span class="bg-green-200 w-max px-2">Error = {{ (Math.abs(At - Ft)) / At }}</span>
            </div>
            <!-- end:error -->
          </template>
          <template v-else>
            <!-- FORECAST -->
            <div class="w-max px-3 border rounded-md">
              <img src="../assets/img/forecast+.jpeg" class="h-9" alt="forecast">
            </div>
            <div class="ms-5 flex flex-col">
              <span>Ft+{{ data_formula.data_sekarang?.m }} = {{ utils.numb(data_formula.data_sekarang?.level) }} + {{
                data_formula.data_sekarang?.m }} .
                {{
                  data_formula.data_sekarang?.trend }}</span>
              <span class="bg-green-200 px-1 w-max">Ft+{{ data_formula.data_sekarang?.m }} = {{
                utils.numb(data_formula.data_sekarang?.level +
                  (data_formula.data_sekarang?.m *
                    data_formula.data_sekarang?.trend)) }}</span>
            </div>
          </template>
        </div>
        <!-- end:penyelesaian -->
      </div>
    </div>
  </div>
</template>

<script setup>
import utils from '@/utils/utils';
</script>

<script>

export default {
  props: {
    data_formula: { required: true },
    alpha: { required: true },
    beta: { required: true },
  },
  emits: ['colse'],
  data() {
    return {
      At: this.data_formula.data_sekarang?.harga ?? 0,
      Atx: this.data_formula.data_sebelumnya?.harga ?? 0,
      Ttx: this.data_formula.data_sebelumnya?.trend ?? 0,
      Ltx: this.data_formula.data_sebelumnya?.level ?? 0,
      fl: [
        { key: "alpha", name: "&#x03B1", title: "alpha", value: this.alpha, show: { keterangan: true, diketahui: true } },
        { key: "beta", name: "&#x03B2;", title: "beta", value: this.beta, show: { keterangan: true, diketahui: true } },
        { key: "At", name: "At", title: "data aktual", value: this.data_formula.data_sekarang?.harga ?? 0, show: { keterangan: this.data_formula.data_sekarang.state != 'next', diketahui: this.data_formula.data_sekarang.state != 'next' } },
        { key: "Atx", name: "At-1", title: "data aktual sebelumnya", value: this.data_formula.data_sebelumnya?.harga ?? 0, show: { keterangan: this.data_formula.data_sekarang.state != 'next', diketahui: this.data_formula.data_sekarang.state != 'next' } },
        { key: "Tt", name: "Tt", title: "trend saat ini", value: this.data_formula.data_sekarang?.trend, show: { keterangan: true, diketahui: this.data_formula.data_sekarang.state == 'next' } },
        { key: "Ttx", name: "Tt-1", title: "trend data sebelumnya", value: this.data_formula.data_sebelumnya?.trend, show: { keterangan: this.data_formula.data_sekarang.state != 'next', diketahui: this.data_formula.data_sekarang.state != 'next' } },
        { key: "Lt", name: "Lt", title: "level saat ini", value: this.data_formula.data_sekarang?.level ?? 0, show: { keterangan: true, diketahui: this.data_formula.data_sekarang.state == 'next' } },
        { key: "Ltx", name: "Lt-1", title: "level data sebelumnya", value: this.data_formula.data_sebelumnya?.level ?? 0, show: { keterangan: this.data_formula.data_sekarang.state != 'next', diketahui: this.data_formula.data_sekarang.state != 'next' } },
        { key: "Ft", name: "Ft+1", title: "data prediksi", show: { keterangan: this.data_formula.data_sekarang.state != 'next', diketahui: this.data_formula.data_sekarang.state != 'next' } },
        { key: "Ftm", name: "Ft+m", title: "data prediksi ke-m", show: { keterangan: this.data_formula.data_sekarang.state == 'next', diketahui: this.data_formula.data_sekarang.state == 'next' } },
        { key: "m", name: "m", title: "jumlah periode di masa depan", value: this.data_formula.data_sekarang.m, show: { keterangan: this.data_formula.data_sekarang.state == 'next', diketahui: this.data_formula.data_sekarang.state == 'next' } },
        { key: "Error", name: "Error", title: "Error", show: { keterangan: this.data_formula.data_sekarang.state != 'next', diketahui: this.data_formula.data_sekarang.state != 'next' } },
      ]
    }
  },
  computed: {
    Lt() { return (this.alpha * this.At) + (1 - this.alpha) * (this.Ltx + this.Ttx) },
    Tt() { return (this.beta * (this.Lt - this.Ltx)) + ((1 - this.beta) * this.Ttx) },
    Ft() { return this.Lt + this.Tt }
  },
  methods: {
    close() {
      this.$emit('close', true)
    }
  }
}
</script>
