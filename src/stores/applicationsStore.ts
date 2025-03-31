import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { useResumeStore } from './resumeStore';

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
      const response = await fetch('/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
