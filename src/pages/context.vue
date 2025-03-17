<template>
  <Upload v-if="isuploading" @finishupload="isuploading = false" />
  <ContentShow v-else @startupload="isuploading = true" />
<!-- 
  <Upload />
  <ContentShow /> -->

</template>


<script setup>
import ContentShow from '@/components/item/contentshow.vue';
import Upload from '@/components/item/upload.vue';
import { ref } from 'vue';
const isuploading = ref(false);
</script>