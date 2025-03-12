<template>
  <div class="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
    <h2 class="text-white text-center text-2xl font-semibold mb-4">Create an account</h2>

    <form @submit.prevent="handleSubmit(onSubmit)" class="space-y-4">
      <!-- Email Field -->
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

      <!-- Confirm Password Field -->
      <FormField name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input v-model="confirmPassword.value.value" type="password" placeholder="••••••" />
          </FormControl>
          <FormMessage v-if="confirmPassword.errorMessage">{{ confirmPassword.errorMessage }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <div class="flex justify-center"><Button type="submit" variant="ghost" class="mt-2">Sign Up</Button></div>
    </form>

    <!-- Have an Account? -->
    <p class="text-sm text-gray-400 text-center mt-4">
      Already have an account?
      <button @click="switchToLogin" class="text-blue-400 hover:underline">Log In</button>
    </p>
  </div>
</template>
<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const email = useField<string>('email');
const password = useField<string>('password');
const confirmPassword = useField<string>('confirmPassword');

const signUpSchema = toTypedSchema(
  z
    .object({
      email: z.string().email('Invalid Password Format'),
      password: z.string().min(6, 'Password must contain at least 6 characters'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords dont match',
      path: ['confirmPassword'],
    }),
);

const { handleSubmit } = useForm<SignUpFormValues>({
  validationSchema: signUpSchema,
});

const onSubmit = (values: SignUpFormValues) => {
  console.log("Form submitted", values);
};
</script>

<style lang="scss" scoped></style>
