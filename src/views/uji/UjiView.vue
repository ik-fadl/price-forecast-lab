<template>
  <ForecastBase :config="config" />
</template>

<script setup>
import ForecastBase from '@/components/basepage/ForecastBase.vue';
</script>

<script>

export default {
  data() {
    return {
      config: {
        key: 'uji',
        headers: {
          SES: [],
          DES: [
            { key: "level", name: "Level", type: "number" },
            { key: "trend", name: "Trend", type: "number" },
          ],
          SMA: [],
          WMA: [],
          ARIMA: []
        },
        metode: {
          active: 'DES',
          options: [
            { key: 'SES', name: 'SES', parameter: [{ key: 'alpha', title: 'Alpha' }] },
            { key: 'DES', name: 'DES', parameter: [{ key: 'alpha', title: 'Alpha' }, { key: 'beta', title: 'Beta' }] },
            { key: "SMA", name: "SMA", parameter: [{ key: 'avg', title: 'Jumlah periode' }] },
            { key: "WMA", name: "WMA", parameter: [{ key: 'bobot1', title: 'Bobot data 1' }, { key: 'bobot2', title: 'Bobot data 2' }, { key: 'bobot3', title: 'Bobot data 3' }] },
            { key: "ARIMA", name: "ARIMA", parameter: [{ key: 'p', title: 'p' }, { key: 'd', title: 'd' }, { key: 'q', title: 'q' }] },
          ]
        },
        parameter: {
          alpha: { value: 0.9, min: 0, max: 1, steps: 0.1 },
          beta: { value: 0.4, min: 0, max: 1, steps: 0.1 },
          avg: { value: 2, min: 1, max: 10, steps: 1 },
          bobot1: { value: 0.1, min: 0, max: 1, steps: 0.1 },
          bobot2: { value: 0.1, min: 0, max: 1, steps: 0.1 },
          bobot3: { value: 0.1, min: 0, max: 1, steps: 0.1 },
          p: { value: 1, min: 1, max: 10, steps: 1 },
          d: { value: 0, min: 1, max: 10, steps: 1 },
          q: { value: 1, min: 1, max: 10, steps: 1 },
        },
      }
    }
  },
}
</script>
