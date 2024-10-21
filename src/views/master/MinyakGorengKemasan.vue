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
        key: 'minyak-goreng-kemasan',
        code_comodity: 'com_18',
      }
    }
  },
}
</script>
