<template>
  <div class="container mx-auto p-8">
    <h1 class="mb-8 text-3xl font-bold text-center">Your Base Resumes</h1>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
      <GlowBorder
        class="relative flex items-center justify-center rounded-lg md:shadow-xl"
        :color="['#A07CFE', '#FE8FB5', '#FFBE7B']">
        <DirectionAwareHover v-for="resume in userResumes" :key="resume.id"
          :image-url="resume.preview_image || 'https://via.placeholder.com/300x400?text=Resume+Preview'"
          class="shadow-lg w-[200px] h-[280px] object-cover">
          <h2 class="text-xl font-semibold text-black">{{ resume.resume_name }}</h2>
          <p class="mt-2 text-black">Uploaded Resume</p>
        </DirectionAwareHover>
      </GlowBorder>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useResumeStore } from "@/stores/resumeStore";
import DirectionAwareHover from "./ui/direction-aware-hover/DirectionAwareHover.vue";
import GlowBorder from "./ui/glow-border/GlowBorder.vue";

const resumeStore = useResumeStore();
const userResumes = computed(() => resumeStore.resumes);

onMounted(async () => {
  await resumeStore.fetchResumes();
});
</script>
