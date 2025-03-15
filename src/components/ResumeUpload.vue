<template>
  <div>
    <FileUpload
      class="flex flex-col w-[400px] h-[400px] items-center justify-center max-w-lg px-6 py-10 border-2 border-dashed border-neutral-600 rounded-lg bg-neutral-900 shadow-lg hover:border-sky-400 transition-all duration-300"
      @change="handleFileUpload"
    >
      <FileUploadGrid />
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import FileUpload from './ui/file-upload/FileUpload.vue';
import FileUploadGrid from './ui/file-upload/FileUploadGrid.vue';

import { useResumeStore } from '@/stores/resumeStore';

const resumeStore = useResumeStore();

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    console.log('Uploading file:', file.name);
    await resumeStore.uploadResume(file);
  }
};
</script>

<style scoped></style>
