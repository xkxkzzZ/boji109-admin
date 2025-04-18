<template>



    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

      <div class="flex items-center mb-6">
        <Book class="h-6 w-6 text-emerald-600" />
        <h2 class="ml-2 text-xl font-medium text-gray-800">内容管理</h2>
      </div> 

      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            activeTab === tab.id
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition duration-150'
          ]">
            {{ tab.name }}
          </button>
        </nav>
      </div>


      <!-- Tab Content -->
      <ContentShow v-if="activeTab === 'show'" />
      <Upload v-else-if="activeTab === 'upload'" />
      <household v-else-if="activeTab === 'household'" />
    </main>

</template>


<script setup>
import ContentShow from '@/components/item/contentshow.vue';
import Upload from '@/components/item/upload.vue';
import household from '@/components/item/household.vue';
import { ref } from 'vue';
import { Book } from 'lucide-vue-next';




// Tabs
const tabs = [
  { id: 'upload', name: '上传条目' },
  { id: 'show', name: '条目管理' },
  { id: 'household', name: '户名管理' },
]
const activeTab = ref('upload')
</script>