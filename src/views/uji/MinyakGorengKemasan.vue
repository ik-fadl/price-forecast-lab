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
        key: 'minyak-goreng-kemasan',
        code_comodity: 'com_18',
      }
    }
  },
}
</script>
