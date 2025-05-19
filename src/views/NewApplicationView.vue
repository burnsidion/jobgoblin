<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 px-4">
    <div class="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-white text-center text-2xl font-semibold mb-4">New Job Application</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Company Name Field  -->
        <FormField name="company">
          <FormItem>
            <FormLabel> Company Name</FormLabel>
            <FormControl>
              <Input v-model="company" type="text" placeholder="Company Name" class="w-full" />
            </FormControl>
            <FormMessage v-if="errors.company">{{ errors.company }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Role Field  -->
        <FormField name="role">
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <Input v-model="role" type="text" placeholder="Role (example: Frontend Software Engineer)"
                class="w-full" />
            </FormControl>
            <FormMessage v-if="errors.role">{{ errors.role }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Role Description  -->
        <FormField name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <textarea v-model="description" placeholder="Role Description"
                class="w-full bg-gray-700 p-2 rounded text-white"></textarea>
            </FormControl>
            <FormMessage v-if="errors.description">{{ errors.description }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Resume Selection -->
        <FormField name="resume">
          <FormItem>
            <FormLabel>Select Resume</FormLabel>
            <FormControl>
              <select v-model="resume" class="w-full bg-gray-700 p-2 rounded text-white">
                <option v-for="resumeOption in userResumes" :key="resumeOption.id" :value="resumeOption.resume_file">
                  {{ resumeOption.resume_name }}
                </option>
              </select>
            </FormControl>
            <FormMessage v-if="errors.resume">{{ errors.resume }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <Button type="submit" variant="ghost" class="text-lg border border-transparent hover:border-white mt-3">
            Tailor Resume
          </Button>
          <Button type="button" variant="ghost" class="text-lg border border-transparent hover:border-white mt-3">
            <router-link to="/home" class="transition duration-300 hover:text-gray-400">
              Cancel
            </router-link>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { onMounted, computed } from 'vue';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useApplicationStore } from '@/stores/applicationsStore';

const applicationStore = useApplicationStore();


onMounted(async () => {
  await applicationStore.fetchUserResumes();
});

const userResumes = computed(() => applicationStore.userResumes);

// const selectedResume = ref<string | null>(null);

const schema = toTypedSchema(
  z.object({
    company: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
    description: z.string().min(10, "Job description should be at least 10 characters"),
    resume: z.string().min(1, "Resume selection is required"),
  })
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
});

const [company] = defineField("company");
const [role] = defineField("role");
const [description] = defineField("description");
const [resume] = defineField("resume");

const submitForm = handleSubmit(async (values) => {
  const applicationData = {
    company_name: values.company,
    job_title: values.role,
    job_description: values.description,
    resume_used: values.resume,
  };
  await applicationStore.submitApplication(applicationData);
});
</script>

<style scoped></style>
