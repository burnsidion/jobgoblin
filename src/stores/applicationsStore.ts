import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { useResumeStore } from './resumeStore';
import { useAuthStore } from './authStore';

interface Application {
  id?: string;
  user_id?: string;
  company_name: string;
  job_title: string;
  job_description: string;
  job_link?: string;
  date_applied: string;
  status?: string;
  resume_used: string;
}
export const useApplicationStore = defineStore('applicationStore', () => {
  const resumeStore = useResumeStore();
  const authStore = useAuthStore();

  const userResumes = computed(() => resumeStore.resumes);

  const fetchUserResumes = async () => {
    await resumeStore.fetchResumes();
  };

  const application = ref<Application>({
    company_name: '',
    job_title: '',
    job_description: '',
    job_link: '',
    date_applied: '',
    status: '',
    resume_used: '',
  });

  const applications = ref<Application[]>([]);

  const createApplication = (values: Application) => {
    applications.value.push(values);
  };
  async function submitApplication(values: Application) {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:5005/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create application');
      }

      const data = await response.json();
      createApplication(data.data);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  }

  return { application, fetchUserResumes, userResumes, createApplication, submitApplication };
});
