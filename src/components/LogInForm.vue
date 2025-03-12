<template>
  <div class="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
    <h2 class="text-white text-center text-2xl font-semibold mb-4">Log in to your account</h2>

    <form @submit.prevent="handleSubmit(onSubmit)" class="space-y-4">
      <!-- Email Field  -->
      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input v-model="email.value.value" type="email" placeholder="you@example.com" />
          </FormControl>
          <FormMessage v-if="email.errorMessage">{{ email.errorMessage }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Password Field -->
      <FormField name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input v-model="password.value.value" type="password" placeholder="••••••" />
          </FormControl>
          <FormMessage v-if="password.errorMessage">{{ password.errorMessage }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <Button type="submit" variant="ghost" class="mt-2">Log In</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

type LoginFormValues = {
  email: string;
  password: string;
};

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
  })
);

const { handleSubmit } = useForm<LoginFormValues>({
  validationSchema: loginSchema,
});

const email = useField<string>('email');
const password = useField<string>('password');

const onSubmit = (values: LoginFormValues) => {
  console.log("Form submitted", values);
};
</script>

<style scoped></style>
