<template>
  <div class="min-h-screen bg-emerald-50/50">


    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <!-- <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-medium text-gray-800">古籍条目管理</h1>
          <p class="text-gray-500 mt-1">管理、编辑和上传古籍条目信息</p>
        </div>
        <button @click="emit('startupload')"
          class="flex items-center py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <plus class="w-4 h-4 mr-1" />
          <span>新增条目</span>
        </button>
      </div> -->

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
                placeholder="搜索条目.." />
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
          <!-- <button @click="fetchData"
            class="flex items-center py-1.5 px-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <span>搜索</span>
          </button> -->
          <div></div>
          <button @click="resetFilters" class="text-gray-500 hover:text-gray-700 text-sm flex items-center">
            <refresh-cw class="w-4 h-4 mr-1" />
            重置筛选
          </button>
        </div>
      </div>

      <!-- Books Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">编号</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">封面</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">标题</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">分类</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">子分类</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">户名</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">地点</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">年份</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">价格</th>
                <th class="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wide">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="book in filteredItems" :key="book.id" class="hover:bg-gray-50">
                <td class="px-4 py-2.5 text-gray-900">{{ book.customId }}</td>
                <td class="px-4 py-2.5">
                  <img :src="book.coverPath ? `${FILE_BASE_URL}/${book.coverPath}` : defaultCover" alt="封面图"
                    class="w-14 h-14 object-cover rounded" />
                </td>
                <td class="px-4 py-2.5 text-gray-900">{{ book.title }}</td>
                <td class="px-4 py-2.5 text-gray-900">{{ book.category1 }}</td>
                <td class="px-4 py-2.5 text-gray-900">{{ book.category2 }}</td>
                <td class="px-4 py-2.5 text-gray-900 break-words">
                  <div class="truncate max-w-[50px]" :title="getHouseholdNameById(book.householdId)">
                    {{ getHouseholdNameById(book.householdId) }}
                  </div>
                </td>
                <td class="px-4 py-2.5 text-gray-900">{{ book.location }}</td>
                <td class="px-4 py-2.5 text-gray-900">{{ book.year }}</td>
                <td class="px-4 py-2.5 text-gray-900">{{ book.price }}</td>
                <td class="px-4 py-2.5 text-gray-500">
                  <div class="flex space-x-1">
                    <button @click="openEntryModal(book)" class="text-emerald-600 hover:text-emerald-900">
                      <edit class="h-4 w-4" />
                    </button>
                    <button @click="viewDetails(book.id)" class="text-blue-600 hover:text-blue-900">
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

        <!-- 分页 -->
        <div class="bg-white px-4 py-2.5 flex items-center justify-between border-t border-gray-200 text-sm">
          <div class="text-sm text-gray-500">
            显示第 {{ paginationStart }} - {{ paginationEnd }} 条，共 {{ totalItemsCount }} 条
          </div>
          <nav class="flex items-center space-x-2">
            <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" :class="[
              'px-3 py-1 rounded-md border',
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed border-gray-200'
                : 'text-gray-700 hover:bg-gray-100 border-gray-300'
            ]">
              上一页
            </button>
            <button v-for="page in displayedPages" :key="page" @click="currentPage = page" :class="[
              'px-3 py-1 rounded-md border',
              currentPage === page
                ? 'bg-green-50 text-green-600 font-medium border-green-300'
                : 'text-gray-700 hover:bg-gray-100 border-gray-300'
            ]">
              {{ page }}
            </button>
            <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages"
              :class="[
                'px-3 py-1 rounded-md border',
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed border-gray-200'
                  : 'text-gray-700 hover:bg-gray-100 border-gray-300'
              ]">
              下一页
            </button>
          </nav>
        </div>
      </div>


    </main>


    <EntryModal :visible="showEntryModal" :editingBook="editingBook" :categories="categories"
      :getsubcategories="getsubcategories" @update:visible="showEntryModal = $event" @save="saveEntry" />


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
import { ref, computed, onMounted, watch } from 'vue'
import { Search, RefreshCw, Edit, Eye, Trash2, Plus, AlertTriangle } from 'lucide-vue-next'
import { getItemByIds, updateItem, getFilteredList, getQueryList, deleteItem } from '@/api/item'
import { getAllHouseholds } from '@/api/household'
import { useAuthStore } from '@/store/superuser'
import EntryModal from '@/components/item/entrymodel.vue'
const defaultCover = '/admin/images/default-cover.png' // 确保你有这个默认图
import { FILE_BASE_URL } from '@/api/config'

const authStore = useAuthStore()
const emit = defineEmits(['startupload'])

onMounted(async () => {
  fetchData()
  await fetchHouseholds()
})

// Search and filter state
const searchQuery = ref('')
const filters = ref({
  cat1: '全部',
  cat2: '全部',
})

