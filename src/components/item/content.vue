<template>
  <div class="min-h-screen bg-emerald-50/50">
    <!-- Header (reused from HomePage) -->
    <header class="bg-white border-b border-gray-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Site Name -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                <book-open class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-lg font-medium text-gray-800">古籍数据管理系统</span>
            </div>
          </div>

          <!-- User Dropdown -->
          <div class="flex items-center">
            <div class="relative">
              <button @click="userMenuOpen = !userMenuOpen"
                class="flex items-center text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                  <user class="w-4 h-4 text-emerald-600" />
                </div>
                <span class="text-gray-700">张文翰</span>
                <chevron-down class="ml-1 w-4 h-4 text-gray-500" />
              </button>

              <!-- User Menu Dropdown -->
              <div v-if="userMenuOpen"
                class="absolute right-0 mt-2 py-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10">
                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <user class="mr-2 w-4 h-4 text-gray-500" />
                  <span>个人信息</span>
                </a>
                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <settings class="mr-2 w-4 h-4 text-gray-500" />
                  <span>设置</span>
                </a>
                <div class="border-t border-gray-100 my-1"></div>
                <a href="#" class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                  <log-out class="mr-2 w-4 h-4 text-red-500" />
                  <span>退出登录</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-medium text-gray-800">古籍条目管理</h1>
          <p class="text-gray-500 mt-1">管理、编辑和上传古籍条目信息</p>
        </div>
        <button @click="openEntryModal(null)"
          class="flex items-center py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <plus class="w-4 h-4 mr-1" />
          <span>新增条目</span>
        </button>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <search class="h-5 w-5 text-gray-400" />
              </div>
              <input id="search" v-model="searchQuery" type="text"
                class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
                placeholder="搜索书名、作者或关键词" />
            </div>
          </div>

          <!-- Dynasty Filter -->
          <div>
            <label for="dynasty" class="block text-sm font-medium text-gray-700 mb-1">朝代</label>
            <select id="dynasty" v-model="filters.dynasty"
              class="block w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50">
              <option value="">全部朝代</option>
              <option value="先秦">先秦</option>
              <option value="汉">汉代</option>
              <option value="魏晋">魏晋</option>
              <option value="唐">唐代</option>
              <option value="宋">宋代</option>
              <option value="元">元代</option>
              <option value="明">明代</option>
              <option value="清">清代</option>
            </select>
          </div>

          <!-- Category Filter -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">类别</label>
            <select id="category" v-model="filters.category"
              class="block w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50">
              <option value="">全部类别</option>
              <option value="经部">经部</option>
              <option value="史部">史部</option>
              <option value="子部">子部</option>
              <option value="集部">集部</option>
              <option value="丛部">丛部</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between mt-4 pt-4 border-t border-gray-100">
          <button @click="resetFilters" class="text-gray-500 hover:text-gray-700 text-sm flex items-center">
            <refresh-cw class="w-4 h-4 mr-1" />
            重置筛选
          </button>

          <button @click="applyFilters"
            class="flex items-center py-1.5 px-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <filter class="w-4 h-4 mr-1" />
            <span>应用筛选</span>
          </button>
        </div>
      </div>

      <!-- Books Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  编号
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  名称
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类别1
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类别2
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  关键词
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  年份
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  价格
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="book in filteredBooks" :key="book.id" class="hover:bg-gray-50">
                <!-- <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0 bg-emerald-100 rounded flex items-center justify-center">
                      <book class="h-5 w-5 text-emerald-600" v-if="!book.coverImage" />
                      <img v-else :src="book.coverImage" alt="" class="h-10 w-10 rounded object-cover" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ book.title }}</div>
                      <div class="text-sm text-gray-500">{{ book.year }}</div>
                    </div>
                  </div>
                </td> -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.custom_id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.title }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.category1 }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.category2 }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.keywords }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.year }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.price }}</div>
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex space-x-2">
                    <button @click="openEntryModal(book)" class="text-emerald-600 hover:text-emerald-900">
                      <edit class="h-4 w-4" />
                    </button>
                    <button @click="viewDetails(book)" class="text-blue-600 hover:text-blue-900">
                      <eye class="h-4 w-4" />
                    </button>
                    <button @click="confirmDelete(book)" class="text-red-600 hover:text-red-900">
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
                显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span
                  class="font-medium">{{ books.length }}</span> 条
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
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <span
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a href="#"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  8
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
    </main>

    <!-- Entry Modal -->
    <div v-if="showEntryModal" class="fixed inset-0 overflow-y-auto z-50">
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
                  {{ currentBook ? '编辑古籍条目' : '新增古籍条目' }}
                </h3>
                <div class="mt-4 space-y-4">
                  <!-- Title -->
                  <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">名称</label>
                    <input type="text" id="title" v-model="editingBook.title"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                  </div>


                  <!-- Category and Status -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="category1" class="block text-sm font-medium text-gray-700">二级分类</label>
                      <select id="category1" v-model="editingBook.category1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                        <option value="经部">经部</option>
                        <option value="史部">史部</option>
                        <option value="子部">子部</option>
                        <option value="集部">集部</option>
                        <option value="丛部">丛部</option>
                      </select>
                    </div>
                    <div>
                      <label for="category2" class="block text-sm font-medium text-gray-700">三级分类</label>
                      <select id="category2" v-model="editingBook.category2"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                        <option value="已数字化">已数字化</option>
                        <option value="编目中">编目中</option>
                        <option value="待校对">待校对</option>
                        <option value="未处理">未处理</option>
                      </select>
                    </div>
                  </div>
                  <!-- Dynasty and Year -->
                  <div class="grid grid-cols-2 gap-4">
                    <!-- <div>
                      <label for="dynasty" class="block text-sm font-medium text-gray-700">朝代</label>
                      <select 
                        id="dynasty" 
                        v-model="editingBook.dynasty" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      >
                        <option value="先秦">先秦</option>
                        <option value="汉">汉代</option>
                        <option value="魏晋">魏晋</option>
                        <option value="唐">唐代</option>
                        <option value="宋">宋代</option>
                        <option value="元">元代</option>
                        <option value="明">明代</option>
                        <option value="清">清代</option>
                      </select>
                    </div> -->
                    <div>
                      <label for="year" class="block text-sm font-medium text-gray-700">年份</label>
                      <input type="text" id="year" v-model="editingBook.year"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                    </div>
                    <div>
                      <label for="price" class="block text-sm font-medium text-gray-700">价格</label>
                      <input type="text" id="price" v-model="editingBook.price"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                    </div>
                  </div>

                  <!-- keywords -->
                  <div>
                    <label for="keywords" class="block text-sm font-medium text-gray-700">关键词</label>
                    <input type="text" id="keywords" v-model="editingBook.keywords"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                  </div>



                  <!-- Description -->
                  <!-- <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                    <textarea 
                      id="description" 
                      v-model="editingBook.description" 
                      rows="3" 
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    ></textarea>
                  </div> -->

                  <!-- Cover Image Upload -->
                  <!-- <div>
                    <label class="block text-sm font-medium text-gray-700">封面图片</label>
                    <div class="mt-1 flex items-center">
                      <div class="h-16 w-16 flex-shrink-0 bg-emerald-100 rounded flex items-center justify-center">
                        <book class="h-8 w-8 text-emerald-600" v-if="!editingBook.coverImage" />
                        <img v-else :src="editingBook.coverImage" alt="" class="h-16 w-16 rounded object-cover" />
                      </div>
                      <button 
                        type="button" 
                        class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        上传图片
                      </button>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="saveEntry"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
              保存
            </button>
            <button type="button" @click="showEntryModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
                  删除条目
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    您确定要删除《{{ bookToDelete?.title }}》吗？此操作无法撤销。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="deleteEntry"
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
  ChevronDown,
  LogOut,
  Settings,
  Search,
  RefreshCw,
  Book,
  Edit,
  Eye,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-vue-next'

