<template>
  <div class="w-full h-14 max-h-[56px] flex items-center justify-between px-1 bg-base-gray">
    <slot name="left-side">
      <div class="flex gap-2 items-end">
        <span class="text-sm font-semibold text-gray-600">{{ name_app }} </span>
        <span class="text-gray-400">|</span>
        <span class="capitaliz text-sm capitalize text-gray-500 font-medium">{{
          $route.name?.replaceAll('-', ' ') }}</span>
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
}
</script>
