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
          <file-text class="h-6 w-6 text-emerald-600" />
          <h2 class="ml-2 text-xl font-medium text-gray-800">网站信息管理</h2>
        </div>
  
        <!-- Content Management -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <!-- Tabs -->
          <div class="border-b border-gray-200">
            <nav class="flex overflow-x-auto">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition duration-150'
                ]"
              >
                <div class="flex items-center">
                  <component :is="tab.icon" class="w-4 h-4 mr-2" />
                  {{ tab.name }}
                </div>
              </button>
            </nav>
          </div>
  
          <!-- Content Area -->
          <div class="p-6">
            <!-- Content List -->
            <div v-if="!editMode" class="space-y-6">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-800">{{ activeTabInfo.title }}</h3>
                <button
                  @click="createNewContent"
                  class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 flex items-center"
                >
                  <plus-circle class="w-4 h-4 mr-1" />
                  新建{{ activeTabInfo.itemName }}
                </button>
              </div>
              
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        标题
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        最后更新
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="contentItems.length === 0">
                      <td colspan="4" class="px-6 py-10 text-center text-gray-500">
                        <file-question class="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p>暂无{{ activeTabInfo.itemName }}，请点击"新建{{ activeTabInfo.itemName }}"按钮创建</p>
                      </td>
                    </tr>
                    <tr v-for="item in contentItems" :key="item.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <component :is="activeTabInfo.icon" class="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                          <div class="text-sm font-medium text-gray-900">{{ item.title }}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">{{ item.updatedAt }}</div>
                        <div class="text-xs text-gray-400">{{ item.updatedBy }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          :class="[
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                            item.status === 'published' ? 'bg-green-100 text-green-800' : 
                            item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          ]"
                        >
                          {{ statusText[item.status] }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex justify-end space-x-2">
                          <button
                            @click="previewContent(item)"
                            class="text-gray-600 hover:text-gray-900 focus:outline-none"
                            title="预览"
                          >
                            <eye class="w-4 h-4" />
                          </button>
                          <button
                            @click="editContent(item)"
                            class="text-blue-600 hover:text-blue-900 focus:outline-none"
                            title="编辑"
                          >
                            <edit class="w-4 h-4" />
                          </button>
                          <button
                            v-if="item.status === 'draft'"
                            @click="publishContent(item)"
                            class="text-emerald-600 hover:text-emerald-900 focus:outline-none"
                            title="发布"
                          >
                            <upload-cloud class="w-4 h-4" />
                          </button>
                          <button
                            v-if="item.status === 'published'"
                            @click="unpublishContent(item)"
                            class="text-amber-600 hover:text-amber-900 focus:outline-none"
                            title="取消发布"
                          >
                            <cloud-off class="w-4 h-4" />
                          </button>
                          <button
                            @click="deleteContent(item)"
                            class="text-red-600 hover:text-red-900 focus:outline-none"
                            title="删除"
                          >
                            <trash-2 class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            <!-- Content Editor -->
            <div v-if="editMode" class="space-y-6">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-800">
                  {{ currentItem.id ? '编辑' : '新建' }}{{ activeTabInfo.itemName }}
                </h3>
                <div class="flex space-x-2">
                  <span
                    :class="[
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      currentItem.status === 'published' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    ]"
                  >
                    {{ statusText[currentItem.status] }}
                  </span>
                  <span class="text-xs text-gray-500 flex items-center">
                    <clock class="w-3 h-3 mr-1" />
                    {{ currentItem.updatedAt || '未保存' }}
                  </span>
                </div>
              </div>
  
              <!-- Form -->
              <div class="space-y-4">
                <!-- Title -->
                <div>
                  <label for="title" class="block text-sm font-medium text-gray-700 mb-1">标题</label>
                  <input
                    id="title"
                    v-model="currentItem.title"
                    type="text"
                    class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                    placeholder="请输入标题"
                  />
                </div>
  
                <!-- Editor Toolbar -->
                <div class="border border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                  <button
                    v-for="(tool, index) in editorTools"
                    :key="index"
                    @click="applyFormatting(tool.action)"
                    class="p-1.5 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    :title="tool.title"
                  >
                    <component :is="tool.icon" class="w-4 h-4 text-gray-700" />
                  </button>
                </div>
  
                <!-- Content Editor -->
                <div class="border border-gray-200 rounded-b-lg">
                  <textarea
                    v-model="currentItem.content"
                    rows="15"
                    class="block w-full px-3 py-2 border-0 focus:ring-0 text-gray-900"
                    placeholder="请输入内容..."
                  ></textarea>
                </div>
  
                <!-- Additional Fields -->
                <div v-if="activeTab === 'announcements'">
                  <label for="expireDate" class="block text-sm font-medium text-gray-700 mb-1">过期时间</label>
                  <input
                    id="expireDate"
                    v-model="currentItem.expireDate"
                    type="date"
                    class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                  />
                </div>
  
                <div v-if="activeTab === 'icp'">
                  <label for="icpNumber" class="block text-sm font-medium text-gray-700 mb-1">ICP备案号</label>
                  <input
                    id="icpNumber"
                    v-model="currentItem.icpNumber"
                    type="text"
                    class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                    placeholder="请输入ICP备案号"
                  />
                </div>
  
                <div v-if="activeTab === 'contact'">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                      <input
                        id="phone"
                        v-model="currentItem.phone"
                        type="text"
                        class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                        placeholder="请输入联系电话"
                      />
                    </div>
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
                      <input
                        id="email"
                        v-model="currentItem.email"
                        type="email"
                        class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                        placeholder="请输入联系邮箱"
                      />
                    </div>
                  </div>
                </div>
  
                <!-- SEO Fields -->
                <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 class="text-sm font-medium text-gray-700 mb-3">SEO设置</h4>
                  <div class="space-y-3">
                    <div>
                      <label for="metaTitle" class="block text-sm font-medium text-gray-700 mb-1">Meta标题</label>
                      <input
                        id="metaTitle"
                        v-model="currentItem.metaTitle"
                        type="text"
                        class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                        placeholder="请输入Meta标题"
                      />
                    </div>
                    <div>
                      <label for="metaDescription" class="block text-sm font-medium text-gray-700 mb-1">Meta描述</label>
                      <textarea
                        id="metaDescription"
                        v-model="currentItem.metaDescription"
                        rows="2"
                        class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                        placeholder="请输入Meta描述"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Action Buttons -->
              <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  @click="cancelEdit"
                  class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
                >
                  取消
                </button>
                <button
                  @click="saveAsDraft"
                  class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
                >
                  保存草稿
                </button>
                <button
                  @click="saveAndPublish"
                  class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
                >
                  保存并发布
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Preview Modal -->
      <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              预览{{ activeTabInfo.itemName }}
            </h3>
            <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-500">
              <x class="w-5 h-5" />
            </button>
          </div>
          
          <div v-if="previewItem" class="space-y-6">
            <div class="border-b border-gray-200 pb-4">
              <h2 class="text-xl font-semibold text-gray-800">{{ previewItem.title }}</h2>
              <div class="flex items-center mt-2 text-sm text-gray-500">
                <clock class="w-4 h-4 mr-1" />
                <span>最后更新: {{ previewItem.updatedAt }}</span>
              </div>
            </div>
            
            <div class="prose max-w-none">
              <div v-html="previewItem.content"></div>
            </div>
            
            <div v-if="activeTab === 'icp' && previewItem.icpNumber" class="text-sm text-gray-500">
              <div class="flex items-center">
                <shield class="w-4 h-4 mr-1" />
                <span>ICP备案号: {{ previewItem.icpNumber }}</span>
              </div>
            </div>
            
            <div v-if="activeTab === 'contact'" class="text-sm text-gray-500 space-y-2">
              <div v-if="previewItem.phone" class="flex items-center">
                <phone class="w-4 h-4 mr-1" />
                <span>联系电话: {{ previewItem.phone }}</span>
              </div>
              <div v-if="previewItem.email" class="flex items-center">
                <mail class="w-4 h-4 mr-1" />
                <span>联系邮箱: {{ previewItem.email }}</span>
              </div>
            </div>
            
            <div class="flex justify-end pt-4 border-t border-gray-200">
              <button
                @click="showPreviewModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
              >
                关闭预览
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="flex items-center mb-4">
            <alert-triangle class="h-6 w-6 text-red-600 mr-2" />
            <h3 class="text-lg font-medium text-gray-900">
              确认删除
            </h3>
          </div>
          
          <p class="text-sm text-gray-500 mb-4">
            您确定要删除"{{ deleteItem?.title }}"吗？此操作无法撤销。
          </p>
          
          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
            >
              取消
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
            >
              确认删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue'
  import { 
    BookOpen, 
    User, 
    FileText,
    FileQuestion,
    Shield,
    Bell,
    Info,
    Phone,
    Mail,
    FileTerminal,
    Eye,
    Edit,
    Trash2,
    Clock,
    X,
    PlusCircle,
    UploadCloud,
    CloudOff,
    AlertTriangle,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    Image,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading1,
    Heading2
  } from 'lucide-vue-next'
  
  // Tabs
  const tabs = [
    { id: 'agreements', name: '用户协议', icon: FileTerminal, title: '用户协议管理', itemName: '协议' },
    { id: 'privacy', name: '隐私政策', icon: Shield, title: '隐私政策管理', itemName: '隐私政策' },
    { id: 'announcements', name: '网站公告', icon: Bell, title: '网站公告管理', itemName: '公告' },
    { id: 'about', name: '关于我们', icon: Info, title: '关于我们管理', itemName: '介绍' },
    { id: 'icp', name: '备案信息', icon: FileText, title: '备案信息管理', itemName: '备案信息' },
    { id: 'contact', name: '联系方式', icon: Phone, title: '联系方式管理', itemName: '联系方式' }
  ]
  
  const activeTab = ref('agreements')
  const activeTabInfo = computed(() => {
    return tabs.find(tab => tab.id === activeTab.value)
  })
  
  // Status text
  const statusText = {
    'published': '已发布',
    'draft': '草稿'
  }
  
  // Editor tools
  const editorTools = [
    { icon: Bold, title: '粗体', action: 'bold' },
    { icon: Italic, title: '斜体', action: 'italic' },
    { icon: Underline, title: '下划线', action: 'underline' },
    { icon: Heading1, title: '标题1', action: 'h1' },
    { icon: Heading2, title: '标题2', action: 'h2' },
    { icon: List, title: '无序列表', action: 'ul' },
    { icon: ListOrdered, title: '有序列表', action: 'ol' },
    { icon: Link, title: '链接', action: 'link' },
    { icon: Image, title: '图片', action: 'image' },
    { icon: AlignLeft, title: '左对齐', action: 'left' },
    { icon: AlignCenter, title: '居中对齐', action: 'center' },
    { icon: AlignRight, title: '右对齐', action: 'right' }
  ]
  
  // Content items
  const contentItems = ref([
    {
      id: 'agreement-1',
      title: '用户服务协议',
      content: '<h1>用户服务协议</h1><p>欢迎使用我们的古籍数据服务。本协议是您与我们之间关于使用我们服务的法律协议。</p><h2>1. 服务说明</h2><p>我们提供古籍数据的在线访问、检索和下载服务。</p><h2>2. 用户义务</h2><p>用户应当遵守中华人民共和国相关法律法规，不得利用我们的服务从事违法活动。</p>',
      status: 'published',
      updatedAt: '2023-10-15 14:30',
      updatedBy: '管理员',
      metaTitle: '用户服务协议 - 古籍数据平台',
      metaDescription: '古籍数据平台用户服务协议，包含用户权利与义务说明。'
    },
    {
      id: 'agreement-2',
      title: '版权声明',
      content: '<h1>版权声明</h1><p>本平台所有古籍数据均受著作权法保护。</p><p>未经许可，不得进行商业用途的复制、传播。</p>',
      status: 'draft',
      updatedAt: '2023-11-05 09:15',
      updatedBy: '管理员',
      metaTitle: '版权声明 - 古籍数据平台',
      metaDescription: '古籍数据平台版权声明，说明平台数据的版权保护规定。'
    }
  ])
  
  // Edit mode
  const editMode = ref(false)
  const currentItem = reactive({
    id: '',
    title: '',
    content: '',
    status: 'draft',
    updatedAt: '',
    updatedBy: '管理员',
    metaTitle: '',
    metaDescription: '',
    // Additional fields
    expireDate: '',
    icpNumber: '',
    phone: '',
    email: ''
  })
  
  // Create new content
  const createNewContent = () => {
    // Reset current item
    Object.keys(currentItem).forEach(key => {
      currentItem[key] = ''
    })
    currentItem.status = 'draft'
    currentItem.updatedBy = '管理员'
    
    editMode.value = true
  }
  
  // Edit content
  const editContent = (item) => {
    // Copy item data to current item
    Object.keys(currentItem).forEach(key => {
      if (key in item) {
        currentItem[key] = item[key]
      } else {
        currentItem[key] = ''
      }
    })
    
    editMode.value = true
  }
  
  // Cancel edit
  const cancelEdit = () => {
    if (confirm('确定要取消编辑吗？未保存的内容将会丢失。')) {
      editMode.value = false
    }
  }
  
  // Save as draft
  const saveAsDraft = () => {
    if (!currentItem.title) {
      alert('请输入标题')
      return
    }
    
    const now = new Date()
    const dateStr = now.toLocaleDateString()
    const timeStr = now.toLocaleTimeString()
    currentItem.updatedAt = `${dateStr} ${timeStr}`
    currentItem.status = 'draft'
    
    // If it's a new item
    if (!currentItem.id) {
      currentItem.id = `${activeTab.value}-${Date.now()}`
      contentItems.value.push({ ...currentItem })
    } else {
      // Update existing item
      const index = contentItems.value.findIndex(item => item.id === currentItem.id)
      if (index !== -1) {
        contentItems.value[index] = { ...currentItem }
      }
    }
    
    editMode.value = false
    alert('草稿已保存')
  }
  
  // Save and publish
  const saveAndPublish = () => {
    if (!currentItem.title) {
      alert('请输入标题')
      return
    }
    
    if (!currentItem.content) {
      alert('请输入内容')
      return
    }
    
    const now = new Date()
    const dateStr = now.toLocaleDateString()
    const timeStr = now.toLocaleTimeString()
    currentItem.updatedAt = `${dateStr} ${timeStr}`
    currentItem.status = 'published'
    
    // If it's a new item
    if (!currentItem.id) {
      currentItem.id = `${activeTab.value}-${Date.now()}`
      contentItems.value.push({ ...currentItem })
    } else {
      // Update existing item
      const index = contentItems.value.findIndex(item => item.id === currentItem.id)
      if (index !== -1) {
        contentItems.value[index] = { ...currentItem }
      }
    }
    
    editMode.value = false
    alert('内容已发布')
  }
  
  // Apply formatting
  const applyFormatting = (action) => {
    // In a real app, this would apply formatting to the selected text
    // or insert HTML tags at the cursor position
    
    let tag = ''
    switch (action) {
      case 'bold':
        tag = '<strong>选中的文本</strong>'
        break
      case 'italic':
        tag = '<em>选中的文本</em>'
        break
      case 'underline':
        tag = '<u>选中的文本</u>'
        break
      case 'h1':
        tag = '<h1>标题文本</h1>'
        break
      case 'h2':
        tag = '<h2>标题文本</h2>'
        break
      case 'ul':
        tag = '<ul>\n  <li>列表项</li>\n  <li>列表项</li>\n</ul>'
        break
      case 'ol':
        tag = '<ol>\n  <li>列表项</li>\n  <li>列表项</li>\n</ol>'
        break
      case 'link':
        tag = '<a href="https://example.com">链接文本</a>'
        break
      case 'image':
        tag = '<img src="https://example.com/image.jpg" alt="图片描述" />'
        break
      case 'left':
        tag = '<div style="text-align: left;">左对齐文本</div>'
        break
      case 'center':
        tag = '<div style="text-align: center;">居中文本</div>'
        break
      case 'right':
        tag = '<div style="text-align: right;">右对齐文本</div>'
        break
    }
    
    // For demo purposes, just append the tag to the content
    if (tag) {
      currentItem.content += tag
    }
  }
  
  // Preview modal
  const showPreviewModal = ref(false)
  const previewItem = ref(null)
  
  const previewContent = (item) => {
    previewItem.value = item
    showPreviewModal.value = true
  }
  
  // Delete modal
  const showDeleteModal = ref(false)
  const deleteItem = ref(null)
  
  const deleteContent = (item) => {
    deleteItem.value = item
    showDeleteModal.value = true
  }
  
  const confirmDelete = () => {
    if (!deleteItem.value) return
    
    const index = contentItems.value.findIndex(item => item.id === deleteItem.value.id)
    if (index !== -1) {
      contentItems.value.splice(index, 1)
    }
    
    showDeleteModal.value = false
    deleteItem.value = null
  }
  
  // Publish/Unpublish content
  const publishContent = (item) => {
    const index = contentItems.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      contentItems.value[index].status = 'published'
      const now = new Date()
      const dateStr = now.toLocaleDateString()
      const timeStr = now.toLocaleTimeString()
      contentItems.value[index].updatedAt = `${dateStr} ${timeStr}`
    }
  }
  
  const unpublishContent = (item) => {
    const index = contentItems.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      contentItems.value[index].status = 'draft'
      const now = new Date()
      const dateStr = now.toLocaleDateString()
      const timeStr = now.toLocaleTimeString()
      contentItems.value[index].updatedAt = `${dateStr} ${timeStr}`
    }
  }
  </script>