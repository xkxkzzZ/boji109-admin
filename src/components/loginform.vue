<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
    <div class="w-full max-w-md">
      <!-- Logo and Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <book-open class="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        <h1 class="text-2xl font-medium text-gray-800">博记天下数据管理系统</h1>
        <p class="text-gray-500 mt-2">请登录以访问管理后台</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form @submit.prevent="handleLogin">
          <!-- Username Input -->
          <div class="mb-5">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <user class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
                placeholder="请输入用户名"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-1">
              <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <lock class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
                placeholder="请输入密码"
                required
              />
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            :disabled="loading"
          >
            <loader-circle v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BookOpen, User, Lock, LoaderCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/store/superuser'
const emit = defineEmits(['gotohome'])

const authStore = useAuthStore()
// Form data
const username = ref('')
const password = ref('')
const loading = ref(false)

// Login handler
const handleLogin = async () => {
  loading.value = true
  try {
    const res = await authStore.superlogin({username:username.value, password:password.value})
    console.log(res)
    if(res.status === 200){
      alert(res.data.message)
      emit('gotohome')
    }else{
      alert(res.data.message)
    }
    
  } catch (error) {
    console.error('Login failed:', error)
    
  } finally {
    loading.value = false
  }
}
</script>