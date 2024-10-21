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
        key: 'minyak-goreng-curah',
        code_comodity: 'com_17',
      }
    }
  },
}
</script>
