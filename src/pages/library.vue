<template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-10">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <book-open class="h-8 w-8 text-emerald-600" />
              <h1 class="ml-3 text-xl font-medium text-gray-800">古籍数据管理系统</h1>
            </div>
            <div class="flex items-center">
              <span class="text-sm text-gray-500 mr-4">管理员</span>
              <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <user class="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="flex items-center mb-6">
          <library class="h-6 w-6 text-emerald-600" />
          <h2 class="ml-2 text-xl font-medium text-gray-800">子库管理</h2>
        </div>
  
        <!-- Library Info Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <book class="w-6 h-6 text-emerald-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-800">{{ currentLibrary.name }}</h3>
              <p class="text-sm text-gray-500">创建于 {{ currentLibrary.createdAt }} · {{ currentLibrary.bookCount }} 本古籍</p>
            </div>
          </div>
        </div>
  
        <!-- Tabs -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition duration-150'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
  
        <!-- Tab Content -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <!-- Property Management -->
          <div v-if="activeTab === 'properties'" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">属性管理</h3>
            
            <!-- Public Access Toggle -->
            <div class="flex items-center justify-between py-4 border-b border-gray-100">
              <div>
                <h4 class="text-base font-medium text-gray-700">对外开放</h4>
                <p class="text-sm text-gray-500 mt-1">允许非注册用户访问此子库内容</p>
              </div>
              <div>
                <button 
                  @click="currentLibrary.isPublic = !currentLibrary.isPublic"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none',
                    currentLibrary.isPublic ? 'bg-emerald-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                      currentLibrary.isPublic ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
            </div>
            
            <!-- Package Price -->
            <div class="py-4 border-b border-gray-100">
              <h4 class="text-base font-medium text-gray-700 mb-2">包库价格</h4>
              <p class="text-sm text-gray-500 mb-4">设置此子库的包库访问价格（元/年）</p>
              <div class="flex items-center max-w-xs">
                <div class="relative flex-grow">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <currency-yen class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="currentLibrary.packagePrice"
                    type="number"
                    min="0"
                    step="100"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                    placeholder="输入价格"
                  />
                </div>
                <span class="ml-2 text-gray-500">元/年</span>
              </div>
            </div>
            
            <!-- Description -->
            <div class="py-4 border-b border-gray-100">
              <h4 class="text-base font-medium text-gray-700 mb-2">子库描述</h4>
              <p class="text-sm text-gray-500 mb-4">简要描述此子库的内容和特点</p>
              <textarea
                v-model="currentLibrary.description"
                rows="3"
                class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                placeholder="请输入子库描述..."
              ></textarea>
            </div>
            
            <!-- Save Button -->
            <div class="flex justify-end pt-4">
              <button
                @click="saveProperties"
                class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
                :disabled="saving"
              >
                <loader-circle v-if="saving" class="animate-spin w-4 h-4 mr-2 inline-block" />
                {{ saving ? '保存中...' : '保存设置' }}
              </button>
            </div>
          </div>
  
          <!-- Category Management -->
          <div v-if="activeTab === 'categories'" class="space-y-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-800">多级分类管理</h3>
              <button
                @click="addRootCategory"
                class="px-3 py-1.5 border border-transparent rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 flex items-center"
              >
                <plus-circle class="w-4 h-4 mr-1" />
                添加根分类
              </button>
            </div>
            
            <!-- Categories Tree -->
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <span class="text-sm font-medium text-gray-700">分类名称</span>
                <span class="text-sm font-medium text-gray-700">操作</span>
              </div>
              
              <!-- Tree View -->
              <div class="divide-y divide-gray-200">
                <div v-if="categories.length === 0" class="py-8 text-center text-gray-500">
                  <folder class="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p>暂无分类，请添加根分类</p>
                </div>
                
                <template v-for="(category, index) in categories" :key="category.id">
                  <div class="category-item">
                    <!-- Root Category -->
                    <div class="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                      <div class="flex items-center">
                        <button 
                          v-if="category.children && category.children.length > 0"
                          @click="toggleCategory(category)"
                          class="mr-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          <chevron-down v-if="category.expanded" class="w-5 h-5" />
                          <chevron-right v-else class="w-5 h-5" />
                        </button>
                        <folder class="w-5 h-5 text-emerald-500 mr-2" />
                        <span class="text-gray-700">{{ category.name }}</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <button 
                          @click="addSubcategory(category)"
                          class="p-1 text-gray-400 hover:text-emerald-600 focus:outline-none" 
                          title="添加子分类"
                        >
                          <plus class="w-4 h-4" />
                        </button>
                        <button 
                          @click="editCategory(category)"
                          class="p-1 text-gray-400 hover:text-blue-600 focus:outline-none" 
                          title="编辑分类"
                        >
                          <edit class="w-4 h-4" />
                        </button>
                        <button 
                          @click="deleteCategory(category)"
                          class="p-1 text-gray-400 hover:text-red-600 focus:outline-none" 
                          title="删除分类"
                        >
                          <trash-2 class="w-4 h-4" />
                        </button>
                        <div class="flex items-center space-x-1">
                          <button 
                            @click="moveCategory(category, index, 'up')"
                            :disabled="index === 0"
                            :class="[
                              'p-1 focus:outline-none',
                              index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                            ]"
                            title="上移"
                          >
                            <chevron-up class="w-4 h-4" />
                          </button>
                          <button 
                            @click="moveCategory(category, index, 'down')"
                            :disabled="index === categories.length - 1"
                            :class="[
                              'p-1 focus:outline-none',
                              index === categories.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                            ]"
                            title="下移"
                          >
                            <chevron-down class="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Subcategories (Recursive) -->
                    <div v-if="category.expanded && category.children && category.children.length > 0" class="pl-8 border-t border-gray-100">
                      <div 
                        v-for="(subcat, subIndex) in category.children" 
                        :key="subcat.id"
                        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div class="flex items-center">
                          <folder-open class="w-5 h-5 text-emerald-400 mr-2" />
                          <span class="text-gray-700">{{ subcat.name }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          <button 
                            @click="editCategory(subcat)"
                            class="p-1 text-gray-400 hover:text-blue-600 focus:outline-none" 
                            title="编辑分类"
                          >
                            <edit class="w-4 h-4" />
                          </button>
                          <button 
                            @click="deleteCategory(subcat)"
                            class="p-1 text-gray-400 hover:text-red-600 focus:outline-none" 
                            title="删除分类"
                          >
                            <trash-2 class="w-4 h-4" />
                          </button>
                          <div class="flex items-center space-x-1">
                            <button 
                              @click="moveSubcategory(category, subcat, subIndex, 'up')"
                              :disabled="subIndex === 0"
                              :class="[
                                'p-1 focus:outline-none',
                                subIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                              ]"
                              title="上移"
                            >
                              <chevron-up class="w-4 h-4" />
                            </button>
                            <button 
                              @click="moveSubcategory(category, subcat, subIndex, 'down')"
                              :disabled="subIndex === category.children.length - 1"
                              :class="[
                                'p-1 focus:outline-none',
                                subIndex === category.children.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                              ]"
                              title="下移"
                            >
                              <chevron-down class="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Category Modal -->
      <div v-if="showCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingCategory ? '编辑分类' : '添加分类' }}
          </h3>
          <div class="mb-4">
            <label for="categoryName" class="block text-sm font-medium text-gray-700 mb-1">分类名称</label>
            <input
              id="categoryName"
              v-model="categoryForm.name"
              type="text"
              class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
              placeholder="请输入分类名称"
            />
          </div>
          <div class="mb-4">
            <label for="categoryDesc" class="block text-sm font-medium text-gray-700 mb-1">分类描述</label>
            <textarea
              id="categoryDesc"
              v-model="categoryForm.description"
              rows="2"
              class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
              placeholder="请输入分类描述（选填）"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              @click="showCategoryModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
            >
              取消
            </button>
            <button
              @click="saveCategory"
              class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { 
    BookOpen, 
    User, 
    Library, 
    Book, 
    LoaderCircle,
    Folder,
    FolderOpen,
    ChevronDown, 
    ChevronRight, 
    ChevronUp,
    Plus,
    PlusCircle,
    Edit,
    Trash2
  } from 'lucide-vue-next'
  
  // Tabs
  const tabs = [
    { id: 'properties', name: '属性管理' },
    { id: 'categories', name: '分类管理' }
  ]
  const activeTab = ref('properties')
  
  // Library data
  const currentLibrary = reactive({
    id: 'lib-001',
    name: '宋代诗词典籍',
    createdAt: '2023-05-15',
    bookCount: 1286,
    isPublic: true,
    packagePrice: 1200,
    description: '收录宋代著名诗人的诗词作品及相关典籍，包含珍贵手稿和注释。'
  })
  
  // Properties management
  const saving = ref(false)
  const saveProperties = async () => {
    saving.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    saving.value = false
    // Show success message (in a real app)
  }
  
  // Categories management
  const categories = ref([
    {
      id: 'cat-1',
      name: '诗词集',
      expanded: true,
      children: [
        { id: 'cat-1-1', name: '宋词精选' },
        { id: 'cat-1-2', name: '宋诗集锦' }
      ]
    },
    {
      id: 'cat-2',
      name: '文学评论',
      expanded: false,
      children: [
        { id: 'cat-2-1', name: '当代评论' },
        { id: 'cat-2-2', name: '古代评论' }
      ]
    },
    {
      id: 'cat-3',
      name: '历史文献',
      expanded: false,
      children: []
    }
  ])
  
  // Toggle category expansion
  const toggleCategory = (category) => {
    category.expanded = !category.expanded
  }
  
  // Category form
  const showCategoryModal = ref(false)
  const editingCategory = ref(null)
  const parentCategory = ref(null)
  const categoryForm = reactive({
    name: '',
    description: ''
  })
  
  // Add root category
  const addRootCategory = () => {
    editingCategory.value = null
    parentCategory.value = null
    categoryForm.name = ''
    categoryForm.description = ''
    showCategoryModal.value = true
  }
  
  // Add subcategory
  const addSubcategory = (parent) => {
    editingCategory.value = null
    parentCategory.value = parent
    categoryForm.name = ''
    categoryForm.description = ''
    showCategoryModal.value = true
  }
  
  // Edit category
  const editCategory = (category) => {
    editingCategory.value = category
    categoryForm.name = category.name
    categoryForm.description = category.description || ''
    showCategoryModal.value = true
  }
  
  // Save category
  const saveCategory = () => {
    if (!categoryForm.name.trim()) return
  
    if (editingCategory.value) {
      // Update existing category
      editingCategory.value.name = categoryForm.name
      editingCategory.value.description = categoryForm.description
    } else if (parentCategory.value) {
      // Add new subcategory
      if (!parentCategory.value.children) {
        parentCategory.value.children = []
      }
      parentCategory.value.children.push({
        id: `cat-${Date.now()}`,
        name: categoryForm.name,
        description: categoryForm.description,
        children: []
      })
      parentCategory.value.expanded = true
    } else {
      // Add new root category
      categories.value.push({
        id: `cat-${Date.now()}`,
        name: categoryForm.name,
        description: categoryForm.description,
        expanded: false,
        children: []
      })
    }
  
    showCategoryModal.value = false
  }
  
  // Delete category
  const deleteCategory = (category) => {
    // In a real app, you would show a confirmation dialog
    if (confirm('确定要删除此分类吗？')) {
      // Find and remove from root categories
      const rootIndex = categories.value.findIndex(c => c.id === category.id)
      if (rootIndex !== -1) {
        categories.value.splice(rootIndex, 1)
        return
      }
  
      // Find and remove from subcategories
      categories.value.forEach(root => {
        if (root.children) {
          const childIndex = root.children.findIndex(c => c.id === category.id)
          if (childIndex !== -1) {
            root.children.splice(childIndex, 1)
          }
        }
      })
    }
  }
  
  // Move category up/down
  const moveCategory = (category, index, direction) => {
    if (direction === 'up' && index > 0) {
      const temp = categories.value[index - 1]
      categories.value[index - 1] = category
      categories.value[index] = temp
    } else if (direction === 'down' && index < categories.value.length - 1) {
      const temp = categories.value[index + 1]
      categories.value[index + 1] = category
      categories.value[index] = temp
    }
  }
  
  // Move subcategory up/down
  const moveSubcategory = (parent, subcategory, index, direction) => {
    if (!parent.children) return
  
    if (direction === 'up' && index > 0) {
      const temp = parent.children[index - 1]
      parent.children[index - 1] = subcategory
      parent.children[index] = temp
    } else if (direction === 'down' && index < parent.children.length - 1) {
      const temp = parent.children[index + 1]
      parent.children[index + 1] = subcategory
      parent.children[index] = temp
    }
  }
  </script>