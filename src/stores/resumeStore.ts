import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/utilities/supabaseClient';

interface Resume {
  id: string;
  user_id: string;
  resume_name: string;
  resume_file: string;
  file_type?: 'pdf' | 'docx';
  created_at: string;
}

export const useResumeStore = defineStore('resume', () => {
  const resumes = ref<Resume[]>([]);

  const fetchResumes = async (): Promise<Resume[] | null> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.access_token) {
        console.error('🚨 No auth session found!');
        return null;
      }

      const response = await fetch('http://localhost:5005/api/resumes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();

      const data = JSON.parse(text);

      resumes.value = data.resumes || [];
      return resumes.value;
    } catch (error) {
      console.error('Error fetching resumes', error);
      return null;
    }
  };

  const uploadResume = async (file: File): Promise<Resume[] | null> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.access_token) {
        console.error('🚨 No auth session found!');
        return null;
      }

      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('http://localhost:5005/api/resumes/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message === 'Resume uploaded successfully') {
        await fetchResumes();
        return resumes.value;
      }

      return null;
    } catch (error) {
      console.error('Error uploading resume', error);
      return null;
    }
  };

  return { fetchResumes, resumes, uploadResume };
});
