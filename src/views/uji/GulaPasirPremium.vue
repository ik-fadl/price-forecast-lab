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
        key: 'gula-pasir-premium',
        code_comodity: 'com_20',
      }
    }
  },
}
</script>
