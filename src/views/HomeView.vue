<template>
  <div class="relative flex justify-center items-center w-full h-screen">
    <div class="relative z-10 flex flex-col items-center text-center max-w-lg p-8">
      <BoxReveal color="linear-gradient(to right, #F8FAFC, #E5E7EB)">
        <p class="text-[3.5rem] font-semibold">
          Welcome To JobGoblin<span class="text-white">.</span>
        </p>
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
        <Button @click="toggleLoginForm" variant="ghost" class="text-lg border border-transparent hover:border-white">
          Log In
        </Button>
        <Button @click="toggleForm" variant="ghost" class="text-lg border border-transparent hover:border-white">
          Sign Up
        </Button>
      </div>
    </div>

    <!-- Modal for Sign-Up Form -->
    <Transition enter-active-class="transition-transform duration-300 ease-in-out"
      enter-from-class="translate-x-full opacity-0" enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-transform duration-300 ease-in-out" leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0">
      <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 mx-2">
        <div ref="signupModal"
          class="w-full max-w-md sm:max-w-lg h-auto sm:h-auto sm:max-h-[90vh] bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col relative">
          <button @click="toggleForm" class="absolute top-2 right-2 text-white text-xl">&times;</button>
          <SignUpForm @switch-to-login="handleSwitchToLogin" />
        </div>
      </div>
    </Transition>

    <!-- Log In Modal -->
    <Transition enter-active-class="transition-transform duration-300 ease-in-out"
      enter-from-class="-translate-x-full opacity-0" enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-transform duration-300 ease-in-out" leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0">
      <div v-if="showLoginForm" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 mx-2">
        <div ref="loginModal"
          class="w-full max-w-md sm:max-w-lg h-auto sm:h-auto sm:max-h-[90vh] bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col relative">
          <button @click="toggleLoginForm" class="absolute top-2 right-2 text-white text-xl">&times;</button>
          <LogInForm />
        </div>
      </div>
    </Transition>
    <ParticlesBg class="absolute inset-0 -z-10" :quantity="100" :ease="100" :color="isDark ? '#FFF' : '#000'"
      :staticity="10" refresh />
  </div>
</template>

<script setup lang="ts">
import ParticlesBg from '@/components/ui/particles-bg/ParticlesBg.vue';
import BoxReveal from '@/components/ui/box-reveal/BoxReveal.vue';

import { computed, ref } from 'vue';
import { useColorMode, onClickOutside } from '@vueuse/core';
import { Button } from '@/components/ui/button';

import SignUpForm from '@/components/SignUpForm.vue';
import LogInForm from '@/components/LogInForm.vue';

const showForm = ref(false);
const showLoginForm = ref(false);

const signupModal = ref<HTMLElement | null>(null);
const loginModal = ref<HTMLElement | null>(null);

const colorMode = useColorMode();
colorMode.value = 'dark';

const isDark = computed(() => colorMode.value === 'dark');

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (showForm.value) showLoginForm.value = false;
};

const toggleLoginForm = () => {
  showLoginForm.value = !showLoginForm.value;
  if (showLoginForm.value) showForm.value = false;
};

const handleSwitchToLogin = () => {
  showForm.value = false;
  showLoginForm.value = true;
};

onClickOutside(loginModal, () => {
  showLoginForm.value = false;
});

onClickOutside(signupModal, () => {
  showForm.value = false;
});
</script>
