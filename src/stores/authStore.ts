import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';
import { supabase } from '@/utilities/supabaseClient';

interface UserCredentials {
  email: string;
  password: string;
}

interface User extends UserCredentials {
  firstName: string;
  lastName: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const router = useRouter();

  const fetchSession = async (): Promise<void> => {
    const { data, error }: { data: { session: Session | null }; error: AuthError | null } = await supabase.auth.getSession();

    if (error) {
      console.error('❌ Error fetching session:', error);
      return;
    }

    if (data.session) {
      user.value = data.session.user;
    } else {
      console.warn('🚨 No active session found!');
      user.value = null;
    }
  };

  fetchSession();

  const signUp = async (userData: User): Promise<User | null> => {
    try {
      const response = await fetch('http://localhost:5005/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName,
          last_name: userData.lastName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      user.value = data.user;
      router.push('/home');
      return data.user;
    } catch (error) {
      console.error('Error creating user', error);
      return null;
    }
  };

  const login = async (credentials: UserCredentials) => {
    try {
      const response = await fetch('http://localhost:5005/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      user.value = data.user;
      await supabase.auth.setSession({
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token'),
      });
      router.push('/home');
    } catch (error) {
      console.error('Error logging in', error);
      return null;
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      user.value = null;
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    signUp,
    login,
    logOut,
    fetchSession,
    user,
  };
});
