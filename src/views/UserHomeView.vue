<template>
  <div
    class="bg-[#0A0A0A] px-4 flex flex-col min-h-screen justify-center items-center bg-gradient-to-b from-[#0A0A0A] to-[#0F172A]">
    <BlurReveal :delay="0.2" :duration="0.75" class="p-8">
      <h2 class=" text-white text-3xl font-bold tracking-tighter xl:text-6xl/none sm:text-5xl">Welcome Back</h2>
      <span class="text-white text-pretty text-xl tracking-tighter xl:text-4xl/none sm:text-3xl">
        Lets get started
      </span>
    </BlurReveal>
    <div v-if="resumes && resumes.length === 0" class="flex flex-col gap-2 items-center">
      <p class="text-white animate-pulse text-lg text-center">
        Looks like you need to upload your first resume. Would you like to do that now?
      </p>
      <FileUpload
        class="flex flex-col w-[400px] h-[400px] items-center justify-center max-w-lg px-6 py-10 border-2 border-dashed border-neutral-600 rounded-lg bg-neutral-900 shadow-lg hover:border-sky-400 transition-all duration-300">
        <FileUploadGrid />
      </FileUpload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useResumeStore } from '@/stores/resumeStore';

import BlurReveal from '@/components/ui/blur-reveal/BlurReveal.vue';
import FileUpload from '@/components/ui/file-upload/FileUpload.vue';
import FileUploadGrid from '@/components/ui/file-upload/FileUploadGrid.vue';

const resumeStore = useResumeStore();

onMounted(async () => {
  await resumeStore.fetchResumes();
});

const resumes = computed(() => resumeStore.resumes);
</script>

<style scoped>
/* You can add additional styles if needed */
</style>
