<template>
  <div class="flex flex-col gap-1">
    <label :for="keys" class="text-xs text-gray-900 ms-1">{{ label }}</label>
    <input type="number" :name="keys" :id="keys" :value="value" v-model="number" min="0" :max="max" :step="step"
      @input="setNumber" :placeholder="placeholder"
      class="h-9 border border-gray-100 text-gray-900 bg-transparent focus:border-transparent hover:border-gray-400 rounded-lg text-sm" />
  </div>
</template>

<script setup>

</script>


<script>

export default {
  props: {
    placeholder: { required: false },
    max: { required: false },
    step: { required: false },
    label: { required: false },
    value: { required: false },
    keys: { required: true },
  },
  emits: ['callback-number'],
  data() {
    return {
      number: this.value,
    }
  },
  methods: {
    setNumber() {
      this.$nextTick(() => {

        let val = { [this.keys]: this.number }
        this.$emit("callback-number", val)

      })

    }
  }
}
</script>
