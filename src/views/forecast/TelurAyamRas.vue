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
        key: 'telur-ayam-ras',
        code_comodity: 'com_10',
      }
    }
  },
}
</script>
