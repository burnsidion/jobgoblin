<template>
  <div class="relative flex justify-center items-center w-full h-screen">
    <!-- Content should be centered above the canvas -->
    <div class="relative z-10 flex flex-col items-center text-center max-w-lg p-8">
      <BoxReveal color="linear-gradient(to right, #F8FAFC, #E5E7EB)">
        <p class="text-[3.5rem] font-semibold">Welcome To JobGoblin<span class="text-white">.</span></p>
      </BoxReveal>

      <BoxReveal color="linear-gradient(to right, #E5E7EB, #9CA3AF)" :duration="1">
        <h2 class="mt-[.5rem] text-[1rem]">
          AI assistance for job hunters
          <span class="text-[#FACC15]">Resume Help & Job Organization</span>
        </h2>
      </BoxReveal>

      <BoxReveal color="linear-gradient(to right, #9CA3AF, #6B7280)" :duration="1.2">
        <div class="my-6">
          <p>
            -&gt; Free and easy way to
            <span class="font-semibold text-[#3B82F6]"> Tailor your resumes</span>,
            <span class="font-semibold text-[#3B82F6]"> Track job progress</span>, and
            <span class="font-semibold text-[#3B82F6]"> Land a job that you love.</span>
            <span class="font-semibold text-[#3B82F6]"> Writing code that you love</span>
            . <br />
            -&gt; Let's get started! <br />
          </p>
        </div>
      </BoxReveal>

      <!-- Buttons -->
      <div class="flex gap-3 justify-center py-3">
        <Button variant="ghost" class="text-lg border border-transparent hover:border-white"> Log In </Button>
        <Button variant="ghost" class="text-lg border border-transparent hover:border-white"> Sign Up </Button>
      </div>
    </div>

    <!-- Background should be behind everything -->
    <ParticlesBg class="absolute inset-0 -z-10" :quantity="100" :ease="100" :color="isDark ? '#FFF' : '#000'"
      :staticity="10" refresh />
  </div>
</template>

<script setup lang="ts">
import ParticlesBg from '@/components/ui/particles-bg/ParticlesBg.vue';
import BoxReveal from '@/components/ui/box-reveal/BoxReveal.vue';

import { computed } from "vue";
import { useColorMode } from "@vueuse/core";
import { Button } from '@/components/ui/button';

const colorMode = useColorMode();
colorMode.value = "dark";

const isDark = computed(() => colorMode.value === "dark");
</script>
