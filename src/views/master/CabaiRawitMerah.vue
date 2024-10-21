<template>
  <MasterView :config="config" />
</template>

<script setup>
import MasterView from '../MasterView.vue';

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
