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
        key: 'gula-pasir-premium',
        code_comodity: 'com_20',
      }
    }
  },
}
</script>
