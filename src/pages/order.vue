<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-10">
    

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div class="flex items-center mb-6">
        <shopping-bag class="h-6 w-6 text-emerald-600" />
        <h2 class="ml-2 text-xl font-medium text-gray-800">订单管理</h2>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Total Orders -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">总订单数</p>
              <p class="text-2xl font-semibold text-gray-800 mt-1">{{ stats.totalOrders }}</p>
            </div>
            <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <shopping-cart class="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <trend-up class="w-4 h-4 text-emerald-500 mr-1" />
            <span class="text-emerald-500 font-medium">{{ stats.orderIncrease }}%</span>
            <span class="text-gray-500 ml-1">较上月</span>
          </div>
        </div>

        <!-- Total Revenue -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">总收入</p>
              <p class="text-2xl font-semibold text-gray-800 mt-1">¥{{ stats.totalRevenue.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <currency-yen class="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <trend-up class="w-4 h-4 text-emerald-500 mr-1" />
            <span class="text-emerald-500 font-medium">{{ stats.revenueIncrease }}%</span>
            <span class="text-gray-500 ml-1">较上月</span>
          </div>
        </div>

        <!-- Pending Orders -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">待处理订单</p>
              <p class="text-2xl font-semibold text-gray-800 mt-1">{{ stats.pendingOrders }}</p>
            </div>
            <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <clock class="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <trend-down class="w-4 h-4 text-emerald-500 mr-1" />
            <span class="text-emerald-500 font-medium">{{ stats.pendingDecrease }}%</span>
            <span class="text-gray-500 ml-1">较上周</span>
          </div>
        </div>

        <!-- New Customers -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">新增客户</p>
              <p class="text-2xl font-semibold text-gray-800 mt-1">{{ stats.newCustomers }}</p>
            </div>
            <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <users class="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <trend-up class="w-4 h-4 text-emerald-500 mr-1" />
            <span class="text-emerald-500 font-medium">{{ stats.customerIncrease }}%</span>
            <span class="text-gray-500 ml-1">较上月</span>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">搜索订单</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <search class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                v-model="filters.search"
                type="text"
                class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
                placeholder="订单号/客户名称"
              />
            </div>
          </div>

          <!-- Date Range -->
          <div>
            <label for="dateRange" class="block text-sm font-medium text-gray-700 mb-1">日期范围</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <calendar class="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="dateRange"
                v-model="filters.dateRange"
                class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900 appearance-none"
              >
                <option value="all">全部时间</option>
                <option value="today">今天</option>
                <option value="week">本周</option>
                <option value="month">本月</option>
                <option value="quarter">本季度</option>
                <option value="year">本年度</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <chevron-down class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <!-- Status Filter -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">订单状态</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <filter class="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="status"
                v-model="filters.status"
                class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900 appearance-none"
              >
                <option value="all">全部状态</option>
                <option value="pending">待付款</option>
                <option value="paid">已付款</option>
                <option value="processing">处理中</option>
                <option value="completed">已完成</option>
                <option value="cancelled">已取消</option>
                <option value="refunded">已退款</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <chevron-down class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Actions -->
        <div class="flex justify-end mt-4 space-x-3">
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 flex items-center"
          >
            <refresh-cw class="w-4 h-4 mr-1" />
            重置筛选
          </button>
          <button
            @click="applyFilters"
            class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 flex items-center"
          >
            <search class="w-4 h-4 mr-1" />
            查询订单
          </button>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  订单号
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  客户信息
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  订单日期
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  订单金额
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  支付状态
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  订单状态
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <user class="h-4 w-4 text-emerald-600" />
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                      <div class="text-sm text-gray-500">{{ order.customer.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥{{ order.amount.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                      order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ paymentStatusText[order.paymentStatus] }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      order.status === 'refunded' ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ orderStatusText[order.status] }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="viewOrderDetails(order)"
                      class="text-emerald-600 hover:text-emerald-900 focus:outline-none"
                      title="查看详情"
                    >
                      <eye class="w-4 h-4" />
                    </button>
                    <button
                      v-if="order.status !== 'completed' && order.status !== 'cancelled' && order.status !== 'refunded'"
                      @click="updateOrderStatus(order)"
                      class="text-blue-600 hover:text-blue-900 focus:outline-none"
                      title="更新状态"
                    >
                      <edit class="w-4 h-4" />
                    </button>
                    <button
                      @click="printOrder(order)"
                      class="text-gray-600 hover:text-gray-900 focus:outline-none"
                      title="打印订单"
                    >
                      <printer class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-if="orders.length === 0">
                <td colspan="7" class="px-6 py-10 text-center text-gray-500">
                  <shopping-bag class="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p>暂无订单数据</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                显示第 <span class="font-medium">{{ pagination.startItem }}</span> 至 
                <span class="font-medium">{{ pagination.endItem }}</span> 条，共 
                <span class="font-medium">{{ pagination.total }}</span> 条结果
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="changePage(pagination.currentPage - 1)"
                  :disabled="pagination.currentPage === 1"
                  :class="[
                    'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                    pagination.currentPage === 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  <span class="sr-only">上一页</span>
                  <chevron-left class="h-5 w-5" />
                </button>
                
                <button
                  v-for="page in pagination.pages"
                  :key="page"
                  @click="changePage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === pagination.currentPage
                      ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                
                <button
                  @click="changePage(pagination.currentPage + 1)"
                  :disabled="pagination.currentPage === pagination.totalPages"
                  :class="[
                    'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                    pagination.currentPage === pagination.totalPages 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  <span class="sr-only">下一页</span>
                  <chevron-right class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Order Details Modal -->
    <div v-if="showOrderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-medium text-gray-900">
            订单详情 #{{ selectedOrder?.id }}
          </h3>
          <button @click="showOrderModal = false" class="text-gray-400 hover:text-gray-500">
            <x class="w-5 h-5" />
          </button>
        </div>
        
        <div v-if="selectedOrder" class="space-y-6">
          <!-- Order Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">客户信息</h4>
                <p class="text-sm text-gray-900">{{ selectedOrder.customer.name }}</p>
                <p class="text-sm text-gray-900">{{ selectedOrder.customer.email }}</p>
                <p class="text-sm text-gray-900">{{ selectedOrder.customer.phone }}</p>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">订单日期</h4>
                <p class="text-sm text-gray-900">{{ selectedOrder.date }}</p>
                <p class="text-sm text-gray-900">{{ selectedOrder.time }}</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">支付信息</h4>
                <p class="text-sm text-gray-900">支付方式: {{ selectedOrder.paymentMethod }}</p>
                <p class="text-sm text-gray-900">支付状态: {{ paymentStatusText[selectedOrder.paymentStatus] }}</p>
                <p v-if="selectedOrder.transactionId" class="text-sm text-gray-900">
                  交易号: {{ selectedOrder.transactionId }}
                </p>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">订单状态</h4>
                <p class="text-sm">
                  <span
                    :class="[
                      'px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full',
                      selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                      selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      selectedOrder.status === 'refunded' ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ orderStatusText[selectedOrder.status] }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <!-- Order Items -->
          <div>
            <h4 class="text-sm font-medium text-gray-500 mb-3">订单项目</h4>
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      项目
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      类型
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      价格
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数量
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      小计
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(item, index) in selectedOrder.items" :key="index" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ item.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ item.type }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ¥{{ item.price.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ item.quantity }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ¥{{ (item.price * item.quantity).toLocaleString() }}
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td colspan="4" class="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      小计
                    </td>
                    <td class="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      ¥{{ selectedOrder.subtotal.toLocaleString() }}
                    </td>
                  </tr>
                  <tr v-if="selectedOrder.discount > 0">
                    <td colspan="4" class="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      折扣
                    </td>
                    <td class="px-6 py-3 text-right text-sm font-medium text-emerald-600">
                      -¥{{ selectedOrder.discount.toLocaleString() }}
                    </td>
                  </tr>
                  <tr v-if="selectedOrder.tax > 0">
                    <td colspan="4" class="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      税费
                    </td>
                    <td class="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      ¥{{ selectedOrder.tax.toLocaleString() }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      总计
                    </td>
                    <td class="px-6 py-3 text-right text-sm font-medium text-emerald-600">
                      ¥{{ selectedOrder.amount.toLocaleString() }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <!-- Order Notes -->
          <div v-if="selectedOrder.notes">
            <h4 class="text-sm font-medium text-gray-500 mb-2">订单备注</h4>
            <div class="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
              {{ selectedOrder.notes }}
            </div>
          </div>
          
          <!-- Order Timeline -->
          <div>
            <h4 class="text-sm font-medium text-gray-500 mb-3">订单时间线</h4>
            <div class="flow-root">
              <ul class="-mb-8">
                <li v-for="(event, eventIdx) in selectedOrder.timeline" :key="eventIdx">
                  <div class="relative pb-8">
                    <span v-if="eventIdx !== selectedOrder.timeline.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span
                          :class="[
                            'h-8 w-8 rounded-full flex items-center justify-center',
                            event.type === 'created' ? 'bg-blue-100' : 
                            event.type === 'paid' ? 'bg-green-100' : 
                            event.type === 'processing' ? 'bg-yellow-100' : 
                            event.type === 'completed' ? 'bg-emerald-100' : 
                            event.type === 'cancelled' ? 'bg-red-100' : 
                            event.type === 'refunded' ? 'bg-purple-100' : 'bg-gray-100'
                          ]"
                        >
                          <check v-if="event.type === 'completed'" class="h-4 w-4 text-emerald-600" />
                          <credit-card v-else-if="event.type === 'paid'" class="h-4 w-4 text-green-600" />
                          <package v-else-if="event.type === 'processing'" class="h-4 w-4 text-yellow-600" />
                          <shopping-cart v-else-if="event.type === 'created'" class="h-4 w-4 text-blue-600" />
                          <x v-else-if="event.type === 'cancelled'" class="h-4 w-4 text-red-600" />
                          <rotate-ccw v-else-if="event.type === 'refunded'" class="h-4 w-4 text-purple-600" />
                          <circle v-else class="h-4 w-4 text-gray-600" />
                        </span>
                      </div>
                      <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p class="text-sm text-gray-700">{{ event.message }}</p>
                        </div>
                        <div class="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{{ event.date }} {{ event.time }}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              @click="showOrderModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
            >
              关闭
            </button>
            <button
              v-if="selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'refunded'"
              @click="updateOrderStatus(selectedOrder)"
              class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
            >
              更新状态
            </button>
            <button
              @click="printOrder(selectedOrder)"
              class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 flex items-center"
            >
              <printer class="w-4 h-4 mr-1" />
              打印订单
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Update Modal -->
    <div v-if="showStatusModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          更新订单状态
        </h3>
        <div class="mb-4">
          <label for="newStatus" class="block text-sm font-medium text-gray-700 mb-1">选择新状态</label>
          <select
            id="newStatus"
            v-model="newStatus"
            class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
          >
            <option v-for="(text, status) in orderStatusOptions" :key="status" :value="status">
              {{ text }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="statusNote" class="block text-sm font-medium text-gray-700 mb-1">状态备注（可选）</label>
          <textarea
            id="statusNote"
            v-model="statusNote"
            rows="2"
            class="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition duration-200 text-gray-900"
            placeholder="添加关于此状态更新的备注..."
          ></textarea>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="showStatusModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
          >
            取消
          </button>
          <button
            @click="saveStatusUpdate"
            class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200"
          >
            确认更新
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
  Users,
  ShoppingBag, 
  ShoppingCart, 
   
  Clock,
  Search,
  Calendar,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  Edit,
  Printer,
  X,
  Check,
  CreditCard,
  Package,
  RotateCcw,
  Circle,
  PlusCircle
} from 'lucide-vue-next'

// Stats data
const stats = reactive({
  totalOrders: 1248,
  orderIncrease: 12.5,
  totalRevenue: 152680,
  revenueIncrease: 8.2,
  pendingOrders: 24,
  pendingDecrease: 5.3,
  newCustomers: 156,
  customerIncrease: 15.8
})

// Filters
const filters = reactive({
  search: '',
  dateRange: 'month',
  status: 'all'
})

const resetFilters = () => {
  filters.search = ''
  filters.dateRange = 'month'
  filters.status = 'all'
}

const applyFilters = () => {
  // In a real app, this would trigger an API call with the filters
  console.log('Applying filters:', filters)
}

// Status text mappings
const paymentStatusText = {
  'paid': '已付款',
  'pending': '待付款',
  'refunded': '已退款',
  'failed': '支付失败'
}

const orderStatusText = {
  'pending': '待处理',
  'processing': '处理中',
  'completed': '已完成',
  'cancelled': '已取消',
  'refunded': '已退款'
}

// Order status options for update
const orderStatusOptions = {
  'pending': '待处理',
  'processing': '处理中',
  'completed': '已完成',
  'cancelled': '已取消',
  'refunded': '已退款'
}

// Orders data
const orders = ref([
  {
    id: 'ORD-2023-1248',
    customer: {
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '138****1234'
    },
    date: '2023-11-15',
    time: '14:32:45',
    amount: 1200,
    paymentStatus: 'paid',
    paymentMethod: '支付宝',
    transactionId: 'TXN123456789',
    status: 'completed',
    items: [
      { name: '宋词三百首典藏版', type: '包库访问', price: 1200, quantity: 1 }
    ],
    subtotal: 1200,
    discount: 0,
    tax: 0,
    notes: '客户需要电子发票',
    timeline: [
      { type: 'created', message: '订单创建', date: '2023-11-15', time: '14:30:22' },
      { type: 'paid', message: '订单支付完成', date: '2023-11-15', time: '14:32:45' },
      { type: 'processing', message: '订单处理中', date: '2023-11-15', time: '14:35:10' },
      { type: 'completed', message: '订单完成', date: '2023-11-15', time: '15:02:33' }
    ]
  },
  {
    id: 'ORD-2023-1247',
    customer: {
      name: '李四',
      email: 'lisi@example.com',
      phone: '139****5678'
    },
    date: '2023-11-14',
    time: '09:15:22',
    amount: 2400,
    paymentStatus: 'paid',
    paymentMethod: '微信支付',
    transactionId: 'TXN987654321',
    status: 'processing',
    items: [
      { name: '唐诗宋词元曲全集', type: '包库访问', price: 2400, quantity: 1 }
    ],
    subtotal: 2400,
    discount: 0,
    tax: 0,
    notes: '',
    timeline: [
      { type: 'created', message: '订单创建', date: '2023-11-14', time: '09:12:18' },
      { type: 'paid', message: '订单支付完成', date: '2023-11-14', time: '09:15:22' },
      { type: 'processing', message: '订单处理中', date: '2023-11-14', time: '09:20:45' }
    ]
  },
  {
    id: 'ORD-2023-1246',
    customer: {
      name: '王五',
      email: 'wangwu@example.com',
      phone: '135****9012'
    },
    date: '2023-11-13',
    time: '16:45:33',
    amount: 3600,
    paymentStatus: 'pending',
    paymentMethod: '银行转账',
    transactionId: '',
    status: 'pending',
    items: [
      { name: '四库全书精选', type: '包库访问', price: 3600, quantity: 1 }
    ],
    subtotal: 3600,
    discount: 0,
    tax: 0,
    notes: '需要纸质合同',
    timeline: [
      { type: 'created', message: '订单创建', date: '2023-11-13', time: '16:45:33' }
    ]
  },
  {
    id: 'ORD-2023-1245',
    customer: {
      name: '赵六',
      email: 'zhaoliu@example.com',
      phone: '136****3456'
    },
    date: '2023-11-12',
    time: '11:22:10',
    amount: 950,
    paymentStatus: 'refunded',
    paymentMethod: '支付宝',
    transactionId: 'TXN567891234',
    status: 'refunded',
    items: [
      { name: '明清小说集', type: '包库访问', price: 950, quantity: 1 }
    ],
    subtotal: 950,
    discount: 0,
    tax: 0,
    notes: '客户申请退款',
    timeline: [
      { type: 'created', message: '订单创建', date: '2023-11-12', time: '11:20:05' },
      { type: 'paid', message: '订单支付完成', date: '2023-11-12', time: '11:22:10' },
      { type: 'processing', message: '订单处理中', date: '2023-11-12', time: '11:25:30' },
      { type: 'refunded', message: '订单已退款', date: '2023-11-13', time: '09:15:22' }
    ]
  },
  {
    id: 'ORD-2023-1244',
    customer: {
      name: '孙七',
      email: 'sunqi@example.com',
      phone: '137****7890'
    },
    date: '2023-11-10',
    time: '15:10:45',
    amount: 1800,
    paymentStatus: 'paid',
    paymentMethod: '微信支付',
    transactionId: 'TXN345678912',
    status: 'cancelled',
    items: [
      { name: '古代文学研究资料', type: '包库访问', price: 1800, quantity: 1 }
    ],
    subtotal: 1800,
    discount: 0,
    tax: 0,
    notes: '客户取消订单',
    timeline: [
      { type: 'created', message: '订单创建', date: '2023-11-10', time: '15:08:22' },
      { type: 'paid', message: '订单支付完成', date: '2023-11-10', time: '15:10:45' },
      { type: 'cancelled', message: '订单已取消', date: '2023-11-11', time: '10:25:18' }
    ]
  }
])

// Pagination
const pagination = reactive({
  currentPage: 1,
  totalPages: 5,
  total: 25,
  perPage: 5,
  startItem: 1,
  endItem: 5,
  pages: [1, 2, 3, 4, 5]
})

const changePage = (page) => {
  if (page < 1 || page > pagination.totalPages) return
  pagination.currentPage = page
  pagination.startItem = (page - 1) * pagination.perPage + 1
  pagination.endItem = Math.min(page * pagination.perPage, pagination.total)
  // In a real app, this would trigger an API call to fetch the data for the new page
}

// Order details modal
const showOrderModal = ref(false)
const selectedOrder = ref(null)

const viewOrderDetails = (order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

// Print order
const printOrder = (order) => {
  console.log('Printing order:', order.id)
  // In a real app, this would trigger the print functionality
  window.alert(`正在打印订单 ${order.id}`)
}

// Status update modal
const showStatusModal = ref(false)
const newStatus = ref('')
const statusNote = ref('')

const updateOrderStatus = (order) => {
  selectedOrder.value = order
  newStatus.value = order.status
  statusNote.value = ''
  showStatusModal.value = true
}

const saveStatusUpdate = () => {
  if (!selectedOrder.value || !newStatus.value) return
  
  // Update the order status
  selectedOrder.value.status = newStatus.value
  
  // Add to timeline
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const time = now.toTimeString().split(' ')[0]
  
  selectedOrder.value.timeline.push({
    type: newStatus.value,
    message: `订单状态更新为"${orderStatusText[newStatus.value]}"${statusNote.value ? '：' + statusNote.value : ''}`,
    date,
    time
  })
  
  // If status is completed and payment is pending, update payment status
  if (newStatus.value === 'completed' && selectedOrder.value.paymentStatus === 'pending') {
    selectedOrder.value.paymentStatus = 'paid'
    selectedOrder.value.timeline.push({
      type: 'paid',
      message: '订单支付完成',
      date,
      time
    })
  }
  
  // Close the modal
  showStatusModal.value = false
  
  // In a real app, this would trigger an API call to update the order status
}
</script>