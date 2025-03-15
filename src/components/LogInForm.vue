<template>
  <div class="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
    <h2 class="text-white text-center text-2xl font-semibold mb-4">Log in to your account</h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Email Field  -->
      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input v-model="email" type="email" placeholder="you@example.com" />
          </FormControl>
          <FormMessage v-if="errors.email">{{ errors.email }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Password Field -->
      <FormField name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input v-model="password" type="password" placeholder="••••••" />
          </FormControl>
          <FormMessage v-if="errors.password">{{ errors.password }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <Button type="submit" variant="ghost" class="mt-2" :disabled="isLoading">Log In</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAuthStore } from '@/stores/authStore';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const isLoading = ref(false);
const authStore = useAuthStore();

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
  }),
);

type LoginFormValues = z.infer<typeof loginSchema>;

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: loginSchema,
});

const [email] = defineField('email');
const [password] = defineField('password');

interface UserCredentials {
  email: string;
  password: string;
}

const onSubmit = async (values: LoginFormValues) => {
  isLoading.value = true;
  try {
    const credentials: UserCredentials = {
      email: values.email,
      password: values.password,
    };

    const user = await authStore.login(credentials);

    if (user) {
      console.log('Login successful');
    }
  } catch (error) {
    console.error('Login error', error.message);
  } finally {
    isLoading.value = false;
  }
};

const submitForm = handleSubmit(onSubmit);
</script>

<style scoped></style>