import { getItemByIds, updateItem } from '@/api/item'
import { ca } from 'element-plus/es/locales.mjs'

import { useAuthStore } from '@/store/superuser'
const authStore = useAuthStore()

onMounted(() => {
  fetchBooks([2, 3, 7, 8, 9, 10])
})

// User menu state
const userMenuOpen = ref(false)

// Search and filter state
const searchQuery = ref('')
const filters = ref({
  dynasty: '',
  category: ''
})

// Modal states
const showEntryModal = ref(false)
const showDeleteModal = ref(false)
const currentBook = ref(null)
const bookToDelete = ref(null)
const editingBook = ref({
  id:0,
  custom_id: '',
  title: '',
  // author: '',
  // dynasty: '明',

  // category: '史部',
  // status: '未处理',
  // description: '',
  // coverImage: ''
  category1: '',
  category2: '',
  year: '',
  price: '',
  keywords: '',

})

const books = ref([])

// Fetch books from API
const fetchBooks = async (ids) => {
  try {
    const response = await getItemByIds(ids)
    books.value = response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

// Sample book data
// const books = ref([
//   {
//     id: 1,
//     title: '资治通鉴',
//     author: '司马光',
//     dynasty: '宋',
//     year: '1084年',
//     category: '史部',
//     status: '已数字化',
//     description: '《资治通鉴》是由北宋司马光主编的一部多卷本编年体史书，记载了从战国末期（前403年）到五代末期（959年）共1362年的历史。',
//     coverImage: ''
//   }
// ])



// Computed filtered books based on search and filters
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    // Search filter
    if (searchQuery.value && !book.title.includes(searchQuery.value) &&
      !book.author.includes(searchQuery.value) &&
      !book.description.includes(searchQuery.value)) {
      return false
    }

    // Dynasty filter
    if (filters.value.dynasty && book.dynasty !== filters.value.dynasty) {
      return false
    }

    // Category filter
    if (filters.value.category && book.category !== filters.value.category) {
      return false
    }

    return true
  })
})

