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
        key: 'gula-pasir-lokal',
        code_comodity: 'com_21',
      }
    }
  },
}
</script>
