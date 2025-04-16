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

            <button @click="activeTab = 'users'" class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
              :class="activeTab === 'users' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
              <user class="w-4 h-4 inline-block mr-2" />
              用户管理
            </button>
            <button @click="activeTab = 'access-logs'"
              class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
              :class="activeTab === 'access-logs' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
              <history class="w-4 h-4 inline-block mr-2" />
              访问记录
            </button>
          </nav>
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
              <input type="text" placeholder="搜索用户" v-model="userSearchQuery"
                class="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm" />
            </div>
            <!-- <select v-model="userOrgFilter"
              class="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm">
              <option value="">全部机构</option>
              <option v-for="org in organizations" :key="org.id" :value="org.name">
                {{ org.name }}
              </option>
            </select>
            <select v-model="userRoleFilter"
              class="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 text-sm">
              <option value="">全部角色</option>
              <option value="管理员">管理员</option>
              <option value="编辑员">编辑员</option>
              <option value="查阅员">查阅员</option>
              <option value="普通用户">普通用户</option>
            </select> -->
          </div>
          <!-- <button @click="openUserModal(null)"
            class="flex items-center py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-sm">
            <plus class="w-4 h-4 mr-1" />
            <span>添加用户</span>
          </button> -->
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID 类型
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    昵称 邮箱
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    姓名 电话
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    单位 地址
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">

                <template v-for="user in filteredUsers" :key="user.id">
                  <tr class="">
                    <td class="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                      <button @click="toggleSubUsers(user.userId)" class="text-gray-600 hover:text-black">
                        <ChevronDown v-if="isExpanded(user.userId)" class="h-4 w-4" />
                        <ChevronRight v-else class="h-4 w-4" />
                      </button>
                      <div>
                        <div class="text-sm text-gray-500">{{ user.userId }}</div>
                        <div class="text-sm text-gray-500">主用户</div>
                      </div>
                    </td>

                    
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ user.nickname }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ user.realName }}</div>
                      <div class="text-sm text-gray-500">{{ user.phone }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ user.company }}</div>
                      <div class="text-sm text-gray-500">{{ user.address }}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex space-x-2">
                        <button @click="assignsubuser(user.userId)" class="text-emerald-600 hover:text-emerald-900">
                          <CirclePlus class="h-4 w-4" />
                        </button>

                        <button @click="openPermissionsModal(user)" class="text-blue-600 hover:text-blue-900">
                          <key class="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="sub in user.subUsers" :key="sub.id" class="bg-gray-50"
                  v-if="isExpanded(user.userId)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center" colspan="1">
                      <div class="text-sm text-gray-500">{{ sub.userId }}</div>
                      <div class="text-sm text-gray-500">子用户</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ sub.nickname || '-' }}</div>
                      <div class="text-sm text-gray-500">{{ sub.email || '-' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ sub.realname }}</div>
                      <div class="text-sm text-gray-500">{{ sub.phone }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ sub.company }}</div>
                      <div class="text-sm text-gray-500">{{ sub.address }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex space-x-2">
                        <button @click="deletesubuser(sub.id)" class="text-red-600 hover:text-red-900">
                          <trash-2 class="h-4 w-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                </template>


              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span
                    class="font-medium">{{
                      users.length }}</span> 条
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
        </div>
      </div>

      <!-- Access Logs Tab -->
      <div v-if="activeTab === 'access-logs'">
        <Recordings />
      </div>
    </main>

    <!-- Organization Modal -->


    <!-- User Modal -->
    <div v-if="showUserModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                    <input type="text" id="user-name" v-model="editingUser.name"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                  </div>

                  <!-- User Email -->
                  <div>
                    <label for="user-email" class="block text-sm font-medium text-gray-700">邮箱</label>
                    <input type="email" id="user-email" v-model="editingUser.email"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                  </div>

                  <!-- Organization -->
                  <div>
                    <label for="user-org" class="block text-sm font-medium text-gray-700">所属机构</label>
                    <select id="user-org" v-model="editingUser.organization"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                      <option v-for="org in organizations" :key="org.id" :value="org.name">
                        {{ org.name }}
                      </option>
                    </select>
                  </div>

                  <!-- Role -->
                  <div>
                    <label for="user-role" class="block text-sm font-medium text-gray-700">角色</label>
                    <select id="user-role" v-model="editingUser.role"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                      <option value="管理员">管理员</option>
                      <option value="编辑员">编辑员</option>
                      <option value="查阅员">查阅员</option>
                      <option value="普通用户">普通用户</option>
                    </select>
                  </div>

                  <!-- Status -->
                  <div>
                    <label for="user-status" class="block text-sm font-medium text-gray-700">状态</label>
                    <select id="user-status" v-model="editingUser.status"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
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
            <button type="button" @click="saveUser"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
              保存
            </button>
            <button type="button" @click="showUserModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Permissions Modal -->
    <div v-if="showPermissionsModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <!-- 背景遮罩 -->
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="closePermissionModal"></div>
      
      <!-- 模态框 -->
      <div
        class="relative w-full max-w-2xl p-6 mx-4 bg-gray-50 rounded-xl shadow-lg animate-fade-in border border-gray-200">

        <!-- 模态框内容 -->
        <div class="space-y-4">
          <!-- 权限卡片 -->
          <div v-for="(permission, index) in permissions" :key="index"
            class="p-4 border border-gray-200 rounded-lg bg-gray-100/50 hover:bg-gray-100 transition-colors">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <h4 class="font-medium text-gray-700 flex items-center gap-2">
                  <svg v-if="permission.name === '散叶库'" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="text-gray-500">
                    <path d="M16 6H3"></path>
                    <path d="M16 12H3"></path>
                    <path d="M16 18H3"></path>
                    <path d="M21 6v12"></path>
                  </svg>
                  <svg v-if="permission.name === '另册库'" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="text-gray-500">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                  <svg v-if="permission.name === '归户库'" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="text-gray-500">
                    <path d="M16 20h4a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4"></path>
                    <path d="M12 4H8a2 2 0 0 0-2 2v16"></path>
                    <path d="M12 16h-2a2 2 0 1 1 0-4h2"></path>
                    <path d="M12 12V4"></path>
                    <path d="M12 12v8"></path>
                  </svg>
                  {{ permission.name }}
                </h4>
                <div class="flex items-center gap-2">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1',
                    permission.hasAccess ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'
                  ]">
                    <svg v-if="permission.hasAccess" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    {{ permission.hasAccess ? '已授权' : '未授权' }}
                  </span>
                  <span v-if="permission.hasAccess" class="text-sm text-gray-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path>
                      <path d="M16 2v4"></path>
                      <path d="M8 2v4"></path>
                      <path d="M3 10h18"></path>
                    </svg>
                    到期时间: {{ permission.expiresAt }}
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button v-if="!permission.hasAccess" @click="grantAccess(index)"
                  class="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors border border-green-200 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                  授予权限
                </button>
                <button v-else @click="revokeAccess(index)"
                  class="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-100 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                    <path
                      d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15">
                    </path>
                  </svg>
                  禁用权限
                </button>
                <button v-if="permission.hasAccess" @click="extendAccess(index)"
                  class="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors border border-gray-300 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path>
                    <path d="M16 2v4"></path>
                    <path d="M8 2v4"></path>
                    <path d="M3 10h18"></path>
                  </svg>
                  延长期限
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 模态框底部 -->
        <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button @click="closePermissionModal"
            class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
            取消
          </button>
          <button @click="saveChanges"
            class="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors border border-green-200 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            保存更改
          </button>
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

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
            <button type="button" @click="confirmDelete"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              删除
            </button>
            <button type="button" @click="showDeleteModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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

