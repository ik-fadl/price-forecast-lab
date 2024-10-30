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
        key: 'cabai-rawit-hijau',
        code_comodity: 'com_15',
      }
    }
  },
}
</script>
