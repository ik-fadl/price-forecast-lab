<template>
  <div class="w-full h-[97%] flex flex-col border border-gray-100 rounded-xl overflow-hidden">
    <!-- HEADER -->
    <button @click="exportdata()" class="font-medium text-sm w-32 min-w-max text-gray-600">Unduh data</button>
    <div
      class="h-14 min-h-[56px] w-full sr-only md:not-sr-only px-5 flex items-center justify-between border-b border-dashed overflow-x-auto">
      <span
        class="sr-only md:not-sr-only font-medium text-sm w-10 min-w-[40px] max-w-[40px] text-gray-600 text-center">#</span>
      <template v-for="head in headers">
        <span class="font-medium text-sm w-32 min-w-max text-gray-600">{{ head.name }}</span>
      </template>
    </div>
    <!-- end:header -->
    <!-- BODY -->
    <div class="w-full h-full overflow-auto pb-5">
      <template v-for="item, i in items">
        <div @click="rowClicked ? row_clicked(item, i) : null"
          class="w-full h-10 min-h-max flex flex-wrap md:flex-nowrap justify-between px-5 border-b border-dashed items-center text-sm text-gray-900"
          :class="item.color ? `${item.color} hover:bg-opacity-50` : 'hover:bg-gray-100', rowClicked ? 'cursor-pointer' : ''">
          <span class="sr-only md:not-sr-only w-10 min-w-[40px] max-w-[40px] flex items-center">{{
            i + 1
          }}</span>
          <template v-for="head in headers">
            <span class="w-32 min-w-max h-full flex items-center">{{
              utils.formatText(head.type,
                item[head.key]) }}</span>
          </template>
        </div>
      </template>
    </div>
    <!-- end:body -->
  </div>
</template>

<script setup>
import utils from '@/utils/utils';
</script>

<script>

export default {
  props: {
    headers: { required: true },
    items: { required: true },
    rowClicked: { required: false },
  },
  emits: ['callback-table'],
  methods: {
    row_clicked(value, index) {
      this.$emit('callback-table', value, index)
    },
    exportdata() {
      utils.exportExcel('data', Object.keys(this.items[0]), this.items.map(dt => Object.values(dt)))
    }
  }
}
</script>
