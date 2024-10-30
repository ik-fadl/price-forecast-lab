<template>
  <div class="flex flex-col gap-1">
    <label :for="keys" class="text-xs text-gray-600 ms-1">{{ label }}</label>
    <input @click="openOption = !openOption" type="text" :name="keys" :id="keys" v-model="option" readonly
      :placeholder="placeholder"
      class="h-9 border border-gray-100 cursor-pointer bg-transparent text-gray-600 focus:border-transparent hover:border-gray-400 rounded-lg text-sm" />
  </div>
</template>

<script setup>

</script>


<script>

export default {
  props: {
    placeholder: { required: false },
    mindate: { required: false },
    maxdate: { required: false },
    label: { required: false },
    value: { required: false },
    keys: { required: true },
  },
  emits: ['callback-text'],
  data() {
    return {
      openOption: false,
      option: this.value,
    }
  },
  methods: {
    selectDate() {
      this.$nextTick(() => {
        let val = { [this.keys]: this.option }
        this.$emit("callback-option", val)
      })

    }
  }
}
</script>
