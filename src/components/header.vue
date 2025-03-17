<template>
    <header class="bg-white shadow-sm border-b border-gray-200">
        <!-- Desktop Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <!-- Logo and Brand -->
                <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <svg class="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M8 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M8 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <span class="ml-2 text-lg font-semibold text-gray-900">博记天下数据管理系统</span>
                        </div>
                    </div>

                    <div v-if="authStore.isAuthenticated" class="hidden sm:ml-6 sm:flex sm:space-x-8">

                        <router-link to="/"
                            class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">主页</router-link>
                        <router-link to="/context"
                            class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">内容管理</router-link>
                        <router-link to="/library"
                            class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">子库管理</router-link>
                        <router-link to="/user"
                            class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">用户管理</router-link>
                        <router-link to="/order"
                            class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">订单管理</router-link>
                        <router-link to="/info"
                            class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">信息管理</router-link>

                    </div>





                </div>
                <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <router-link to="/login" v-if="!authStore.isAuthenticated"
                        class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">登录</router-link>
                    <button @click="handlelogout" v-else
                        class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">登出</button>
                </div>
                <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <button @click="authStore.debuglogin"
                        class="text-gray-500 border-transparent hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">debuglogin</button>
                </div>

            </div>
        </div>




    </header>
</template>

<script setup>
import { useAuthStore } from '@/store/superuser';
import router from '@/router';
const authStore = useAuthStore();

const handlelogout = () => {
    authStore.superlogout();
    router.push('/login');
}


</script>