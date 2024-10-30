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
        key: 'cabai-rawit-merah',
        code_comodity: 'com_16',
      }
    }
  },
}
</script>
