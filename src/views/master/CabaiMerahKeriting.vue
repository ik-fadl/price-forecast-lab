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
        key: 'cabai-merah-keriting',
        code_comodity: 'com_13',
      }
    }
  },
}
</script>
