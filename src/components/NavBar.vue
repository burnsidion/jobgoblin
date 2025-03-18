<template>
  <nav
    class="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-transparent p-4 backdrop-blur-md md:p-10 md:backdrop-blur-none lg:p-14"
  >
    <div class="text-2xl font-bold text-white">
      <router-link
        to="/"
        @click="handleClick"
        class="relative text-lg font-medium transition duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:origin-center after:bg-white after:transition-all after:duration-300 hover:text-gray-400 hover:after:left-0 hover:after:w-full"
      >
        Home
      </router-link>
    </div>

    <!-- Desktop Navigation -->
    <ul class="hidden space-x-6 text-white md:flex">
      <router-link
        to="/application"
        class="relative text-lg font-medium transition duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:origin-center after:bg-white after:transition-all after:duration-300 hover:text-gray-400 hover:after:left-0 hover:after:w-full"
      >
        New Application
      </router-link>
      <router-link
        to="/projects"
        class="relative text-lg font-medium transition duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:origin-center after:bg-white after:transition-all after:duration-300 hover:text-gray-400 hover:after:left-0 hover:after:w-full"
      >
        Projects
      </router-link>
      <router-link
        to="/contact"
        class="relative text-lg font-medium transition duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:origin-center after:bg-white after:transition-all after:duration-300 hover:text-gray-400 hover:after:left-0 hover:after:w-full"
      >
        Contact
      </router-link>
    </ul>

    <!-- Hamburger Button (Mobile) -->
    <button @click="openMenu" class="text-3xl text-white md:hidden">☰</button>

    <!-- Mobile Menu Modal -->
    <transition name="slide-fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 flex min-h-screen w-full flex-col items-center justify-center space-y-6 bg-black bg-opacity-90 text-2xl text-white"
      >
        <button @click="closeMenu" class="absolute right-5 top-5 text-3xl">✕</button>
        <router-link
          to="/about"
          @click="closeMenu"
          class="transition duration-300 hover:text-gray-400"
        >
          About
        </router-link>
        <router-link
          to="/application"
          @click="closeMenu"
          class="transition duration-300 hover:text-gray-400"
        >
          New Application
        </router-link>
        <router-link to="/" @click="closeMenu" class="transition duration-300 hover:text-gray-400">
          Home
        </router-link>
        <router-link to="/contact" class="transition duration-300 hover:text-gray-400">
          Contact
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isMenuOpen = ref<boolean>(false);

const isSpinning = ref<boolean>(false);

const openMenu = (): void => {
  isMenuOpen.value = true;
};

const closeMenu = (): void => {
  isMenuOpen.value = false;
};

const handleClick = async (): Promise<void> => {
  if (!isSpinning.value) {
    isSpinning.value = true;
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    isSpinning.value = false;
  }

  if (route.path === '/') {
    router.replace({ path: '/refresh' }).then(() => {
      router.replace('/');
    });
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.4s ease-in-out,
    transform 0.4s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes spin3D {
  0% {
    transform: perspective(400px) rotateY(0deg);
  }

  50% {
    transform: perspective(400px) rotateY(180deg);
  }

  100% {
    transform: perspective(400px) rotateY(360deg);
  }
}

.animate-3d-spin {
  animation: spin3D 0.6s ease-out;
}
</style>
