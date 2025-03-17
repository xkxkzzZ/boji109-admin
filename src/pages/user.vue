<template>
    <div class="min-h-screen bg-emerald-50/50">
      
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-medium text-gray-800">用户管理</h1>
          <p class="text-gray-500 mt-1">管理机构、用户权限和访问记录</p>
        </div>
  
        <!-- Tabs -->
        <div class="mb-6">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button 
                @click="activeTab = 'organizations'" 
                class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
                :class="activeTab === 'organizations' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                <users class="w-4 h-4 inline-block mr-2" />
                机构管理
              </button>
              <button 
                @click="activeTab = 'users'" 
                class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
                :class="activeTab === 'users' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                <user class="w-4 h-4 inline-block mr-2" />
                个人用户管理
              </button>
              <button 
                @click="activeTab = 'access-logs'" 
                class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
                :class="activeTab === 'access-logs' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                <history class="w-4 h-4 inline-block mr-2" />
                访问记录
              </button>
            </nav>
          </div>
        </div>
  
        <!-- Organization Management Tab -->
        <div v-if="activeTab === 'organizations'">
          <!-- Action Bar -->
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <search class="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="搜索机构"
                  v-model="orgSearchQuery"
                  class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm"
                />
              </div>
              <select 
                v-model="orgTypeFilter" 
                class="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm"
              >
                <option value="">全部类型</option>
                <option value="教育机构">教育机构</option>
                <option value="研究机构">研究机构</option>
                <option value="政府机构">政府机构</option>
                <option value="图书馆">图书馆</option>
              </select>
            </div>
            <button 
              @click="openOrgModal(null)" 
              class="flex items-center py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-sm"
            >
              <plus class="w-4 h-4 mr-1" />
              <span>添加机构</span>
            </button>
          </div>
  
          <!-- Organizations Table -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      机构名称
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      类型
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      用户数量
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      同时访问人数限制
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      创建日期
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="org in filteredOrganizations" :key="org.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0 bg-emerald-100 rounded-full flex items-center justify-center">
                          <building class="h-5 w-5 text-emerald-600" />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ org.name }}</div>
                          <div class="text-sm text-gray-500">{{ org.code }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ org.type }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ org.userCount }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ org.concurrentLimit }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ org.createdAt }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex space-x-2">
                        <button 
                          @click="openOrgModal(org)" 
                          class="text-emerald-600 hover:text-emerald-900"
                        >
                          <edit class="h-4 w-4" />
                        </button>
                        <button 
                          @click="viewOrgUsers(org)" 
                          class="text-blue-600 hover:text-blue-900"
                        >
                          <users class="h-4 w-4" />
                        </button>
                        <button 
                          @click="confirmDeleteOrg(org)" 
                          class="text-red-600 hover:text-red-900"
                        >
                          <trash-2 class="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{ organizations.length }}</span> 条
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">上一页</span>
                      <chevron-left class="h-5 w-5" />
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                      1
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">下一页</span>
                      <chevron-right class="h-5 w-5" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Individual User Management Tab -->
        <div v-if="activeTab === 'users'">
          <!-- Action Bar -->
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <search class="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="搜索用户"
                  v-model="userSearchQuery"
                  class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm"
                />
              </div>
              <select 
                v-model="userOrgFilter" 
                class="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm"
              >
                <option value="">全部机构</option>
                <option v-for="org in organizations" :key="org.id" :value="org.name">
                  {{ org.name }}
                </option>
              </select>
              <select 
                v-model="userRoleFilter" 
                class="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm"
              >
                <option value="">全部角色</option>
                <option value="管理员">管理员</option>
                <option value="编辑员">编辑员</option>
                <option value="查阅员">查阅员</option>
                <option value="普通用户">普通用户</option>
              </select>
            </div>
            <button 
              @click="openUserModal(null)" 
              class="flex items-center py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-sm"
            >
              <plus class="w-4 h-4 mr-1" />
              <span>添加用户</span>
            </button>
          </div>
  
          <!-- Users Table -->
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
                      角色
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      子库权限
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0 bg-emerald-100 rounded-full flex items-center justify-center">
                          <user class="h-5 w-5 text-emerald-600" />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                          <div class="text-sm text-gray-500">{{ user.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ user.organization }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ user.role }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex flex-wrap gap-1">
                        <span 
                          v-for="(permission, index) in user.permissions" 
                          :key="index"
                          class="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800"
                        >
                          {{ permission }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="{
                          'bg-green-100 text-green-800': user.status === '活跃',
                          'bg-yellow-100 text-yellow-800': user.status === '待审核',
                          'bg-red-100 text-red-800': user.status === '已禁用'
                        }"
                      >
                        {{ user.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex space-x-2">
                        <button 
                          @click="openUserModal(user)" 
                          class="text-emerald-600 hover:text-emerald-900"
                        >
                          <edit class="h-4 w-4" />
                        </button>
                        <button 
                          @click="openPermissionsModal(user)" 
                          class="text-blue-600 hover:text-blue-900"
                        >
                          <key class="h-4 w-4" />
                        </button>
                        <button 
                          @click="toggleUserStatus(user)" 
                          class="text-orange-600 hover:text-orange-900"
                        >
                          <power class="h-4 w-4" />
                        </button>
                        <button 
                          @click="confirmDeleteUser(user)" 
                          class="text-red-600 hover:text-red-900"
                        >
                          <trash-2 class="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{ users.length }}</span> 条
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">上一页</span>
                      <chevron-left class="h-5 w-5" />
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                      1
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">下一页</span>
                      <chevron-right class="h-5 w-5" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Access Logs Tab -->
        <div v-if="activeTab === 'access-logs'">
          <!-- Filter Bar -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <!-- User Search -->
              <div>
                <label for="log-user-search" class="block text-sm font-medium text-gray-700 mb-1">用户</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <search class="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="log-user-search"
                    type="text"
                    placeholder="搜索用户"
                    v-model="logUserSearch"
                    class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full"
                  />
                </div>
              </div>
  
              <!-- Date Range -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">日期范围</label>
                <div class="flex items-center space-x-2">
                  <div class="relative flex-1">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <calendar class="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      v-model="logDateStart"
                      class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full"
                    />
                  </div>
                  <span class="text-gray-500">至</span>
                  <div class="relative flex-1">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <calendar class="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      v-model="logDateEnd"
                      class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full"
                    />
                  </div>
                </div>
              </div>
  
              <!-- Action Type -->
              <div>
                <label for="log-action-type" class="block text-sm font-medium text-gray-700 mb-1">操作类型</label>
                <select 
                  id="log-action-type"
                  v-model="logActionType" 
                  class="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm w-full"
                >
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
              <button 
                @click="resetLogFilters" 
                class="text-gray-500 hover:text-gray-700 text-sm flex items-center"
              >
                <refresh-cw class="w-4 h-4 mr-1" />
                重置筛选
              </button>
              
              <button 
                @click="applyLogFilters" 
                class="flex items-center py-1.5 px-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <filter class="w-4 h-4 mr-1" />
                <span>应用筛选</span>
              </button>
            </div>
          </div>
  
          <!-- Access Logs Table -->
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
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="{
                          'bg-blue-100 text-blue-800': log.actionType === '登录',
                          'bg-green-100 text-green-800': log.actionType === '查看',
                          'bg-purple-100 text-purple-800': log.actionType === '下载',
                          'bg-yellow-100 text-yellow-800': log.actionType === '编辑',
                          'bg-emerald-100 text-emerald-800': log.actionType === '上传'
                        }"
                      >
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
            
            <!-- Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{ accessLogs.length }}</span> 条
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">上一页</span>
                      <chevron-left class="h-5 w-5" />
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                      1
                    </a>
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">下一页</span>
                      <chevron-right class="h-5 w-5" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Organization Modal -->
      <div v-if="showOrgModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ currentOrg ? '编辑机构' : '添加机构' }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <!-- Organization Name -->
                    <div>
                      <label for="org-name" class="block text-sm font-medium text-gray-700">机构名称</label>
                      <input 
                        type="text" 
                        id="org-name" 
                        v-model="editingOrg.name" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                    </div>
                    
                    <!-- Organization Code -->
                    <div>
                      <label for="org-code" class="block text-sm font-medium text-gray-700">机构代码</label>
                      <input 
                        type="text" 
                        id="org-code" 
                        v-model="editingOrg.code" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                    </div>
                    
                    <!-- Organization Type -->
                    <div>
                      <label for="org-type" class="block text-sm font-medium text-gray-700">机构类型</label>
                      <select 
                        id="org-type" 
                        v-model="editingOrg.type" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      >
                        <option value="教育机构">教育机构</option>
                        <option value="研究机构">研究机构</option>
                        <option value="政府机构">政府机构</option>
                        <option value="图书馆">图书馆</option>
                      </select>
                    </div>
                    
                    <!-- Concurrent Access Limit -->
                    <div>
                      <label for="concurrent-limit" class="block text-sm font-medium text-gray-700">同时访问人数限制</label>
                      <input 
                        type="number" 
                        id="concurrent-limit" 
                        v-model="editingOrg.concurrentLimit" 
                        min="1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                @click="saveOrg" 
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                保存
              </button>
              <button 
                type="button" 
                @click="showOrgModal = false" 
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- User Modal -->
      <div v-if="showUserModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ currentUser ? '编辑用户' : '添加用户' }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <!-- User Name -->
                    <div>
                      <label for="user-name" class="block text-sm font-medium text-gray-700">姓名</label>
                      <input 
                        type="text" 
                        id="user-name" 
                        v-model="editingUser.name" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                    </div>
                    
                    <!-- User Email -->
                    <div>
                      <label for="user-email" class="block text-sm font-medium text-gray-700">邮箱</label>
                      <input 
                        type="email" 
                        id="user-email" 
                        v-model="editingUser.email" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                    </div>
                    
                    <!-- Organization -->
                    <div>
                      <label for="user-org" class="block text-sm font-medium text-gray-700">所属机构</label>
                      <select 
                        id="user-org" 
                        v-model="editingUser.organization" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      >
                        <option v-for="org in organizations" :key="org.id" :value="org.name">
                          {{ org.name }}
                        </option>
                      </select>
                    </div>
                    
                    <!-- Role -->
                    <div>
                      <label for="user-role" class="block text-sm font-medium text-gray-700">角色</label>
                      <select 
                        id="user-role" 
                        v-model="editingUser.role" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      >
                        <option value="管理员">管理员</option>
                        <option value="编辑员">编辑员</option>
                        <option value="查阅员">查阅员</option>
                        <option value="普通用户">普通用户</option>
                      </select>
                    </div>
                    
                    <!-- Status -->
                    <div>
                      <label for="user-status" class="block text-sm font-medium text-gray-700">状态</label>
                      <select 
                        id="user-status" 
                        v-model="editingUser.status" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      >
                        <option value="活跃">活跃</option>
                        <option value="待审核">待审核</option>
                        <option value="已禁用">已禁用</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                @click="saveUser" 
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                保存
              </button>
              <button 
                type="button" 
                @click="showUserModal = false" 
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Permissions Modal -->
      <div v-if="showPermissionsModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    管理子库权限 - {{ userForPermissions?.name }}
                  </h3>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500 mb-4">
                      为该用户分配可访问的子库权限
                    </p>
                    
                    <div class="space-y-2 max-h-60 overflow-y-auto">
                      <div v-for="(permission, index) in availablePermissions" :key="index" class="flex items-center">
                        <input 
                          :id="`permission-${index}`" 
                          type="checkbox" 
                          :value="permission" 
                          v-model="selectedPermissions" 
                          class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label :for="`permission-${index}`" class="ml-3 block text-sm font-medium text-gray-700">
                          {{ permission }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                @click="savePermissions" 
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                保存
              </button>
              <button 
                type="button" 
                @click="showPermissionsModal = false" 
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <alert-triangle class="h-6 w-6 text-red-600" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ deleteType === 'org' ? '删除机构' : '删除用户' }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ deleteType === 'org' 
                        ? `您确定要删除机构"${orgToDelete?.name}"吗？此操作将同时删除该机构下的所有用户，且无法撤销。` 
                        : `您确定要删除用户"${userToDelete?.name}"吗？此操作无法撤销。` 
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                @click="confirmDelete" 
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                删除
              </button>
              <button 
                type="button" 
                @click="showDeleteModal = false" 
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
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
    Power
  } from 'lucide-vue-next'
  
  // Active tab state
  const activeTab = ref('organizations')
  const userMenuOpen = ref(false)
  
  // Organization management state
  const orgSearchQuery = ref('')
  const orgTypeFilter = ref('')
  const showOrgModal = ref(false)
  const currentOrg = ref(null)
  const editingOrg = ref({
    name: '',
    code: '',
    type: '教育机构',
    userCount: 0,
    concurrentLimit: 10,
    createdAt: ''
  })
  
  // User management state
  const userSearchQuery = ref('')
  const userOrgFilter = ref('')
  const userRoleFilter = ref('')
  const showUserModal = ref(false)
  const currentUser = ref(null)
  const editingUser = ref({
    name: '',
    email: '',
    organization: '',
    role: '普通用户',
    status: '活跃',
    permissions: []
  })
  
  // Permissions management state
  const showPermissionsModal = ref(false)
  const userForPermissions = ref(null)
  const selectedPermissions = ref([])
  const availablePermissions = [
    '经部古籍库',
    '史部古籍库',
    '子部古籍库',
    '集部古籍库',
    '丛部古籍库',
    '善本特藏库',
    '地方志库',
    '碑帖库',
    '年谱库',
    '家谱库',
    '方志库'
  ]
  
  // Access logs state
  const logUserSearch = ref('')
  const logDateStart = ref('')
  const logDateEnd = ref('')
  const logActionType = ref('')
  
  // Delete confirmation state
  const showDeleteModal = ref(false)
  const deleteType = ref('')
  const orgToDelete = ref(null)
  const userToDelete = ref(null)
  
  // Sample data - Organizations
  const organizations = ref([
    {
      id: 1,
      name: '国家图书馆',
      code: 'NLC001',
      type: '图书馆',
      userCount: 45,
      concurrentLimit: 100,
      createdAt: '2023-01-15'
    },
    {
      id: 2,
      name: '北京大学',
      code: 'PKU002',
      type: '教育机构',
      userCount: 28,
      concurrentLimit: 50,
      createdAt: '2023-02-20'
    },
    {
      id: 3,
      name: '中国社会科学院',
      code: 'CASS003',
      type: '研究机构',
      userCount: 32,
      concurrentLimit: 40,
      createdAt: '2023-03-05'
    },
    {
      id: 4,
      name: '故宫博物院',
      code: 'PMA004',
      type: '政府机构',
      userCount: 18,
      concurrentLimit: 30,
      createdAt: '2023-04-12'
    },
    {
      id: 5,
      name: '上海图书馆',
      code: 'SHL005',
      type: '图书馆',
      userCount: 25,
      concurrentLimit: 60,
      createdAt: '2023-05-18'
    }
  ])
  
  // Sample data - Users
  const users = ref([
    {
      id: 1,
      name: '李明',
      email: 'liming@nlc.cn',
      organization: '国家图书馆',
      role: '管理员',
      status: '活跃',
      permissions: ['经部古籍库', '史部古籍库', '子部古籍库', '集部古籍库', '丛部古籍库']
    },
    {
      id: 2,
      name: '王芳',
      email: 'wangfang@pku.edu.cn',
      organization: '北京大学',
      role: '编辑员',
      status: '活跃',
      permissions: ['经部古籍库', '史部古籍库']
    },
    {
      id: 3,
      name: '张伟',
      email: 'zhangwei@cass.org.cn',
      organization: '中国社会科学院',
      role: '查阅员',
      status: '活跃',
      permissions: ['史部古籍库', '地方志库']
    },
    {
      id: 4,
      name: '刘洋',
      email: 'liuyang@pma.gov.cn',
      organization: '故宫博物院',
      role: '普通用户',
      status: '待审核',
      permissions: ['善本特藏库']
    },
    {
      id: 5,
      name: '赵静',
      email: 'zhaojing@shl.org.cn',
      organization: '上海图书馆',
      role: '编辑员',
      status: '已禁用',
      permissions: ['碑帖库', '年谱库']
    }
  ])
  
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
  
  // Computed filtered organizations
  const filteredOrganizations = computed(() => {
    return organizations.value.filter(org => {
      // Search filter
      if (orgSearchQuery.value && !org.name.includes(orgSearchQuery.value) && 
          !org.code.includes(orgSearchQuery.value)) {
        return false
      }
      
      // Type filter
      if (orgTypeFilter.value && org.type !== orgTypeFilter.value) {
        return false
      }
      
      return true
    })
  })
  
  // Computed filtered users
  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      // Search filter
      if (userSearchQuery.value && !user.name.includes(userSearchQuery.value) && 
          !user.email.includes(userSearchQuery.value)) {
        return false
      }
      
      // Organization filter
      if (userOrgFilter.value && user.organization !== userOrgFilter.value) {
        return false
      }
      
      // Role filter
      if (userRoleFilter.value && user.role !== userRoleFilter.value) {
        return false
      }
      
      return true
    })
  })
  
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
  
  // Organization functions
  const openOrgModal = (org) => {
    currentOrg.value = org
    if (org) {
      // Edit existing organization
      editingOrg.value = { ...org }
    } else {
      // Create new organization
      editingOrg.value = {
        name: '',
        code: '',
        type: '教育机构',
        userCount: 0,
        concurrentLimit: 10,
        createdAt: new Date().toISOString().split('T')[0]
      }
    }
    showOrgModal.value = true
  }
  
  const saveOrg = () => {
    if (currentOrg.value) {
      // Update existing organization
      const index = organizations.value.findIndex(o => o.id === currentOrg.value.id)
      if (index !== -1) {
        organizations.value[index] = { ...editingOrg.value }
      }
    } else {
      // Add new organization
      const newId = Math.max(...organizations.value.map(o => o.id)) + 1
      organizations.value.push({
        id: newId,
        ...editingOrg.value
      })
    }
    
    showOrgModal.value = false
  }
  
  const viewOrgUsers = (org) => {
    userOrgFilter.value = org.name
    activeTab.value = 'users'
  }
  
  const confirmDeleteOrg = (org) => {
    orgToDelete.value = org
    deleteType.value = 'org'
    showDeleteModal.value = true
  }
  
  // User functions
  const openUserModal = (user) => {
    currentUser.value = user
    if (user) {
      // Edit existing user
      editingUser.value = { ...user }
    } else {
      // Create new user
      editingUser.value = {
        name: '',
        email: '',
        organization: organizations.value.length > 0 ? organizations.value[0].name : '',
        role: '普通用户',
        status: '活跃',
        permissions: []
      }
    }
    showUserModal.value = true
  }
  
  const saveUser = () => {
    if (currentUser.value) {
      // Update existing user
      const index = users.value.findIndex(u => u.id === currentUser.value.id)
      if (index !== -1) {
        users.value[index] = { ...editingUser.value }
      }
    } else {
      // Add new user
      const newId = Math.max(...users.value.map(u => u.id)) + 1
      users.value.push({
        id: newId,
        ...editingUser.value
      })
    }
    
    showUserModal.value = false
  }
  
  const openPermissionsModal = (user) => {
    userForPermissions.value = user
    selectedPermissions.value = [...user.permissions]
    showPermissionsModal.value = true
  }
  
  const savePermissions = () => {
    if (userForPermissions.value) {
      const index = users.value.findIndex(u => u.id === userForPermissions.value.id)
      if (index !== -1) {
        users.value[index].permissions = [...selectedPermissions.value]
      }
    }
    showPermissionsModal.value = false
  }
  
  const toggleUserStatus = (user) => {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      const statusMap = {
        '活跃': '已禁用',
        '已禁用': '活跃',
        '待审核': '活跃'
      }
      users.value[index].status = statusMap[user.status]
    }
  }
  
  const confirmDeleteUser = (user) => {
    userToDelete.value = user
    deleteType.value = 'user'
    showDeleteModal.value = true
  }
  
  // Delete confirmation function
  const confirmDelete = () => {
    if (deleteType.value === 'org' && orgToDelete.value) {
      // Delete organization
      organizations.value = organizations.value.filter(o => o.id !== orgToDelete.value.id)
      // Also delete users belonging to this organization
      users.value = users.value.filter(u => u.organization !== orgToDelete.value.name)
    } else if (deleteType.value === 'user' && userToDelete.value) {
      // Delete user
      users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    }
    
    showDeleteModal.value = false
  }
  
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