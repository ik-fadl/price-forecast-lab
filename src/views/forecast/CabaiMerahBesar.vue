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
        key: 'cabai-merah-besar',
        code_comodity: 'com_13',
      }
    }
  },
}
</script>
