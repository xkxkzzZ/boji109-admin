import {defineStore} from 'pinia'
import { superlogin } from '@/api/auth';
import { uploadItem } from '@/api/item';

export const useAuthStore = defineStore( 'auth', {
  state: () => ({
    isAuthenticated: false,
    username: null,
    token: null,
  }),
  actions: {
    async superlogin(form) {
      const response = await superlogin(form);
      if (response.status === 200) {
        this.isAuthenticated = true;
        this.username = response.data.username;
        this.token = response.data.token;
      }
      return response;
    },
    async debuglogin() {
      this.isAuthenticated = true;
      this.username = "debug";
      this.token = "debug";
    },
    async superlogout() {
      this.isAuthenticated = false;
      this.username = null;
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