import {defineStore} from 'pinia'
import { superlogin } from '@/api/auth';

export const useAuthStore = defineStore( 'auth', {
  state: () => ({
    isAuthenticated: false,
    token: null,
  }),
  actions: {
    async superlogin(form) {
      const response = await superlogin(form);
      if (response.status === 200) {
        this.isAuthenticated = true;
        this.token = response.data.data.token;
        console.log(this.token);
      }
      return response;
    },
    
    async superlogout() {
      this.isAuthenticated = false;
      this.token = null;
    },
  },
  persist: {
    enabled: true, 
    strategies: [
      {
        key: "authStore",
        storage: localStorage, 
      },
    ],
  },
})