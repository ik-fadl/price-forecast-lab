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
        key: 'forecast',
        headers: {
          DES: [
            { key: "level", name: "Level", type: "number" },
            { key: "trend", name: "Trend", type: "number" },
          ]
        },
        metode: {
          active: 'DES',
          options: [
            {
              key: 'DES', name: 'DES', parameter: [{ key: 'alpha', title: 'Alpha' }, { key: 'beta', title: 'Beta' }]
            },
          ]
        },
        parameter: {
          alpha: { value: 0.9, min: 0, max: 1, steps: 0.1 },
          beta: { value: 0.4, min: 0, max: 1, steps: 0.1 },
        },
      }
    }
  },
}
</script>
