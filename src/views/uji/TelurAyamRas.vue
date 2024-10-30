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
        key: 'telur-ayam-ras',
        code_comodity: 'com_10',
      }
    }
  },
}
</script>
