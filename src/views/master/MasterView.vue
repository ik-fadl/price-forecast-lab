<template>
  <MasterBase :config="config" />
</template>

<script setup>
import MasterBase from '@/components/basepage/MasterBase.vue';
</script>

<script>
export default {
  data() {
    return {
      config: {
        key: 'master',
        headers: [
          { key: "periode", name: "Tanggal", type: "text" },
          { key: "harga", name: "Harga/kg", type: "number" },
        ],
      }
    }
  },

}
</script>
