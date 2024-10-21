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
        key: 'cabai-rawit-hijau',
        code_comodity: 'com_15',
      }
    }
  },
}
</script>
