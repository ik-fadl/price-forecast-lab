<template>
  <div class="w-full h-14 max-h-[56px] flex items-center justify-between px-1 bg-base-gray">
    <slot name="left-side">
      <div class="flex gap-2 items-end">
        <span class="text-sm font-semibold text-gray-900">{{ name_app }} </span>
        <span class="text-gray-600">|</span>
        <span class="capitaliz text-sm capitalize text-gray-900 font-medium">{{
          title }}</span>
      </div>
    </slot>
    <slot name="right-side"></slot>
  </div>
</template>

<script setup>
</script>

<script>
export default {
  data() {
    return {
      name_app: import.meta.env.VITE_APP_NAME
    }
  },
  computed: {
    title() {
      return this.$route.query.comodity?.replaceAll('-', ' ') ?? this.$route.name
    }
  }
}
</script>
