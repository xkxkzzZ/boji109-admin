<template>
  <div class="space-y-6">
    <div v-for="(library, index) in libraries" :key="library.id"
         class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

      <!-- Header -->
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
          <book class="w-6 h-6 text-emerald-600" />
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-800">{{ library.categoryName }}</h3>
        </div>
      </div>

      <!-- 对外开放 -->
      <div class="flex items-center justify-between py-4 border-b border-gray-100">
        <div>
          <h4 class="text-base font-medium text-gray-700">对外开放</h4>
        </div>
        <div>
          <button @click="library.isOpen = !library.isOpen" :class="[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none',
            library.isOpen ? 'bg-emerald-600' : 'bg-gray-200'
          ]">
            <span :class="[
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
              library.isOpen ? 'translate-x-6' : 'translate-x-1'
            ]" />
          </button>
        </div>
      </div>

      <!-- 包库价格 -->
      <div class="flex items-center justify-between py-4 border-b border-gray-100">
        <div>
          <h4 class="text-base font-medium text-gray-700">包库价格</h4>
        </div>
        <div class="flex items-center max-w-xs">
          <div class="relative flex-grow">
            <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <currency-yen class="h-5 w-5 text-gray-400" />
            </div> -->
            <input v-model="library.price" type="number" min="0" step="100"
              class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
              placeholder="输入价格" />
          </div>
          <span class="ml-2 text-gray-500">元/年</span>
        </div>
      </div>

      <!-- 描述 -->
      <!-- <div class="py-4 border-b border-gray-100">
        <h4 class="text-base font-medium text-gray-700 mb-2">子库描述</h4>
        <textarea v-model="library.description" rows="3"
          class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
          placeholder="请输入子库描述..."></textarea>
      </div> -->

      <!-- 保存按钮 -->
      <div class="flex justify-end pt-4">
        <button @click="saveLibrary(index)"
          class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
          :disabled="saving[index]">
          <loader-circle v-if="saving[index]" class="animate-spin w-4 h-4 mr-2 inline-block" />
          {{ saving[index] ? '保存中...' : '保存设置' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Book, LoaderCircle } from 'lucide-vue-next'
import { getCategoryInfo, updateCategoryInfo } from '@/api/permission'
import { useAuthStore } from '@/store/superuser'
const authStore = useAuthStore()

// 三个子库
const libraries = reactive([
  {
    categoryName: '散叶',
    isOpen: true,
    price: 1000,
  },
  {
    categoryName: '另册',
    isOpen: false,
    price: 800,
  },
  {
    categoryName: '归户',
    isOpen: true,
    price: 1200,
  }
])

async function getinfo(categoryName){
//   response.data = {
//     {
//     "message": "子库信息获取成功",
//     "data": {
//         "isOpen": true,
//         "price": 842.09
//     }
// `   }
// }
  const res = await getCategoryInfo(authStore.token, categoryName)
  if (res.status === 200) {
    console.log(res.data.message)
    libraries.forEach((library) => {
      if (library.categoryName === categoryName) {
        library.isOpen = res.data.data.isOpen
        library.price = res.data.data.price
      }
    })
  } else {
    alert(res.data.message);
  }
}


async function updateinfo(categoryName, isOpen, price){
  const res = await updateCategoryInfo(authStore.token, {categoryName, isOpen, price})
  if (res.status === 200) {
    alert(res.data.message);
  } else {
    alert(res.data.message);
  }
}


// 每个库的保存状态
const saving = ref([false, false, false])

const saveLibrary = async (index) => {
  saving.value[index] = true
  await updateinfo(libraries[index].categoryName, libraries[index].isOpen, libraries[index].price)
  saving.value[index] = false
}

onMounted(() => {
  libraries.forEach((library) => {
    getinfo(library.categoryName)
  })
})

</script>
