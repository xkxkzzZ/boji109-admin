<template>
  <div class="min-h-screen bg-[#f8f7f4]">

    <div v-if="showEntryModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">编辑条目</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">描述</label>
                <textarea v-model="itemInfo.description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                               sm:text-sm" placeholder="请输入古籍描述"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">形态</label>
                <textarea v-model="itemInfo.shape" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                               sm:text-sm" placeholder="请输入古籍形态"></textarea>
              </div>


            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="saveEntry" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 
                         bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                         sm:ml-3 sm:w-auto sm:text-sm">
              保存
            </button>
            <button @click="showEntryModal=false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 
                         bg-white text-base font-medium text-gray-700 hover:bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                         sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-6">
      <!-- Back Navigation -->
      <!-- <div class="mb-6">
        <button 
          @click="goBack" 
          class="flex items-center text-primary-600 hover:text-primary-800 bg-primary-50 px-4 py-2 rounded-md"
        >
          <arrow-left-icon class="h-4 w-4 mr-2" />
          返回列表
        </button>
      </div> -->

      <!-- Item Detail Card -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="w-full lg:w-1/4 xl:w-1/5">
            <div class="aspect-[3/4] bg-gray-100 rounded-md overflow-hidden">
              <img :src="itemInfo.coverPath ? `http://localhost:8080/files/${itemInfo.coverPath}` : defaultCover"
                :alt="itemInfo.title" class="w-full h-full object-cover" />
            </div>
          </div>




          <div class="w-full lg:w-3/4 xl:w-4/5">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h1 class="text-2xl font-medium text-gray-900">{{ itemInfo.title }}</h1>
              <!-- <span 
                class="px-3 py-1 inline-flex text-sm font-semibold rounded-full self-start"
                :class="getCategoryClass(itemInfo.category)"
              >
                {{ itemInfo.category }}
              </span> -->
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-6">
              <div>
                <p class="text-sm text-gray-500">编号</p>
                <p class="text-base">{{ itemInfo.customId }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">年份</p>
                <p class="text-base">{{ itemInfo.year }}</p>
              </div>
              <!-- <div>
                <p class="text-sm text-gray-500">价格</p>
                <p class="text-base font-medium text-primary-600">¥{{ itemInfo.price }}</p>
              </div> -->
              <div>
                <p class="text-sm text-gray-500">地点</p>
                <p class="text-base">{{ itemInfo.location }}</p>
              </div>
            </div>

            <div class="mb-6">
              <h2 class="text-lg font-medium text-gray-800 mb-2">描述</h2>
              <p class="text-gray-700">{{ itemInfo.description }}</p>
            </div>

            <div>
              <h2 class="text-lg font-medium text-gray-800 mb-2">形态特征</h2>
              <p class="text-gray-700">{{ itemInfo.shape }}</p>
            </div>
          </div>
          <div class="mb-6">
            <button @click="showEntryModal = true"
              class="flex items-center text-primary-600 hover:text-primary-800 bg-primary-50 px-4 py-2 rounded-md">
              编辑详细信息
            </button>
          </div>
        </div>
      </div>

      <!-- PDF Viewer Section -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-800">预览内容</h2>
          <div class="flex items-center space-x-4">
            <button @click="toggleThumbnails" class="p-1.5 rounded-md hover:bg-gray-100 flex items-center"
              :class="{ 'bg-gray-100': showThumbnails }">
              <panel-left-icon class="h-5 w-5" />
              <span class="ml-1 text-sm">{{ showThumbnails ? '隐藏缩略图' : '显示缩略图' }}</span>
            </button>
            <div class="flex items-center space-x-2">
              <button @click="zoomOut" class="p-1.5 rounded-md hover:bg-gray-100" :disabled="scale <= 0.5"
                :class="{ 'text-gray-400 cursor-not-allowed': scale <= 0.5 }">
                <minus-icon class="h-5 w-5" />
              </button>
              <span class="text-sm text-gray-600">{{ Math.round(scale * 100) }}%</span>
              <button @click="zoomIn" class="p-1.5 rounded-md hover:bg-gray-100" :disabled="scale >= 2"
                :class="{ 'text-gray-400 cursor-not-allowed': scale >= 2 }">
                <plus-icon class="h-5 w-5" />
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <button @click="prevPage" class="p-1.5 rounded-md hover:bg-gray-100" :disabled="currentPage <= 1"
                :class="{ 'text-gray-400 cursor-not-allowed': currentPage <= 1 }">
                <chevron-left-icon class="h-5 w-5" />
              </button>
              <span class="text-sm text-gray-600">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="nextPage" class="p-1.5 rounded-md hover:bg-gray-100" :disabled="currentPage >= totalPages"
                :class="{ 'text-gray-400 cursor-not-allowed': currentPage >= totalPages }">
                <chevron-right-icon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex bg-gray-100">
          <!-- Thumbnails Sidebar -->
          <div v-if="showThumbnails"
            class="w-[180px] border-r border-gray-200 bg-white overflow-y-auto h-[600px] flex-shrink-0">
            <div class="p-3">
              <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">页面预览</h3>
              <div class="space-y-3">
                <div v-for="page in pageArray" :key="page" @click="goToPage(page)" class="cursor-pointer group">
                  <div class="relative border rounded overflow-hidden"
                    :class="currentPage === page ? 'border-primary-500 shadow-sm' : 'border-gray-200 group-hover:border-gray-300'">
                    <div class="absolute top-0 right-0 text-xs px-1.5 py-0.5 rounded-bl"
                      :class="currentPage === page ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'">
                      {{ page }}
                    </div>

                    <canvas :ref="el => { if (el) thumbnailCanvases[page - 1] = el }" class="w-full" width="150"
                      height="200"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main PDF Viewer -->
          <div ref="pdfContainer" class="relative flex-grow h-[600px] overflow-auto" @mousedown="startDrag"
            @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag">
            <div ref="pdfContent" :style="{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`
            }">
              <!-- PDF Page Rendering -->
              <canvas ref="pdfCanvas" class="shadow-md"></canvas>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PanelLeftIcon
} from 'lucide-vue-next';

