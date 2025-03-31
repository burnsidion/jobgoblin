<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from './components/NavBar.vue';

const route = useRoute();

const showNavbar = computed(() => !route.meta.hideNavbar);
</script>

<template>
  <div>
    <NavBar v-if="showNavbar" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
/* Fade In/Out Animation */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
