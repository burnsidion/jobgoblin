import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../utilities/supabaseClient';
// import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    console.log('📌 Auth Store: Received data:', { email, password, firstName, lastName });

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('🚨 Supabase Auth Error:', error);
      throw error;
    }

    console.log('✅ Supabase Auth Success:', data.user);

    if (data.user) {
      console.log("📌 Attempting to insert into 'users' table:", {
        id: data.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
      });

      const { error: insertError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, email, first_name: firstName, last_name: lastName }]);

      if (insertError) {
        console.error('🚨 Supabase Insert Error:', insertError);
        throw insertError;
      }

      user.value = data.user;
    }

    return data.user;
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    user.value = data.user;
    return data.user;
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  return {
    signUp,
    login,
    logOut,
  };
});