import { getPdfPreview, getItemInfo } from '@/api/pdfpreview';
import { useAuthStore } from '@/store/superuser';
import { updateItem } from '@/api/item';



const authStore = useAuthStore()

const props = defineProps({
  selected_id: {
    type: String,
    required: true
  }
});

const defaultCover = '/images/default-cover.png' // 自己放到 public 文件夹下

// Mock item data - would be fetched from API in real app
const item = ref({
  id: '3',
  title: '张氏家族藏品 1: 清代地契',
  number: 'H1_001',
  year: 1865,
  price: 12500,
  location: '苏州',
  category: '契约',
  cover: 'https://picsum.photos/id/71/600/800',
  description: '这份清代地契记录了张氏家族在苏州地区购买土地的交易细节。文书详细记载了土地的位置、面积、四至界限、价格以及交易双方的信息。地契上盖有官方印章，并有多位见证人签名，是研究清代土地制度和经济活动的重要史料。此地契保存完好，字迹清晰，纸质坚韧，具有极高的历史和收藏价值。',
  physicalDescription: '纸本，竖式，墨笔书写，尺寸为32厘米×45厘米。文书共4页，装订成册，封面为蓝色布面。纸张为当地手工竹纸，质地较厚，呈淡黄色。正文使用楷书书写，字迹工整清晰。文末有红色官印一枚，以及多处黑色手印。保存状况良好，仅在折叠处有轻微磨损，局部有轻微水渍痕迹。'
});

// PDF Viewer State
const scale = ref(1);
const currentPage = ref(1);
// const totalPages = ref(8); // Mock total pages
const totalPages = ref(0);

const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const pdfContainer = ref(null);
const pdfContent = ref(null);
const pdfCanvas = ref(null);
const showThumbnails = ref(true);
const thumbnailCanvases = ref([]);

// const pdfDoc = ref(null)
let pdfDoc = null


const itemId = ref(props.selected_id);
const itemInfo = ref({
  id: null,
  customId: "",
  title: "",
  category1: "",
  category2: "",
  householdId: null,
  location: "",
  description: "",
  shape: "",
  year: "",
  price: null
});
async function fetchItemInfo() {
  const response = await getItemInfo(authStore.token, itemId.value);
  if (response.status === 200) {
    console.log('itemInfo', response.data.data)
    itemInfo.value = response.data.data;
  } else {
    console.error('Failed to fetch item info');
    alert('获取数据失败，请稍后再试。')
  }
}


const showEntryModal = ref(false)
const saveEntry = async () => {
  console.log('Saving formatted book:', formatBook(itemInfo.value))
  const response = await updateItem(itemInfo.value.id, formatBook(itemInfo.value), authStore.token)

  if (response.status === 200) {
    console.log('Book saved successfully:', response)
    showEntryModal.value = false
  } else {
    console.error('Error saving book:', response)
  }
  showEntryModal.value = false
}

const formatBook = (book) => {
  return {
    description: book.description,
    shape: book.shape,
  }
}


// Create an array of page numbers for iteration
const pageArray = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

// Navigation
function goBack() {
  // In a real app, this would navigate back to the list view
  console.log('Navigate back to list view');
}

// Category styling
function getCategoryClass(category) {
  const categoryColors = {
    '文书': 'bg-blue-50 text-blue-700',
    '契约': 'bg-emerald-50 text-emerald-700',
    '账簿': 'bg-amber-50 text-amber-700',
    '书信': 'bg-purple-50 text-purple-700',
    '手稿': 'bg-rose-50 text-rose-700',
    '图册': 'bg-indigo-50 text-indigo-700',
    '证件': 'bg-cyan-50 text-cyan-700',
    '票据': 'bg-orange-50 text-orange-700'
  };

  return categoryColors[category] || 'bg-gray-100 text-gray-800';
}

