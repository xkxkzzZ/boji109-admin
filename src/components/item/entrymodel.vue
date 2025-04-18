<template>
  <div v-if="visible" class="fixed inset-0 overflow-y-auto z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">编辑条目</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">名称</label>
              <input v-model="editingBook.title" type="text"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                            focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"/>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">编号</label>
              <input v-model="editingBook.customId" type="text"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                            focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"/>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">分类</label>
                <select v-model="editingBook.category1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                               focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                               @change="onCategory1Change">
                  <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">子分类</label>
                <select v-model="editingBook.category2" :disabled="!editingBook.category1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                               focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                               @change="onCategory2Change">
                  <option v-for="subcat in getsubcategories(editingBook.category1)" :key="subcat.id" :value="subcat.name">
                    {{ subcat.name }}
                  </option>
                </select>
              </div>
               <!-- 户名 Household ID -->
              <div>
                <label for="householdId" class="block text-sm font-medium text-gray-700 mb-1">户名</label>
                <el-select
                  v-model="editingBook.householdId"
                  filterable
                  placeholder=""
                  style="width: 140px"
                  :disabled="editingBook.category1!='归户' || !editingBook.category2"
                  clearable
                >
                  <el-option
                    v-for="household in filteredHouseholds"
                    :key="household.id"
                    :label="household.name"
                    :value="household.id"
                  />
                </el-select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">地点</label>
              <input v-model="editingBook.location" type="text"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                            focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"/>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">年份</label>
              <input v-model="editingBook.year" type="text"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                            focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"/>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">价格</label>
              <input v-model="editingBook.price" type="text"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                            focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"/>
            </div>

            
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="onSave"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 
                         bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                         sm:ml-3 sm:w-auto sm:text-sm">
            保存
          </button>
          <button @click="onClose"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 
                         bg-white text-base font-medium text-gray-700 hover:bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                         sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAllHouseholds } from '@/api/household';
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  editingBook: Object,
  categories: Array,
  getsubcategories: Function,
})
const emit = defineEmits(['update:visible', 'save'])

const onClose = () => {
  emit('update:visible', false)
}

const onSave = () => {
  emit('save', props.editingBook)
}




// 数据
const households = ref([])
const filteredHouseholds = ref([])
const householdsLoaded = ref(false) // 新增标志位：是否已加载

// 加载方法
const fetchHouseholds = async () => {
  try {
    console.log('Fetching households...')
    const response = await getAllHouseholds()
    households.value = response.data.data
    householdsLoaded.value = true
    console.log('Fetched households:', households.value)
  } catch (err) {
    console.error('Failed to fetch households:', err)
    householdsLoaded.value = false
  }
}

// 监听两个字段，同时控制逻辑
watch(
  [() => props.editingBook.category1, () => props.editingBook.category2],
  async ([category1, category2]) => {
    if (category1 === '归户') {
      // 如果还没加载，先加载一次
      if (!householdsLoaded.value) {
        await fetchHouseholds()
      }

      // 如果 category2 存在，则过滤
      if (category2) {
        filteredHouseholds.value = households.value.filter(h => h.category2 === category2)
        console.log('Filtered households:', filteredHouseholds.value)
      } else {
        filteredHouseholds.value = []
      }
    } else {
      // 非归户则清空
      filteredHouseholds.value = []
    }
  },
  { immediate: true }
)

// 类似 v-model 控制的下拉改变时也可用这个方法（可选）
const onCategory1Change = async () => {
  props.editingBook.category2 = ''
  if (props.editingBook.category1 === '归户') {
    await fetchHouseholds()
  } else {
    households.value = []
    filteredHouseholds.value = []
    householdsLoaded.value = false
  }
}

const onCategory2Change = () => {
  // 已自动处理，通常可以不写
}
</script>
