<template>
  <div class="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
    <h2 class="text-white text-center text-2xl font-semibold mb-4">Create an account</h2>

    <form @submit.prevent="submitForm">
      <!-- First Name Field -->
      <FormField name="firstName">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input v-model="firstName" type="text" placeholder="First Name" />
          </FormControl>
          <FormMessage v-if="errors.firstName">{{ errors.firstName }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Last Name Field -->
      <FormField name="lastName">
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input v-model="lastName" type="text" placeholder="Last Name" />
          </FormControl>
          <FormMessage v-if="errors.lastName">{{ errors.lastName }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Email Field -->
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

      <!-- Confirm Password Field -->
      <FormField name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input v-model="confirmPassword" type="password" placeholder="••••••" />
          </FormControl>
          <FormMessage v-if="errors.confirmPassword">{{ errors.confirmPassword }}</FormMessage>
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <Button type="submit" variant="ghost" class="mt-2" :disabled="isLoading">Sign Up</Button>
      </div>
    </form>

    <!-- Have an Account? -->
    <p class="text-sm text-gray-400 text-center mt-4">
      Already have an account?
      <button @click="$emit('switch-to-login')" class="text-blue-400 hover:underline">
        Log In
      </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Button } from '@/components/ui/button';
import { Input } from './ui/input';

import { useAuthStore } from '@/stores/authStore';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

defineEmits(['switch-to-login']);

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const signUpSchema = toTypedSchema(
  z.object({
    email: z.string().email('Invalid Email Format').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
    firstName: z.string().min(1, 'First name is required').max(50, 'First name cannot be longer than 50 characters'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Last name cannot be longer than 50 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don’t match',
    path: ['confirmPassword'],
  })
);

type SignUpFormValues = z.infer<typeof signUpSchema>;

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: signUpSchema,
});

const [email] = defineField('email');
const [password] = defineField('password');
const [firstName] = defineField('firstName');
const [lastName] = defineField('lastName');
const [confirmPassword] = defineField('confirmPassword');

const onSubmit = async (values: SignUpFormValues) => {

  isLoading.value = true;
  try {
    const userData: User = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    const user = await authStore.signUp(userData);

    if (user) {
      router.push('/home');
    }
  } catch (error) {
    console.error("Sign Up error", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    alert(`Signup failed: ${errorMessage}`);
  } finally {
    isLoading.value = false;
  }
};

const submitForm = handleSubmit(onSubmit);
</script>

<style lang="scss" scoped></style>
