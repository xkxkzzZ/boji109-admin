<template>
  <div class="min-h-screen ">
    <!-- Header -->
    <header class=" shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <h1 class="text-2xl font-semibold text-gray-700">户名管理</h1>
          <button 
            @click="openCreateModal" 
            class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center"
          >
            <PlusIcon class="w-5 h-5 mr-2" />
            新建户名
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索户名..."
                class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div class="w-full md:w-48">
            <select
              v-model="categoryFilter"
              class="w-full py-2 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">所有分类</option>
              <option v-for="category2 in categories" :key="category2" :value="category2">
                {{ category2 }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Households Table -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
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
                描述
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="household in paginatedHouseholds" :key="household.code" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ household.code }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {{ household.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <span class="px-2 py-1 text-xs rounded-full" :class="getCategoryClass(household.category2)">
                  {{ household.category2 }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                {{ household.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="openEditModal(household)" 
                  class="text-teal-600 hover:text-teal-800 mr-4"
                >
                  编辑
                </button>
                <button 
                  @click="openDeleteConfirm(household)" 
                  class="text-rose-600 hover:text-rose-800"
                >
                  删除
                </button>
              </td>
            </tr>
            <tr v-if="filteredHouseholds.length === 0">
              <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                没有找到匹配的户名数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow-sm">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            :class="[
              'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
              currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            上一页
          </button>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            :class="[
              'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
              currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            下一页
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              显示第 <span class="font-medium">{{ startItem }}</span> 到 
              <span class="font-medium">{{ endItem }}</span> 条，共 
              <span class="font-medium">{{ totalItems }}</span> 条
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                :class="[
                  'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">上一页</span>
                <ChevronLeftIcon class="h-5 w-5" />
              </button>
              <button 
                v-for="page in displayedPages" 
                :key="page" 
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  currentPage === page 
                    ? 'z-10 bg-teal-50 border-teal-500 text-teal-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                :class="[
                  'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">下一页</span>
                <ChevronRightIcon class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div 
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {{ isEditing ? '编辑户名' : '新建户名' }}
                </h3>
                <div class="mt-2 space-y-4">
                  <div>
                    <label for="household-name" class="block text-sm font-medium text-gray-700 mb-1">名称</label>
                    <input 
                      type="text" 
                      id="household-name" 
                      v-model="currentHousehold.name" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label for="household-code" class="block text-sm font-medium text-gray-700 mb-1">编号</label>
                    <input 
                      type="text" 
                      id="household-code" 
                      v-model="currentHousehold.code" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 "
                    />
                  </div>
                  <div>
                    <label for="household-category2" class="block text-sm font-medium text-gray-700 mb-1">分类</label>
                    <select 
                      id="household-category2" 
                      v-model="currentHousehold.category2" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option v-for="category2 in categories" :key="category2" :value="category2">
                        {{ category2 }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="household-description" class="block text-sm font-medium text-gray-700 mb-1">描述</label>
                    <textarea 
                      id="household-description" 
                      v-model="currentHousehold.description" 
                      rows="3" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="saveHousehold" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              保存
            </button>
            <button 
              @click="closeModal" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div 
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <!-- <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationIcon class="h-6 w-6 text-red-600" />
              </div> -->
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  删除户名
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    确定要删除户名 "{{ currentHousehold.name }}" 吗？该户名下的所有条目会成为未绑定户名状态。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="deletehh" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              删除
            </button>
            <button 
              @click="closeDeleteConfirm" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
import { ref, computed, onMounted } from 'vue';
import { PlusIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
import { createHousehold, getAllHouseholds, updateHousehold, deleteHousehold } from '@/api/household';

import { useAuthStore } from '@/store/superuser';
const authStore = useAuthStore();

// name, code, description, category2

const households = ref([]);

const fetchHouseholds = async () => {
  try {
    const response = await getAllHouseholds();
    households.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch households:', error);
  }
};

onMounted(() => {
  fetchHouseholds();
});

// 分类列表
const categories = [
  '混合类',
  '商业类',
  '工业类',
  '金融类',
  '租赋类',
  '工价类',
  '婚丧类'
];
// 状态变量
const searchQuery = ref('');
const categoryFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const isEditing = ref(false);
const currentHousehold = ref({
  id: 0,
  name: '',
  code: '',
  description: '',
  category2: categories[0]
});

// 计算属性
const filteredHouseholds = computed(() => {
  let result = [...households.value];
  
  // 应用搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(h => 
      h.name.toLowerCase().includes(query) ||  
      h.description.toLowerCase().includes(query) ||
      h.code.toLowerCase().includes(query)
    );
  }
  
  // 应用分类过滤
  if (categoryFilter.value) {
    result = result.filter(h => h.category2 === categoryFilter.value);
  }
  
  return result;
});

const paginatedHouseholds = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredHouseholds.value.slice(start, end);
});

const totalItems = computed(() => filteredHouseholds.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

const startItem = computed(() => {
  if (totalItems.value === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return end > totalItems.value ? totalItems.value : end;
});

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  
  if (totalPages.value <= maxPagesToShow) {
    // 如果总页数小于等于最大显示页数，显示所有页
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // 否则，显示当前页附近的页
    let startPage = Math.max(currentPage.value - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// 方法
const getCategoryClass = (category2) => {
  const classes = {
    '混合类': 'bg-purple-100 text-purple-800',
    '商业类': 'bg-blue-100 text-blue-800',
    '工业类': 'bg-gray-100 text-gray-800',
    '金融类': 'bg-green-100 text-green-800',
    '租赋类': 'bg-yellow-100 text-yellow-800',
    '工价类': 'bg-orange-100 text-orange-800',
    '婚丧类': 'bg-red-100 text-red-800'
  };
  
  return classes[category2] || 'bg-gray-100 text-gray-800';
};


const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const openCreateModal = () => {
  isEditing.value = false;
  currentHousehold.value = {
    id: 0,
    code: '',
    name: '',
    description: '',
    category2: categories[0]
  };
  showModal.value = true;
};

const openEditModal = (household) => {
  isEditing.value = true;
  currentHousehold.value = { ...household };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};



const saveHousehold = async () => {
  if (!currentHousehold.value.name) {
    alert('请输入户名');
    return;
  }
  try {
    if (isEditing.value) {
      // 更新现有户名

      const { id, ...data } = currentHousehold.value;
      const response = await updateHousehold(id, data, authStore.token);
      if (response.status === 200){
        // alert(response.data.message);
      }else{
        alert(response.data.message);
      }      
    } else {
      // 添加新户名
      console.log(currentHousehold.value);
      const response = await createHousehold(currentHousehold.value, authStore.token);
      
      if (response.status === 200){
        // alert(response.data.message);
      }else{
        alert(response.data.message);
      }
    }
    fetchHouseholds();
    closeModal();
  } catch (error) {
    console.error('Failed to save household:', error);
  }
};



const openDeleteConfirm = (household) => {
  currentHousehold.value = { ...household };
  showDeleteConfirm.value = true;
};

const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
};

const deletehh = async () => {
  try {
    const response = await deleteHousehold(currentHousehold.value.id, authStore.token);
    if (response.status === 200){
      // alert(response.data.message);
    }else{
      alert(response.data.message);
    }
    fetchHouseholds();
    closeDeleteConfirm();
  } catch (error) {
    console.error('Failed to delete household:', error);
  }
};

</script>