import { getUsersWithSubs, assignSubUser, deleteSubUser } from '@/api/admin';
import { useAuthStore } from '@/store/superuser';
const authStore = useAuthStore();

import Recordings from '@/components/users/recordings.vue';

onMounted(async () => {
  fetchuserswithsubs();
})

const fetchuserswithsubs = async () => {
  const response = await getUsersWithSubs(authStore.token);
  if (response.status === 200) {
    users.value = response.data.data;
  } else {
    console.error('Failed to fetch users:', response.statusText);
  }
}

const assignsubuser = async (userId) => {
  console.log('Assigning sub-user with ID:', userId);
  const response = await assignSubUser(authStore.token, userId);
  if (response.status === 200) {
    // console.log('Sub-user assigned successfully:', response.data);
    alert(response.data.message);
    fetchuserswithsubs();
  } else {
    alert(response.data.message);
    console.error('Failed to assign sub-user:');
  }
}

const deletesubuser = async (userId) => {
  console.log('Deleting sub-user with ID:', userId);
  const response = await deleteSubUser(authStore.token, userId);
  if (response.status === 200) {
    // console.log('Sub-user deleted successfully:', response.data);
    alert(response.data.message);
    fetchuserswithsubs();
  } else {
    alert(response.data.message);
    console.error('Failed to delete sub-user:');
  }
}

