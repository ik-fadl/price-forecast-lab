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
        key: 'cabai-rawit-hijau',
        code_comodity: 'com_15',
      }
    }
  },
}
</script>
