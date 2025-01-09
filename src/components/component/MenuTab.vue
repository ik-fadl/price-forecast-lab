<template>
  <!-- TAB MENU -->
  <div class="w-full h-12 min-h-[48px] px-10 z-10 flex gap-5 items-center border-b text-sm text-gray-900">
    <div class="relative not-sr-only sm:sr-only">
      <button @click="openMenu()" class="ri-menu-line"></button>
      <div v-if="openMiniMenu" class="absolute mt-5 w-40 h-max max-h-64 rounded bg-white shadow-lg text-xs font-medium">
        <template v-for="tab in tab_menu">
          <div class="w-full flex">
            <div @mouseenter="openTab(tab)"
              class="w-full flex justify-between items-center min-h-10 py-2 px-3 hover:bg-gray-100 cursor-pointer">
              <span> {{ tab.name }} </span>
              <span v-if="tab.children" class="ri-arrow-right-s-line"></span>
            </div>
            <div v-if="tab.active" @mouseleave="closeTab()"
              class="absolute w-40 h-max max-h-64 ms-[50%] rounded bg-white shadow-xl text-xs font-medium">
              <template v-for="child in tab.children">
                <span @click="goto(child)"
                  class="min-h-10 py-2 px-3 flex items-center hover:bg-gray-100 cursor-pointer">
                  {{ child.name }}
                </span>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template v-for="tab in tab_menu">
      <div class="relative overflow-hidden sr-only sm:not-sr-only">
        <button @mouseenter="openTab(tab)" class="px-1 flex items-center h-12 min-w-max border-b"
          :class="tab.active ? 'border-gray-600' : 'border-transparent'">
          <span>{{ tab.name }}</span>
          <span v-if="tab.children" class="ri-arrow-down-s-line"></span>
        </button>
        <div v-if="tab.active" @mouseleave="closeTab()"
          class="absolute mt-5 w-40 h-max max-h-64 rounded bg-white shadow text-xs font-medium">
          <template v-for="child in tab.children">
            <span @click="goto(child)" class="min-h-10 py-2 px-3 flex items-center hover:bg-gray-100 cursor-pointer">
              {{ child.name }}
            </span>
          </template>
        </div>
      </div>
    </template>
  </div>
  <!-- end:tab -->
</template>

<script>
import comodities from '@/comodities';

export default {
  props: {
    key: { required: true },
  },
  emits: ['refresh'],
  data() {
    return {
      openMiniMenu: false,
      tab_menu: ''
    }
  },
  created() {
    this.tab_menu = [...comodities.data]
  },
  methods: {
    openTab(menu) {
      this.tab_menu.map(tab => tab.active = tab == menu)
    },
    closeTab() {
      this.openMiniMenu = false
      this.tab_menu.map(tab => tab.active = false)
    },
    goto(menu) {
      console.log(menu);

      this.$router.push({ name: this.key, query: { comodity: menu.key, id: menu.id } })
      this.closeTab()
      this.$emit('refresh', menu.id)
    },
    openMenu() {
      this.openMiniMenu = !this.openMiniMenu
      if (!this.openMiniMenu) this.tab_menu.map(tab => tab.active = false)
    }
  }

}
</script>
