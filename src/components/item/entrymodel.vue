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

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">一级分类</label>
                <select v-model="editingBook.category1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                               focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                  <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">二级分类</label>
                <select v-model="editingBook.category2" :disabled="!editingBook.category1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                               focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                  <option v-for="subcat in getsubcategories(editingBook.category1)" :key="subcat.id" :value="subcat.name">
                    {{ subcat.name }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">关键词</label>
              <input v-model="editingBook.keywords" type="text"
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

            <div>
              <label class="block text-sm font-medium text-gray-700">简介</label>
              <textarea v-model="editingBook.description" rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                               sm:text-sm"
                        placeholder="请输入古籍简介"></textarea>
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
</script>
