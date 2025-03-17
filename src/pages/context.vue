<template>
  <!-- <Upload v-if="isuploading" @finishupload="isuploading = false" /> -->
  <!-- <Content v-else @startupload="isuploading = true" /> -->

  <Upload />
  <Content />

</template>


<script setup>
import Content from '@/components/item/content.vue';
import Upload from '@/components/item/upload.vue';
import { ref } from 'vue';
const isuploading = ref(false);
</script>