<template>
  <div class="flex flex-col gap-1">
    <label :for="keys" class="text-xs text-gray-600 ms-1">{{ label }}</label>
    <div class="relative flex items-center">
      <input @click="openOption = !openOption" type="text" :name="keys" :id="keys" v-model="option" readonly
        :placeholder="placeholder"
        class="w-full h-9 border border-gray-100 cursor-pointer bg-transparent text-gray-600 focus:border-transparent hover:border-gray-400 rounded-lg text-sm" />
      <span v-if="openOption" class="absolute ri-arrow-up-s-line right-2"></span>
      <span v-else class="absolute ri-arrow-down-s-line right-2"></span>
    </div>
    <div class="relative w-full" :class="openOption ? 'h-max' : 'h-0'">
      <div class="absolute w-full bg-white rounded-md overflow-hidden" :class="openOption ? 'h-max shadow-lg' : 'h-0'">
        <template v-for="menu in menu_opt">
          <div @click="choose_mthode(menu)"
            class="h-10 text-xs text-gray-700 px-3 flex items-center hover:bg-gray-100 cursor-pointer">{{ menu }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>


<script>

export default {
  props: {
    placeholder: { required: false },
    menu_opt: { required: true },
    mindate: { required: false },
    maxdate: { required: false },
    label: { required: false },
    value: { required: false },
    keys: { required: true },
  },
  emits: ['callback-option'],
  data() {
    return {
      openOption: false,
      option: this.value,
    }
  },
  methods: {
    choose_mthode(menu) {
      let val = { [this.keys]: menu }
      this.option = menu
      this.$emit("callback-option", val)
      this.openOption = false
    }
  }
}
</script>
