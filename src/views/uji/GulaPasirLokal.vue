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
        key: 'gula-pasir-lokal',
        code_comodity: 'com_21',
      }
    }
  },
}
</script>
