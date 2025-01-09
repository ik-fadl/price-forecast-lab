<template>
  <div class="flex flex-col gap-1">
    <span class="text-xs text-gray-900 ms-1">{{ label }}</span>
    <VueDatePicker @update:model-value="selectDate" :clearable="false" :min-date="mindate ?? null"
      :max-date="maxdate ?? null" cancelText="batal" selectText="pilih" format="PP" :enable-time-picker="false"
      v-model="date" calendar-cell-class-name="dp-custom-cell" menu-class-name="dp-custom-menu"
      input-class-name="dp-custom-input">
    </VueDatePicker>
  </div>
</template>

<script setup>

</script>


<script>

export default {
  props: {
    mindate: { required: false },
    maxdate: { required: false },
    label: { required: false },
    value: { required: false },
    keys: { required: true },
  },
  emits: ['callback-date'],
  data() {
    return {
      date: this.value,
    }
  },
  methods: {
    selectDate() {
      let val = ''

      this.$nextTick(() => {
        let d = this.date
        let year = d.getFullYear();
        let month = ('0' + (d.getMonth() + 1)).slice(-2);
        let day = ('0' + d.getDate()).slice(-2);
        let formattedDate = year + '-' + month + '-' + day;

        val = { [this.keys]: formattedDate }

        this.$emit("callback-date", val)
      })

    }
  }
}
</script>

<style>
.dp-custom-input {
  font-size: 10pt;
  border-radius: 9px;
  border-color: #ebebeb;
  font-size: 12px;
  color: #3d3d3d;
}

.dp-custom-cell {
  border-radius: 50%;
}

.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #313131;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #5fa0cb;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>