// PDF Zoom Controls
function zoomIn() {
  if (scale.value < 2) {
    scale.value = Math.min(2, scale.value + 0.1);
  }
}

function zoomOut() {
  if (scale.value > 0.5) {
    scale.value = Math.max(0.5, scale.value - 0.1);
  }
}

// PDF Page Navigation
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    renderPage(currentPage.value);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    renderPage(currentPage.value);
  }
}

function goToPage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
    renderPage(currentPage.value);
  }
}

// Toggle thumbnails sidebar
async function toggleThumbnails() {
  showThumbnails.value = !showThumbnails.value;
  setTimeout(() => {
    renderAllThumbnails();
  }, 100);
}

// PDF Drag Controls
function startDrag(event) {
  if (event.button !== 0) return; // Only left mouse button

  isDragging.value = true;
  dragStart.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y
  };

  event.preventDefault();
}

function onDrag(event) {
  if (!isDragging.value) return;

  position.value = {
    x: event.clientX - dragStart.value.x,
    y: event.clientY - dragStart.value.y
  };

  event.preventDefault();
}

function stopDrag() {
  isDragging.value = false;
}





async function init() {
  const pdfjsLib = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.min.mjs')

  // 设置 worker 路径
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.mjs'


  console.log('pdfjsLib', pdfjsLib)

  // const url = 'http://localhost:8080/api/pdf/preview/3' // 替换成你的后端接口
  // const response = await fetch(url)

  const response = await getPdfPreview(authStore.token, itemId.value)
  // console.log('response', response)

  const blob = await response.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const pdfData = new Uint8Array(arrayBuffer)

  // 加载 PDF 文档
  pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise
  totalPages.value = pdfDoc.numPages
  console.log('totalPages', totalPages.value)

}


// Mock PDF rendering function
async function renderPage(pageNumber) {
  if (!pdfCanvas.value) return;

  const page = await pdfDoc.getPage(pageNumber)
  const viewport = page.getViewport({ scale: 1.5 });

  const canvas = pdfCanvas.value
  const context = canvas.getContext('2d')
  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({ canvasContext: context, viewport }).promise
}

// Render thumbnail for a specific page
async function renderThumbnail(pageNumber) {
  const canvas = thumbnailCanvases.value[pageNumber - 1];
  if (!canvas) return;

  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 0.5 });

  const ctx = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;
}

// Render all thumbnails
async function renderAllThumbnails() {
  for (let i = 1; i <= totalPages.value; i++) {
    await renderThumbnail(i);
  }
}

// Watch for changes in the current page to center the view
watch(currentPage, () => {
  // Center the view when changing pages
  if (pdfContainer.value && pdfContent.value) {
    const containerWidth = pdfContainer.value.clientWidth;
    const containerHeight = pdfContainer.value.clientHeight;
    const contentWidth = pdfCanvas.value.width;

    position.value = {
      x: Math.max(0, (containerWidth - contentWidth * scale.value) / 2),
      y: 0 // Start from the top
    };
  }
});

// Initialize PDF viewer
onMounted(async () => {
  // In a real app, this would load the PDF using a library like PDF.js
  console.log('Initializing PDF viewer...')
  await fetchItemInfo();
  console.log('itemInfo', itemInfo.value)
  await init();

  await renderPage(currentPage.value);

  // Center the content initially
  if (pdfContainer.value && pdfContent.value && pdfCanvas.value) {
    const containerWidth = pdfContainer.value.clientWidth;
    const containerHeight = pdfContainer.value.clientHeight;
    const contentWidth = pdfCanvas.value.width;
    const contentHeight = pdfCanvas.value.height;

    position.value = {
      x: Math.max(0, (containerWidth - contentWidth) / 2),
      y: Math.max(0, (containerHeight - contentHeight) / 2)
    };
  }

  // Initialize thumbnails array
  thumbnailCanvases.value = Array(totalPages.value).fill(null);

  // Render thumbnails after a short delay to ensure refs are populated
  setTimeout(() => {
    renderAllThumbnails();
  }, 100);
});
</script>

<style>
:root {
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
}

.bg-primary-50 {
  background-color: var(--color-primary-50);
}

.text-primary-600 {
  color: var(--color-primary-600);
}

.text-primary-700 {
  color: var(--color-primary-700);
}

.text-primary-800 {
  color: var(--color-primary-800);
}

.border-primary-300 {
  border-color: var(--color-primary-300);
}

.border-primary-500 {
  border-color: var(--color-primary-500);
}

.border-primary-600 {
  border-color: var(--color-primary-600);
}

.bg-primary-500 {
  background-color: var(--color-primary-500);
}

.focus\:ring-primary-500:focus {
  --tw-ring-color: var(--color-primary-500);
}

.focus\:border-primary-500:focus {
  border-color: var(--color-primary-500);
}
</style>