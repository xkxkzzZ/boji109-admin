<template>
  <div class="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-8 px-4">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4 flex justify-between">
        <div >
          <h1 class="text-xl font-bold text-gray-800">上传古籍数据</h1>
          <p class="text-sm text-gray-500 mt-1">请填写以下信息完成古籍数据上传</p>
        </div>
        <div>
          <button @click="emit('finishupload')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            返回目录
          </button>


        </div>
        
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- 标题 Title -->
          <div class="col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input id="title" v-model="formData.title" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="请输入古籍标题" />
          </div>

          <!-- 数据编号 Data ID -->
          <div>
            <label for="custom_id" class="block text-sm font-medium text-gray-700 mb-1">数据编号</label>
            <input id="custom_id" v-model="formData.custom_id" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="请输入数据编号" />
          </div>


          <!-- 分类 Category1 -->
          <div>
            <label for="category1" class="block text-sm font-medium text-gray-700 mb-1">一级分类</label>
            <select id="category1" v-model="formData.category1" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              @change="loadSubcategories">
              <!-- <option value="" disabled selected>请选择一级分类</option> -->
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>

          <!-- 子分类 category2 -->
          <div>
            <label for="category2" class="block text-sm font-medium text-gray-700 mb-1">二级分类</label>
            <select id="category2" v-model="formData.category2" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              :disabled="!formData.category1">
              <!-- <option value="" disabled selected>请选择二级分类</option> -->
              <option v-for="subcat in subcategories" :key="subcat.id" :value="subcat.name">{{ subcat.name }}</option>
            </select>
          </div>



          <!-- 子分类 category3 -->
          <div>
            <label for="category3" class="block text-sm font-medium text-gray-700 mb-1">三级分类</label>
            <input id="category3" v-model="formData.category3" type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="请输入三级分类（可选）" />
          </div>

          <!-- 关键词 keywords -->
          <div class="col-span-1">
            <label for="keywords" class="block text-sm font-medium text-gray-700 mb-1">关键词</label>
            <div
              class="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
              <div v-for="(tag, index) in formData.keywords" :key="index"
                class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md text-sm flex items-center">
                {{ tag }}
                <button type="button" @click="removeTag(index)" class="ml-1 text-emerald-600 hover:text-emerald-800">
                  &times;
                </button>
              </div>
              <input id="tagInput" v-model="tagInput" @keydown.enter.prevent="addTag" type="text"
                class="flex-grow min-w-[120px] outline-none border-0 focus:ring-0 p-1 text-sm"
                placeholder="输入关键词后按回车添加" />
            </div>
          </div>


          <!-- 年份时间 Year/Time -->
          <div>
            <label for="year" class="block text-sm font-medium text-gray-700 mb-1">年份时间</label>
            <input id="year" v-model="formData.year" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="请输入古籍年份时间" />
          </div>
          
          <!-- 定价 Price -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">定价</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">¥</span>
              </div>
              <input id="price" v-model="formData.price" type="number" step="0.01" min="0" required
                class="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="0.00" />
            </div>
          </div>

          

          

          <!-- 形态 Shape -->
          <div class="col-span-2">
            <label for="shape" class="block text-sm font-medium text-gray-700 mb-1">形态</label>
              <textarea id="shape" v-model="formData.shape" rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="请描述古籍形态特征"></textarea>
          </div>

          <!-- 简介 Brief Introduction -->
          <div class="col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">简介</label>
            <textarea id="description" v-model="formData.description" rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="请输入古籍简介"></textarea>
          </div>

          <!-- 封面图片 Cover Image -->
          <!-- <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <div v-if="coverPreview" class="mb-3">
                  <img :src="coverPreview" alt="Cover preview" class="mx-auto h-32 object-cover" />
                </div>
                <div v-else class="flex text-sm text-gray-600">
                  <label for="cover-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                    <span>上传图片</span>
                    <input id="cover-upload" type="file" class="sr-only" accept="image/*" @change="handleCoverUpload" />
                  </label>
                  <p class="pl-1">或拖拽至此处</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
              </div>
            </div>
          </div> -->

          <!-- 完整文件 Complete File -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">完整文件</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <div v-if="formData.file" class="mb-3 text-sm text-gray-700">
                  <div class="flex items-center justify-center">
                    <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                    <span class="ml-2">{{ formData.file.name }}</span>
                  </div>
                </div>
                <div v-else class="flex text-sm text-gray-600">
                  <label for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                    <span>上传文件</span>
                    <input id="file-upload" type="file" class="sr-only" @change="handleFileUpload" />
                  </label>
                  <p class="pl-1">或拖拽至此处</p>
                </div>
                <p class="text-xs text-gray-500">PDF, DOCX, TXT 最大 50MB</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="mt-8 flex justify-end space-x-3">
          <button type="button"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            @click="resetForm">
            重置
          </button>
          <button type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            :disabled="isSubmitting">
            <span v-if="isSubmitting">提交中...</span>
            <span v-else>提交</span>
          </button>
          
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { uploadItem } from '@/api/item'
import { useAuthStore } from '@/store/superuser';
const authStore = useAuthStore();
const emit = defineEmits(['finishupload'])

// Form data
const formData = reactive({
  title: '',
  category1: '',
  category2: '',
  category3: '',
  custom_id: '',
  keywords: [],
  description: '',
  shape: '',
  file: null,
  coverImage: null,
  price: '',
  year: ''
})

// UI state
const isSubmitting = ref(false)
const tagInput = ref('')
const coverPreview = ref(null)

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


const subcategories = ref([])

// Methods
const loadSubcategories = () => {
  subcategories.value = subcategoriesMap[formData.category1] || []
  formData.category2 = ''
}

const addTag = () => {
  if (tagInput.value.trim() && !formData.keywords.includes(tagInput.value.trim())) {
    formData.keywords.push(tagInput.value.trim())
  }
  tagInput.value = ''
}

const removeTag = (index) => {
  formData.keywords.splice(index, 1)
}

const handleCoverUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.coverImage = file
    const reader = new FileReader()
    reader.onload = (e) => {
      coverPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]

  if (file) {
    formData.file = file 
  }
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (Array.isArray(formData[key])) {
      formData[key] = []
    } else {
      formData[key] = ''
    }
  })
  formData.file = null
  formData.coverImage = null
  coverPreview.value = null
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true

    console.log('formatted data:', formatFormData(formData))

    const response = await uploadItem(formatFormData(formData), authStore.token)
    if (response.status === 200) {
      alert('数据上传成功！')
    } else {
      alert('上传失败，请重试1')
    }
    resetForm()

  } catch (error) {
    console.error('Submission failed:', error)
    alert('上传失败，请重试2')
  } finally {
    isSubmitting.value = false
  }
}

const formatFormData = (formData) => {
  const newFormData = new FormData()
  newFormData.append('file', formData.file)
  newFormData.append('title', formData.title)
  newFormData.append('custom_id', formData.custom_id)
  newFormData.append('category1', formData.category1)
  newFormData.append('category2', formData.category2)
  newFormData.append('category3', formData.category3)
  newFormData.append('price', formData.price)
  newFormData.append('year', formData.year)
  newFormData.append('keywords', formData.keywords.join(', '))
  newFormData.append('description', formData.description)
  newFormData.append('shape', formData.shape)
  return newFormData
}




</script>