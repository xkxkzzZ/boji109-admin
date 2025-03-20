<template>
  <div class="min-h-screen bg-emerald-50/50">


    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-medium text-gray-800">古籍条目管理</h1>
          <p class="text-gray-500 mt-1">管理、编辑和上传古籍条目信息</p>
        </div>
        <!--  @click="openEntryModal(null)"-->
        <button @click="emit('startupload')"
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
              <input id="search" v-model="searchQuery" type="text" @keyup.enter="fetchData"
                class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
                placeholder="搜索编号、名称、关键词、年份、形态、描述（支持回车搜索）" />
            </div>
          </div>

          <!-- Dynasty Filter -->
          <div>
            <label for="cat1" class="block text-sm font-medium text-gray-700 mb-1">一级分类</label>
            <select id="cat1" v-model="filters.cat1" @change="filters.cat2 = ''; fetchData()"
              class="block w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50">
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>

          <!-- Category Filter -->
          <div>
            <label for="cat2" class="block text-sm font-medium text-gray-700 mb-1">二级分类</label>
            <select id="cat2" v-model="filters.cat2" @change="fetchData"
              class="block w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
              :disabled="!filters.cat1">
              <option v-for="subcat in getsubcategories(filters.cat1)" :key="subcat.id" :value="subcat.name">{{
                subcat.name }}</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between mt-4  border-gray-100">
          <button @click="fetchData"
            class="flex items-center py-1.5 px-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <span>搜索</span>
          </button>
          <button @click="resetFilters" class="text-gray-500 hover:text-gray-700 text-sm flex items-center">
            <refresh-cw class="w-4 h-4 mr-1" />
            重置筛选
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
                  分类
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  子分类
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
          <p class="text-sm text-gray-700">
            共 <span class="font-medium">{{ books.length }}</span> 条
          </p>
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
                  编辑条目
                  <span class="text-sm text-gray-500">（编号和文件不可修改）</span>
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
                      <label for="category1" class="block text-sm font-medium text-gray-700">一级分类</label>
                      <select id="category1" v-model="editingBook.category1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                        <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
                      </select>
                    </div>
                    <div>
                      <label for="category2" class="block text-sm font-medium text-gray-700">二级分类</label>
                      <select id="category2" v-model="editingBook.category2"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        :disabled="!editingBook.category1">
                        <option v-for="subcat in getsubcategories(editingBook.category1)" :key="subcat.id"
                          :value="subcat.name">{{ subcat.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="category3" class="block text-sm font-medium text-gray-700">三级分类</label>
                      <input type="text" id="category3" v-model="editingBook.category3"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                    </div>
                    <div>
                      <label for="keywords" class="block text-sm font-medium text-gray-700">关键词</label>
                      <input type="text" id="keywords" v-model="editingBook.keywords"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                    </div>
                  </div>


                  <div class="grid grid-cols-2 gap-4">
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

                  <div>
                    <label for="shape" class="block text-sm font-medium text-gray-700">形态</label>
                    <input type="text" id="shape" v-model="editingBook.shape"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                  </div>

                  <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">简介</label>
                    <textarea id="description" v-model="editingBook.description" rows="4"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="请输入古籍简介"></textarea>
                  </div>

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
import { Search, RefreshCw, Edit, Eye, Trash2, Plus, AlertTriangle } from 'lucide-vue-next'
import { getItemByIds, updateItem, getFilteredList, getQueryList } from '@/api/item'
import { useAuthStore } from '@/store/superuser'
const authStore = useAuthStore()
const emit = defineEmits(['startupload'])

onMounted(async () => {
  fetchData()
})

// Search and filter state
const searchQuery = ref('')
const filters = ref({
  cat1: '',
  cat2: '',
})

// Modal states
const showEntryModal = ref(false)
const showDeleteModal = ref(false)
const currentBook = ref(null)
const bookToDelete = ref(null)
const editingBook = ref({
  id: 0,
  custom_id: '',
  title: '',
  category1: '',
  category2: '',
  category3: '',
  keywords: '',
  year: '',
  price: '',
  shape: '',
  description: '',
})

const books = ref([])

const categories = [
  { id: 'sanye', name: '散叶' },
  { id: 'guihu', name: '归户' },
  { id: 'lingce', name: '另册' }
];

const subcategoriesMap = {
  '散叶': [
    { id: 'qiyue', name: '契约' },
    { id: 'hetong', name: '合同' },
    { id: 'piaozheng', name: '票证' },
    { id: 'zhengming', name: '证明' },
    { id: 'jiumudan', name: '节目单' },
    { id: 'handu', name: '函牍' },
    { id: 'tongzhi', name: '通知' },
    { id: 'qita', name: '其他' }
  ],
  '归户': [
    { id: 'hunhe', name: '混合类' },
    { id: 'shangye', name: '商业类' },
    { id: 'gongye', name: '工业类' },
    { id: 'jinrong', name: '金融类' },
    { id: 'zufu', name: '租赋类' },
    { id: 'gongjia', name: '工价类' },
    { id: 'hunshang', name: '婚丧类' }
  ],
  '另册': [
    { id: 'hunhe', name: '混合类' },
    { id: 'shangye', name: '商业类' },
    { id: 'gongye', name: '工业类' },
    { id: 'jinrong', name: '金融类' },
    { id: 'zufu', name: '租赋类' },
    { id: 'gongjia', name: '工价类' },
    { id: 'hunshang', name: '婚丧类' },
    { id: 'qita', name: '其他' }
  ]
};

const getsubcategories = (cat1) => {
  return subcategoriesMap[cat1] || []
}

// Fetch books from API
const fetchBooks = async (ids) => {
  try {
    const response = await getItemByIds(ids)
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

const filtedlist = async (cat1, cat2) => {
  try {
    cat1 = cat1 === '' ? null : cat1
    cat2 = cat2 === '' ? null : cat2
    const response = await getFilteredList({ category1: cat1, category2: cat2 })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

const queriedlist = async (keyword) => {
  try {
    const response = await getQueryList({ query: keyword })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}



const fetchData = async () => {
  try {
    const filterlist = await filtedlist(filters.value.cat1, filters.value.cat2);
    console.log("filterlist", filterlist);

    if (searchQuery.value === '') {
      books.value = await fetchBooks(filterlist);
    } else {
      const querylist = await queriedlist(searchQuery.value);
      console.log("querylist", querylist);
      books.value = await fetchBooks(filterlist.filter(x => querylist.includes(x)));
    }
  } catch (error) {
    console.error("获取数据出错:", error);
  }
};

// Computed filtered books based on search and filters
const filteredBooks = computed(() => {
  return books.value
})

// Filter functions
const resetFilters = () => {
  searchQuery.value = ''
  filters.value = {
    cat1: '',
    cat2: '',
  }
  fetchData()
}

// Entry modal functions
const openEntryModal = (book) => {
  currentBook.value = book
  if (book) {
    // Edit existing book
    editingBook.value = { ...book }
  }
  showEntryModal.value = true
}

const saveEntry = async () => {
  console.log('Saving formatted book:', formatBook(editingBook.value))
  const response = await updateItem(editingBook.value.id, formatBook(editingBook.value), authStore.token)

  if (response.status === 200) {
    console.log('Book saved successfully:', response)
    showEntryModal.value = false
  } else {
    console.error('Error saving book:', response)
  }
  fetchData()
}

const formatBook = (book) => {
  return {
    title: book.title,
    category1: book.category1,
    category2: book.category2,
    category3: book.category3,
    keywords: book.keywords,
    year: book.year,
    price: book.price,
    shape: book.shape,
    description: book.description,
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
}

</script>
