<template>
  <UjiView :config="config" />
</template>

<script setup>
import UjiView from '../UjiView.vue';

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
