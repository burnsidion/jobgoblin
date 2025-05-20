<template>
  <div class="flex flex-col items-start gap-4">
    <section class="flex w-full flex-col items-center justify-center">
      <MultiStepLoader :steps="simpleLoadingSteps" :loading="uiState.isSimpleLoading" :prevent-close="true"
        @state-change="handleStateChange" @complete="handleComplete" />
    </section>
  </div>
</template>

<script setup lang="ts">
import MultiStepLoader from "@/components/ui/multi-step-loader/MultiStepLoader.vue";
import { reactive, computed } from "vue";
import { useResumeStore } from "@/stores/resumeStore";

const resumeStore = useResumeStore();

interface Step {
  text: string;
  afterText?: string;
  async?: boolean;
  duration?: number;
  action?: () => void;
}

const props = defineProps<{
  applicationData: any;
}>();

const emit = defineEmits(["complete"]);

const uiState = reactive({
  isSimpleLoading: false,
  isAfterTextLoading: false,
  closeSimple: () => {
    uiState.isSimpleLoading = false;
  },
  closeAsync: () => {
    uiState.isAfterTextLoading = false;
  },
});

// Simple loading steps configuration
const simpleLoadingSteps = computed<Step[]>(() => [
  { text: "Analyzing Job Description", duration: 1500 },
  { text: "Scanning Base Resume", duration: 1500 },
  { text: "Generating Tailored Version", duration: 2000 },
  { text: "Formatting Resume", duration: 1500 },
  {
    text: "Uploading Files",
    duration: 1000,
    action: handleSimpleLoadingComplete,
  },
]);


// Event handlers
const handleStateChange = (state: number) => {
  // Handle Loading State Change
};

const handleComplete = () => {
  // Handle Loading Complete
};

const handleSimpleLoadingComplete = () => {
  uiState.isSimpleLoading = false;
  emit("complete");
};

const startLoading = async () => {
  uiState.isSimpleLoading = true;

  const tailoredResumeUrl = await resumeStore.tailorResume(
    props.applicationData.job_description,
    props.applicationData.resume_used
  );

  console.log('🎯 Tailored resume URL:', tailoredResumeUrl);
};

defineExpose({ startLoading });
</script>
