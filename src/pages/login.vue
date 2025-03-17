<template>
  <loginform  @gotohome="router.push('/')" />
</template>

<script setup>
import loginform from '@/components/loginform.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>