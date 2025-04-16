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
          <h3 class="text-lg font-medium text-gray-800">{{ library.name }}</h3>
        </div>
      </div>

      <!-- 对外开放 -->
      <div class="flex items-center justify-between py-4 border-b border-gray-100">
        <div>
          <h4 class="text-base font-medium text-gray-700">对外开放</h4>
        </div>
        <div>
          <button @click="library.isPublic = !library.isPublic" :class="[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none',
            library.isPublic ? 'bg-emerald-600' : 'bg-gray-200'
          ]">
            <span :class="[
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
              library.isPublic ? 'translate-x-6' : 'translate-x-1'
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
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <currency-yen class="h-5 w-5 text-gray-400" />
            </div>
            <input v-model="library.packagePrice" type="number" min="0" step="100"
              class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
              placeholder="输入价格" />
          </div>
          <span class="ml-2 text-gray-500">元/年</span>
        </div>
      </div>

      <!-- 描述 -->
      <div class="py-4 border-b border-gray-100">
        <h4 class="text-base font-medium text-gray-700 mb-2">子库描述</h4>
        <textarea v-model="library.description" rows="3"
          class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
          placeholder="请输入子库描述..."></textarea>
      </div>

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
import { ref, reactive } from 'vue'
import { Book, LoaderCircle } from 'lucide-vue-next'

// 三个子库
const libraries = reactive([
  {
    id: 'lib-001',
    name: '散叶',
    isPublic: true,
    packagePrice: 1000,
    description: '包含未归档的散页文献，内容较为零散，适合研究用途。'
  },
  {
    id: 'lib-002',
    name: '另册',
    isPublic: false,
    packagePrice: 800,
    description: '收录在正册之外的附加资料，如边批、抄本注记等。'
  },
  {
    id: 'lib-003',
    name: '归户',
    isPublic: true,
    packagePrice: 1200,
    description: '已分类整理入库的核心文献，具有系统性与研究价值。'
  }
])

// 每个库的保存状态
const saving = ref([false, false, false])

const saveLibrary = async (index) => {
  saving.value[index] = true
  await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟异步请求
  saving.value[index] = false
  // 可以弹窗提示保存成功
}
</script>
