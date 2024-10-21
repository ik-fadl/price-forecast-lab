<template>
  <div class="hidden sm:flex w-16 min-w-[64px] h-full justify-center pt-16 bg-base-gray">
    <div class="flex flex-col gap-4">
      <template v-for="m, i in menu">
        <button :data-tooltip-target="m.key" data-tooltip-placement="right" @click="goto(m, i)"
          class="w-10 h-10 rounded-full hover:border hover:bg-white hover:text-blue-400 duration-100"
          :class="m.active || $route.fullPath.split('/')[1] == m.key ? 'border bg-white text-blue-400' : 'text-gray-500'">
          <span :class="m.icon"></span>
        </button>
        <div :id="m.key" role="tooltip"
          class="absolute duration-100 z-20 invisible inline-block px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          {{ m.name }}
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
</script>

<script>
export default {
  data() {
    return {
      menu: [
        { key: 'dashboard', name: 'Dashboard', icon: 'ri-home-4-line', active: false },
        { key: 'master', name: 'Master', icon: 'ri-database-2-line', active: false },
        { key: 'forecast', name: 'Prediksi', icon: 'ri-bar-chart-grouped-line', active: false },
        { key: 'uji', name: 'Uji prediksi', icon: 'ri-test-tube-line', active: false },
      ]
    }
  },
  methods: {
    goto(m, index) {
      this.menu.map(mn => mn.active = mn == m)
      this.$router.push(`/${m.key}`)
    }
  },
  mounted() {
  }

}
</script>