// Modal states
const showEntryModal = ref(false)
const showDeleteModal = ref(false)
const currentBook = ref(null)
const bookToDelete = ref(null)
const editingBook = ref({
  id: 0,
  customId: '',
  title: '',
  category1: '',
  category2: '',
  householdId: null,
  keywords: '',
  year: '',
  price: '',
  shape: '',
  description: '',
})

const books = ref([])

const categories = [
  { id: 'quanbu', name: '全部' },
  { id: 'sanye', name: '散叶' },
  { id: 'guihu', name: '归户' },
  { id: 'lingce', name: '另册' }
];

const subcategoriesMap = {
  '散叶': [
    { id: 'quanbu', name: '全部' },
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
    { id: 'quanbu', name: '全部' },
    { id: 'hunhe', name: '混合类' },
    { id: 'shangye', name: '商业类' },
    { id: 'gongye', name: '工业类' },
    { id: 'jinrong', name: '金融类' },
    { id: 'zufu', name: '租赋类' },
    { id: 'gongjia', name: '工价类' },
    { id: 'hunshang', name: '婚丧类' }
  ],
  '另册': [
    { id: 'quanbu', name: '全部' },
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

const households = ref([]);
const fetchHouseholds = async () => {
  try {
    const response = await getAllHouseholds();
    households.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch households:', error);
  }
};
function getHouseholdNameById(id) {
  const match = households.value.find(h => h.id === id)
  return match ? match.name : '' // 没找到就显示个占位符
}

// 分页
const currentPage = ref(1)
const itemsPerPage = 10

// 后端分页数据
const fetchedItemIds = ref([]) // 全部满足条件的 ID 列表
const remoteItemsMap = ref({}) // id -> 条目详情
const filteredItems = ref([])  // 当前页展示的条目


// 当前页 ID 列表
const paginatedIds = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return fetchedItemIds.value.slice(start, start + itemsPerPage)
})

// 总条目数
const totalItemsCount = computed(() => fetchedItemIds.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalItemsCount.value / itemsPerPage)))

// 分页展示页码列表
const displayedPages = computed(() => {
  const pages = []
  const maxPagesToShow = 5
  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1)
    if (endPage === totalPages.value) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  }
  return pages
})

// 分页范围（xx-yy）
const paginationStart = computed(() => {
  return fetchedItemIds.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1
})
const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, totalItemsCount.value)
})


// Fetch books from API
const fetchBooks = async (ids) => {
  try {
    const response = await getItemByIds(ids)
    console.log(response.data.message)
    return response.data.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

const filtedlist = async (cat1, cat2) => {
  try {
    cat1 = cat1 === '全部' ? null : cat1
    cat2 = cat2 === '全部' ? null : cat2
    const response = await getFilteredList({ category1: cat1, category2: cat2 })
    console.log(response.data.message)
    return response.data.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

const queriedlist = async (keyword) => {
  try {
    const response = await getQueryList({ query: keyword })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}
// 根据当前页的 ID 拉取条目详情
const fetchPageItems = async () => {
  if (paginatedIds.value.length === 0) {
    filteredItems.value = []
    return
  }

  const allItems = await fetchBooks(paginatedIds.value)
  filteredItems.value = allItems.reverse()
}

// 拉取当前页条目详情
watch(paginatedIds, fetchPageItems)


const fetchData = async () => {
  try {
    const filterIds = await filtedlist(filters.value.cat1, filters.value.cat2);
    console.log("filterIds", filterIds);

    if (searchQuery.value) {
      const queryIds = await queriedlist(searchQuery.value);
      console.log("queryIds", queryIds);
      fetchedItemIds.value = filterIds.filter(id => queryIds.includes(id))
    }
    else {
      fetchedItemIds.value = filterIds
    }
    fetchedItemIds.value.reverse()
    console.log("fetchedItemIds", fetchedItemIds.value);

  } catch (error) {
    console.error("获取数据出错:", error);
  }
};

// 拉取所有符合条件的 ID（分类和搜索）
watch([filters.value, searchQuery.value], async () => {
  fetchData()
}, { immediate: true })

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
    await fetchPageItems()
  } else {
    alert(response.data.message)
    console.error('Error saving book:', response)
  }
}

const formatBook = (book) => {
  return {
    title: book.title,
    customId: book.customId,
    category1: book.category1,
    category2: book.category2,
    householdId: book.householdId,
    location: book.location,
    year: book.year,
    price: book.price,
    description: book.description,
    shape: book.shape,
  }
}

// Delete functions
const confirmDelete = (book) => {
  bookToDelete.value = book
  showDeleteModal.value = true
}

const deleteEntry = async () => {
  if (bookToDelete.value) {
    const response = await deleteItem(bookToDelete.value.id, authStore.token)
    if (response.status === 200) {
      console.log('Book deleted successfully:', response)
    } else {
      console.error('Error deleting book:', response)
    }
  }
  showDeleteModal.value = false
  fetchData()
}

// View details function
const viewDetails = (id) => {
  console.log('Viewing details for:', id)
  window.open(`${import.meta.env.BASE_URL}item/${id}`, '_blank'); // 在新标签页打开

}

</script>