// Active tab state
const activeTab = ref('users')
const userMenuOpen = ref(false)

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

const expandedUsers = ref([])

function toggleSubUsers(userId) {
  const index = expandedUsers.value.indexOf(userId)
  if (index > -1) {
    expandedUsers.value.splice(index, 1)
  } else {
    expandedUsers.value.push(userId)
  }
}

function isExpanded(userId) {
  return expandedUsers.value.includes(userId)
}

// Permissions management state
const showPermissionsModal = ref(false)
const userForPermissions = ref(null)
const selectedPermissions = ref([])


// Delete confirmation state
const showDeleteModal = ref(false)
const deleteType = ref('')
const orgToDelete = ref(null)
const userToDelete = ref(null)


const users = ref([]);



// Computed filtered users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    // Search filter
    if (userSearchQuery.value &&
      !(user.nickname && user.nickname.includes(userSearchQuery.value)) &&
      !(user.email && user.email.includes(userSearchQuery.value)) &&
      !(user.userId && user.userId.includes(userSearchQuery.value)) &&
      !(user.realname && user.realname.includes(userSearchQuery.value)) &&
      !(user.company && user.company.includes(userSearchQuery.value)) &&

      !(user.subUsers && user.subUsers.some(sub => {
        return (sub.userId && sub.userId.includes(userSearchQuery.value)) ||
          (sub.nickname && sub.nickname.includes(userSearchQuery.value)) ||
          (sub.realname && sub.realname.includes(userSearchQuery.value)) ||
          (sub.email && sub.email.includes(userSearchQuery.value)) ||
          (sub.company && sub.company.includes(userSearchQuery.value))
      }))
    ) {
      return false
    }

    return true
  })
})


const openPermissionsModal = (user) => {
  userForPermissions.value = user
  // selectedPermissions.value = [...user.permissions]
  showPermissionsModal.value = true
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



// 权限数据
const permissions = ref([
  {
    name: '散叶库',
    hasAccess: true,
    expiresAt: '2025-12-31'
  },
  {
    name: '另册库',
    hasAccess: false,
    expiresAt: ''
  },
  {
    name: '归户库',
    hasAccess: true,
    expiresAt: '2024-06-30'
  }
]);

// 打开模态框
const openPermissionModal = () => {
  showPermissionsModal.value = true;
};

// 关闭模态框
const closePermissionModal = () => {
  showPermissionsModal.value = false;
};

// 授予权限
const grantAccess = (index) => {
  permissions.value[index].hasAccess = true;
  // 默认授权一年
  const today = new Date();
  const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
  permissions.value[index].expiresAt = nextYear.toISOString().split('T')[0];
};

// 撤销权限
const revokeAccess = (index) => {
  permissions.value[index].hasAccess = false;
  permissions.value[index].expiresAt = '';
};

// 延长权限期限
const extendAccess = (index) => {
  // 延长一年
  const currentExpiry = new Date(permissions.value[index].expiresAt);
  currentExpiry.setFullYear(currentExpiry.getFullYear() + 1);
  permissions.value[index].expiresAt = currentExpiry.toISOString().split('T')[0];
};

// 保存更改
const saveChanges = () => {
  console.log('权限已更新:', permissions.value);
  // 在这里处理权限更新逻辑，例如发送到后端API
  closePermissionModal();
};
</script>