// Filter functions
const resetFilters = () => {
  searchQuery.value = ''
  filters.value = {
    dynasty: '',
    category: ''
  }
}

const applyFilters = () => {
  // This function is just for UI feedback
  // The filtering is already handled by the computed property
  console.log('Filters applied:', filters.value)
}

// Entry modal functions
const openEntryModal = (book) => {
  currentBook.value = book
  if (book) {
    // Edit existing book
    editingBook.value = { ...book }
  } else {
    // Create new book
    editingBook.value = {
      title: '',
      author: '',
      dynasty: '明',
      year: '',
      category: '史部',
      status: '未处理',
      description: '',
      coverImage: ''
    }
  }
  showEntryModal.value = true
}

// import { updateItem } from '@/api/item'



const saveEntry = async () => {
  // if (currentBook.value) {
  //   // Update existing book
  //   const index = books.value.findIndex(b => b.id === currentBook.value.id)
  //   if (index !== -1) {
  //     books.value[index] = { ...editingBook.value }
  //   }
  // } else {
  //   // Add new book
  //   const newId = Math.max(...books.value.map(b => b.id)) + 1
  //   books.value.push({
  //     id: newId,
  //     ...editingBook.value
  //   })
  // }
  console.log('Saving formatted book:', formatBook(editingBook.value))
  const response = await updateItem(editingBook.value.id,formatBook(editingBook.value),authStore.token)

  if (response.status === 200) {
    console.log('Book saved successfully:', response)
    showEntryModal.value = false
  } else {
    console.error('Error saving book:', response)
  }

  // showEntryModal.value = false
}

const formatBook = (book) => {
  return {
    title: book.title,
    category1: book.category1,
    category2: book.category2,
    year: book.year,
    price: book.price,
    keywords: book.keywords,
  }
}

// Delete functions
const confirmDelete = (book) => {
  bookToDelete.value = book
  showDeleteModal.value = true
}

const deleteEntry = () => {
  if (bookToDelete.value) {
    books.value = books.value.filter(b => b.id !== bookToDelete.value.id)
  }
  showDeleteModal.value = false
}

// View details function
const viewDetails = (book) => {
  console.log('Viewing details for:', book.title)
  // This would typically navigate to a detail page
  // router.push(`/books/${book.id}`)
}
</script>
