<template>
  <!-- Filter Bar -->
  <!-- <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label for="log-user-search" class="block text-sm font-medium text-gray-700 mb-1">用户</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <search class="h-4 w-4 text-gray-400" />
          </div>
          <input id="log-user-search" type="text" placeholder="搜索用户" v-model="logUserSearch"
            class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full" />
        </div>
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">日期范围</label>
        <div class="flex items-center space-x-2">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <calendar class="h-4 w-4 text-gray-400" />
            </div>
            <input type="date" v-model="logDateStart"
              class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full" />
          </div>
          <span class="text-gray-500">至</span>
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <calendar class="h-4 w-4 text-gray-400" />
            </div>
            <input type="date" v-model="logDateEnd"
              class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full" />
          </div>
        </div>
      </div>

      <div>
        <label for="log-action-type" class="block text-sm font-medium text-gray-700 mb-1">操作类型</label>
        <select id="log-action-type" v-model="logActionType"
          class="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full">
          <option value="">全部操作</option>
          <option value="登录">登录</option>
          <option value="查看">查看</option>
          <option value="下载">下载</option>
          <option value="编辑">编辑</option>
          <option value="上传">上传</option>
        </select>
      </div>
    </div>

    <div class="flex justify-between mt-4 pt-4 border-t border-gray-100">
      <button @click="resetLogFilters" class="text-gray-500 hover:text-gray-700 text-sm flex items-center">
        <refresh-cw class="w-4 h-4 mr-1" />
        重置筛选
      </button>

      <button @click="applyLogFilters"
        class="flex items-center py-1.5 px-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
        <filter class="w-4 h-4 mr-1" />
        <span>应用筛选</span>
      </button>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              用户
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              所属机构
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作类型
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              资源
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              IP地址
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              时间
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0 bg-emerald-100 rounded-full flex items-center justify-center">
                  <user class="h-5 w-5 text-emerald-600" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ log.userName }}</div>
                  <div class="text-sm text-gray-500">{{ log.userEmail }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ log.organization }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                'bg-blue-100 text-blue-800': log.actionType === '登录',
                'bg-green-100 text-green-800': log.actionType === '查看',
                'bg-purple-100 text-purple-800': log.actionType === '下载',
                'bg-yellow-100 text-yellow-800': log.actionType === '编辑',
                'bg-emerald-100 text-emerald-800': log.actionType === '上传'
              }">
                {{ log.actionType }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ log.resource }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ log.ipAddress }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ log.timestamp }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{
              accessLogs.length }}</span> 条
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">上一页</span>
              <chevron-left class="h-5 w-5" />
            </a>
            <a href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
              1
            </a>
            <a href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </a>
            <a href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">下一页</span>
              <chevron-right class="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div> -->
</template>



<script setup>


import { ref, computed, onMounted } from 'vue'
import {
  BookOpen,
  User,
  Users,
  ChevronDown,
  LogOut,
  Settings,
  Search,
  Filter,
  RefreshCw,
  Building,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  History,
  Calendar,
  Key,
  Power,
  Eye,
  CirclePlus,
} from 'lucide-vue-next'


// Access logs state
const logUserSearch = ref('')
const logDateStart = ref('')
const logDateEnd = ref('')
const logActionType = ref('')

// Sample data - Access Logs
const accessLogs = ref([
  {
    id: 1,
    userName: '李明',
    userEmail: 'liming@nlc.cn',
    organization: '国家图书馆',
    actionType: '登录',
    resource: '系统',
    ipAddress: '192.168.1.101',
    timestamp: '2024-03-14 09:15:22'
  },
  {
    id: 2,
    userName: '王芳',
    userEmail: 'wangfang@pku.edu.cn',
    organization: '北京大学',
    actionType: '查看',
    resource: '《资治通鉴》',
    ipAddress: '192.168.2.45',
    timestamp: '2024-03-14 10:23:15'
  },
  {
    id: 3,
    userName: '张伟',
    userEmail: 'zhangwei@cass.org.cn',
    organization: '中国社会科学院',
    actionType: '下载',
    resource: '《史记》',
    ipAddress: '192.168.3.78',
    timestamp: '2024-03-14 11:05:47'
  },
  {
    id: 4,
    userName: '李明',
    userEmail: 'liming@nlc.cn',
    organization: '国家图书馆',
    actionType: '编辑',
    resource: '《论语》',
    ipAddress: '192.168.1.101',
    timestamp: '2024-03-14 13:42:31'
  },
  {
    id: 5,
    userName: '刘洋',
    userEmail: 'liuyang@pma.gov.cn',
    organization: '故宫博物院',
    actionType: '查看',
    resource: '《道德经》',
    ipAddress: '192.168.4.56',
    timestamp: '2024-03-14 14:18:09'
  },
  {
    id: 6,
    userName: '赵静',
    userEmail: 'zhaojing@shl.org.cn',
    organization: '上海图书馆',
    actionType: '上传',
    resource: '《唐诗三百首》',
    ipAddress: '192.168.5.92',
    timestamp: '2024-03-14 15:30:45'
  },
  {
    id: 7,
    userName: '王芳',
    userEmail: 'wangfang@pku.edu.cn',
    organization: '北京大学',
    actionType: '下载',
    resource: '《红楼梦》',
    ipAddress: '192.168.2.45',
    timestamp: '2024-03-14 16:12:33'
  },
  {
    id: 8,
    userName: '张伟',
    userEmail: 'zhangwei@cass.org.cn',
    organization: '中国社会科学院',
    actionType: '登录',
    resource: '系统',
    ipAddress: '192.168.3.78',
    timestamp: '2024-03-14 16:45:19'
  }
])


// Computed filtered logs
const filteredLogs = computed(() => {
  return accessLogs.value.filter(log => {
    // User search filter
    if (logUserSearch.value && !log.userName.includes(logUserSearch.value) &&
      !log.userEmail.includes(logUserSearch.value)) {
      return false
    }

    // Date range filter
    if (logDateStart.value) {
      const startDate = new Date(logDateStart.value)
      const logDate = new Date(log.timestamp.split(' ')[0])
      if (logDate < startDate) {
        return false
      }
    }

    if (logDateEnd.value) {
      const endDate = new Date(logDateEnd.value)
      const logDate = new Date(log.timestamp.split(' ')[0])
      if (logDate > endDate) {
        return false
      }
    }

    // Action type filter
    if (logActionType.value && log.actionType !== logActionType.value) {
      return false
    }

    return true
  })
})


// Log filter functions
const resetLogFilters = () => {
  logUserSearch.value = ''
  logDateStart.value = ''
  logDateEnd.value = ''
  logActionType.value = ''
}

const applyLogFilters = () => {
  // This function is just for UI feedback
  // The filtering is already handled by the computed property
  console.log('Log filters applied')
}

</script>