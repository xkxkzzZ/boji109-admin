<template>
    <div class="min-h-screen bg-emerald-50/50">
      <!-- Header -->
      <header class="bg-white border-b border-gray-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <!-- Logo and Site Name -->
            <div class="flex items-center">
              <div class="flex-shrink-0 flex items-center">
                <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                  <book-open class="w-4 h-4 text-emerald-600" />
                </div>
                <span class="text-lg font-medium text-gray-800">博记天下数据管理系统</span>
              </div>
            </div>
            
            <!-- User Dropdown -->
            <div class="flex items-center">
              <dropdown-menu>
                <template #trigger>
                  <button class="flex items-center text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50">
                    <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                      <user class="w-4 h-4 text-emerald-600" />
                    </div>
                    <span class="text-gray-700">{{ userData.name }}</span>
                    <chevron-down class="ml-1 w-4 h-4 text-gray-500" />
                  </button>
                </template>
                <div class="py-1 w-48 bg-white rounded-md shadow-lg border border-gray-100">
                  <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <user class="mr-2 w-4 h-4 text-gray-500" />
                    <span>个人信息</span>
                  </a>
                  <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <settings class="mr-2 w-4 h-4 text-gray-500" />
                    <span>设置</span>
                  </a>
                  <div class="border-t border-gray-100 my-1"></div>
                  <a href="#" class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50" @click="logout">
                    <log-out class="mr-2 w-4 h-4 text-red-500" />
                    <span>退出登录</span>
                  </a>
                </div>
              </dropdown-menu>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Welcome Section -->
        <div class="mb-8">
          <h1 class="text-2xl font-medium text-gray-800">欢迎回来，{{ userData.name }}</h1>
          <p class="text-gray-500 mt-1">今天是 {{ currentDate }}，祝您工作愉快</p>
        </div>
  
        <!-- Account Information and Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Account Information Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-1 md:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-gray-800">账号信息</h2>
              <button class="text-emerald-600 hover:text-emerald-500 text-sm flex items-center">
                <edit class="w-4 h-4 mr-1" />
                编辑资料
              </button>
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="text-sm text-gray-500 mb-1">用户名</div>
                  <div class="text-gray-800">{{ userData.username }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500 mb-1">姓名</div>
                  <div class="text-gray-800">{{ userData.name }}</div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="text-sm text-gray-500 mb-1">所属组织</div>
                  <div class="text-gray-800">{{ userData.organization }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500 mb-1">角色</div>
                  <div class="text-gray-800">{{ userData.role }}</div>
                </div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 mb-1">邮箱</div>
                <div class="text-gray-800">{{ userData.email }}</div>
              </div>
              
              <div>
                <div class="text-sm text-gray-500 mb-1">上次登录时间</div>
                <div class="text-gray-800">{{ userData.lastLogin }}</div>
              </div>
            </div>
          </div>
  
          <!-- Quick Actions -->
          <div class="space-y-4">
            <!-- Change Organization -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center mb-4">
                <building class="w-5 h-5 text-emerald-600 mr-2" />
                <h2 class="text-lg font-medium text-gray-800">修改组织</h2>
              </div>
              <p class="text-gray-500 text-sm mb-4">更新您的所属组织信息</p>
              <button class="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                修改组织
              </button>
            </div>
            
            <!-- Change Password -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center mb-4">
                <lock class="w-5 h-5 text-emerald-600 mr-2" />
                <h2 class="text-lg font-medium text-gray-800">修改密码</h2>
              </div>
              <p class="text-gray-500 text-sm mb-4">定期更新密码以保护账号安全</p>
              <button class="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                修改密码
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { 
    BookOpen, 
    User, 
    ChevronDown, 
    LogOut, 
    Settings, 
    Edit, 
    Building, 
    Lock 
  } from 'lucide-vue-next'
  
  // Mock user data
  const userData = ref({
    username: 'admin',
    name: '张文翰',
    organization: '国家图书馆古籍部',
    role: '管理员',
    email: 'zhang.wenhan@library.gov.cn',
    lastLogin: '2024-03-14 08:32:45'
  })
  
  // Format current date
  const currentDate = computed(() => {
    const now = new Date()
    return now.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    })
  })
  
  // Dropdown menu component
  const DropdownMenu = {
    props: ['trigger'],
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen
      },
      close() {
        this.isOpen = false
      }
    },
    mounted() {
      document.addEventListener('click', this.close)
    },
    beforeUnmount() {
      document.removeEventListener('click', this.close)
    },
    template: `
      <div class="relative" @click.stop>
        <div @click.stop="toggle">
          <slot name="trigger"></slot>
        </div>
        <div v-if="isOpen" class="absolute right-0 mt-2 z-10">
          <slot></slot>
        </div>
      </div>
    `
  }
  
  // Logout function
  const logout = () => {
    // Here you would implement your actual logout logic
    console.log('Logging out...')
    // Redirect to login page
    // router.push('/login')
  }
  </script>