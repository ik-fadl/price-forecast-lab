<template>
  <div class="w-full h-full flex flex-col gap-5 text-sm text-gray-700 overflow-auto">
    <!-- HEADER FORMULA -->
    <div class="flex justify-end me-5">
      <button @click="close()" class="ri-close-line text-lg text-gray-500"></button>
    </div>
    <!-- end:header -->
    <!-- CONTENT -->
    <div class="flex flex-row-reverse gap-2 justify-between">

      <!-- KETERANGAN -->
      <div class="flex flex-col gap-1 me-0 md:me-10 h-max p-3 border rounded-md">
        <span class="font-semibold">Keterangan:</span>
        <div class="flex gap-3">
          <div class="flex flex-col">
            <span>At</span>
            <span>Tt</span>
            <span>Tt-1</span>
            <span>Lt</span>
            <span>Lt-1</span>
            <span>a</span>
            <span>b</span>
            <span>Ft+1</span>
            <span>Error</span>
          </div>
          <div class="flex flex-col">
            <span>: data aktual</span>
            <span>: trend data saat ini</span>
            <span>: trend data sebelumnya</span>
            <span>: level data saat ini</span>
            <span>: level data sebelumnya</span>
            <span>: alpha</span>
            <span>: beta</span>
            <span>: data prediksi</span>
            <span>: error</span>
          </div>
        </div>
      </div>
      <!-- end:keterangan -->
      <div class="flex flex-col gap-5">
        <!-- DIKETAHUI -->
        <div class="flex flex-col gap-1">
          <span class="font-semibold">Diketahui:</span>
          <div class="flex gap-3">
            <div class="flex flex-col">
              <span>At</span>
              <span>Tt-1</span>
              <span>Lt-1</span>
              <span>a</span>
              <span>b</span>
            </div>
            <div class="flex flex-col">
              <span>: {{ utils.numb(At) }}</span>
              <span>: {{ utils.numb(Tt) }}</span>
              <span>: {{ utils.numb(Ltx) }}</span>
              <span>: {{ alpha }}</span>
              <span>: {{ beta }}</span>
            </div>
          </div>
        </div>
        <!-- end:diketahui -->
        <!-- PENYELESAIAN -->
        <div class="flex flex-col gap-3">
          <span class="font-semibold">Penyelesaian:</span>
          <template v-if="data_formula.data_index < 2">
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
          <template v-else>
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
      // Ft: this.data_formula.data_sekarang?.data_prediksi ?? 0,
      At: this.data_formula.data_sekarang?.harga ?? 0,
      Atx: this.data_formula.data_sebelumnya?.harga ?? 0,
      // Tt: this.data_formula.data_sekarang?.trend ?? 0,
      Ttx: this.data_formula.data_sebelumnya?.trend ?? 0,
      // Lt: this.data_formula.data_sekarang?.level ?? 0,
      Ltx: this.data_formula.data_sebelumnya?.level ?? 0,
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
