<template>
  <div class="container mx-auto p-8">
    <div class="text-center">
      <RadiantText
        class="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
        :duration="5">
        <h1 class="mb-8 text-3xl font-bold">Your Base Resumes</h1>
      </RadiantText>
    </div>
    <!-- Upload More Resumes Input (Hidden when 3 resumes are uploaded) -->
    <div v-if="userResumes.length < 3" class="flex justify-center mb-6">
      <Input ref="fileInputRef" type="file"
        class="file:cursor-pointer file:bg-gray-800 file:text-white w-[50%] file:border-none file:px-4 file:py-2 file:rounded-md file:hover:bg-gray-700"
        @change="onFileChange" />
    </div>

    <!-- Disable Input When Max Resumes Reached -->
    <p v-else class="text-center text-gray-400">Max Resumes Reached (3)</p>

    <div class="flex flex-col gap-4">
      <CardContainer v-for="resume in userResumes" :key="resume.id">
        <CardBody
          class="md:shadow-xlgroup/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
          <CardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
            {{ resume.resume_name }}
          </CardItem>
          <CardItem :translate-z="100" class="mt-4 w-full">
            <img :src="resume.preview_image || 'https://via.placeholder.com/300x400?text=Resume+Preview'
              " height=" 1000" width="1000"
              class="h-[80%] w-full rounded-xl object-cover group-hover/card:shadow-xl py-2" alt="thumbnail" />
          </CardItem>
          <div class="mt-20 flex items-center justify-between">
            <CardItem :translate-z="20" as="button"
              class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
              @click="handleDelete(resume.id)" style="pointer-events: auto;">
              Delete
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useResumeStore } from '@/stores/resumeStore';

import { Input } from './ui/input';
import CardContainer from './ui/card-3d/CardContainer.vue';
import CardItem from './ui/card-3d/CardItem.vue';
import CardBody from './ui/card-3d/CardBody.vue';
import RadiantText from './ui/radiant-text/RadiantText.vue';

const selectedFile = ref<File | null>(null);

const resumeStore = useResumeStore();
const userResumes = computed(() => resumeStore.resumes);

onMounted(async () => {
  await resumeStore.fetchResumes();
});

const onFileChange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
    await resumeStore.uploadResume(selectedFile.value);
  }
};

const handleDelete = async (resumeId: string): Promise<void> => {
  console.log('hello');
  if (!resumeId) {
    console.error("🚨 Resume ID is missing!");
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
  if (!confirmDelete) return;

  await resumeStore.deleteResume(resumeId);
};
</script>
