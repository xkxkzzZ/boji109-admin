<template>
  <div class="flex flex-col min-h-screen">
    <Header />
      <main class="flex-1 overflow-auto bg-teal-50">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';


</script>

<style scoped></style>
