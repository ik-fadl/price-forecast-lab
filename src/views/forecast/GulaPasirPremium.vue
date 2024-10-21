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
        key: 'gula-pasir-premium',
        code_comodity: 'com_20',
      }
    }
  },
}
</script>
