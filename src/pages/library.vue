<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-10">
    

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div class="flex items-center mb-6">
        <library class="h-6 w-6 text-emerald-600" />
        <h2 class="ml-2 text-xl font-medium text-gray-800">子库管理</h2>
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
          <Open />
        </div>

        <!-- Category Management -->
        <div v-if="activeTab === 'categories'" class="space-y-6">
          <Category2 />
        </div>
      </div>
    </main>

    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Library, 
} from 'lucide-vue-next'

import Open from '@/components/library/open.vue'
import Category2 from '@/components/library/category2.vue'

// Tabs
const tabs = [
  { id: 'properties', name: '属性管理' },
  { id: 'categories', name: '分类管理' }
]
const activeTab = ref('properties')


</script>