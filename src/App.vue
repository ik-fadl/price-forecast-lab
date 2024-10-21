<template>
  <div class="w-screen h-screen bg-gray-200 flex items-center">
    <div class="h-[12vh] w-full bg-blue-1 fixed top-0"></div>
    <div
      class="w-full h-full 2xl:h-[96vh] max-w-[1480px] mx-auto bg-base-gray rounded-0 2xl:rounded-xl overflow-hidden">
      <div class="relative w-full h-full flex">
        <!-- SIDEBAR -->
        <SideBar></SideBar>
        <!-- end:sidebar -->
        <div class="w-full h-full bg-base-gray flex flex-col ps-3 sm:ps-0 pe-3">
          <!-- TOPBAR -->
          <TopBar />
          <!-- end:topbar -->
          <!-- CONTENT -->
          <div class="w-full h-[90vh] border rounded-xl bg-white overflow-auto">
            <RouterView />
          </div>
          <!-- end:content -->
        </div>
      </div>
    </div>
  </div>
  <AnimateLoader v-if="store().loader" />
</template>

<script setup>
import AnimateLoader from './components/component/AnimateLoader.vue';
import SideBar from './components/layout/SideBar.vue';
import TopBar from './components/layout/TopBar.vue';
import { store } from './stores/store';
</script>
