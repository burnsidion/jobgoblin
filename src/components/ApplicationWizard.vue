<template>
  <div>
    <StepOneForm v-if="currentStep === 1" @next="handleFormSubmit" />
    <TailorLoaderWrapper ref="loaderRef" v-if="currentStep === 2" :application-data="applicationData"
      @complete="currentStep = 3" />
    <!-- <TailoredResumePreview v-if="step === 3" :resumeUrl="resumeUrl" :previewUrl="previewUrl" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import StepOneForm from './StepOneForm.vue';
import TailorLoaderWrapper from './TailorLoaderWrapper.vue';
import { useApplicationStore } from '@/stores/applicationsStore';

const currentStep = ref(1);
const loaderRef = ref(null);
const applicationData = ref(null);

const applicationStore = useApplicationStore();
// const resumeUrl = ref('');
// const previewUrl = ref('');

const handleFormSubmit = async (data: any) => {
  await applicationStore.submitApplication(data);
  applicationData.value = data;
  currentStep.value = 2;

  await nextTick();
  loaderRef.value?.startLoading();
  currentStep.value = 3;
};
</script>
