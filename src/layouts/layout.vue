<template>
    <el-container style="height: 100vh;">
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu :router="true" default-active="$route.path">
          <el-menu-item index="/admin/dashboard">仪表盘</el-menu-item>
          <el-menu-item index="/admin/user-manage">用户管理</el-menu-item>
          <el-menu-item index="/admin/file-manage">文件管理</el-menu-item>
          <el-menu-item index="/admin/org-manage">机构管理</el-menu-item>
          <el-menu-item index="/admin/transaction-manage">交易管理</el-menu-item>
          <el-menu-item index="/admin/site-manage">网站信息管理</el-menu-item>
          <el-menu-item index="/admin/visit-records">访问记录</el-menu-item>
        </el-menu>
      </el-aside>
  
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="header">
            <span class="title">后台管理系统</span>
            <el-button type="danger" @click="logout">退出</el-button>
          </div>
        </el-header>
  
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const logout = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  