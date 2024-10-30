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
        key: 'cabai-merah-keriting',
        code_comodity: 'com_13',
      }
    }
  },
}
</script>
