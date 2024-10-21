<template>
  <ForecastView :config="config" />
</template>

<script setup>
import ForecastView from '../ForecastView.vue';
</script>

<script>

export default {
  data() {
    return {
      config: {
        key: 'minyak-goreng-curah',
        code_comodity: 'com_17',
      }
    }
  },
}
</script>
