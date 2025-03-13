<template>
  <div class="bg-[#0A0A0A] min-h-screen justify-center items-center flex bg-gradient-to-b from-[#0A0A0A] to-[#0F172A]">
    <BlurReveal
      :delay="0.2"
      :duration="0.75"
      class="p-8"
    >
      <h2 class=" text-white text-3xl font-bold tracking-tighter xl:text-6xl/none sm:text-5xl">Welcome Back</h2>
      <span class="text-white text-pretty text-xl tracking-tighter xl:text-4xl/none sm:text-3xl">
        Lets get started
      </span>
    </BlurReveal>
  </div>
</template>

<script setup lang="ts">
import BlurReveal from '@/components/ui/blur-reveal/BlurReveal.vue';
</script>

<style scoped>
/* You can add additional styles if needed */
</style>
