<template>
  <div class="bg-[#0A0A0A] min-h-screen flex flex-col">
    <!-- Lamp Effect at the top -->
    <div class="h-[250px] w-full">
      <LampEffect>
        <div class="flex justify-center items-center h-full">
          <h1 class="text-white text-3xl font-bold">Welcome Back</h1>
        </div>
      </LampEffect>
    </div>

    <!-- Rest of the page content -->
    <div class="flex-grow p-8 text-white">
      <p>Dashboard content goes here...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LampEffect from '@/components/ui/lamp-effect/LampEffect.vue';
</script>

<style scoped>
/* You can add additional styles if needed */
</style>
