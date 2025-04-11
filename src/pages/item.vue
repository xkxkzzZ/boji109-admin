<template>

  <itemdetail :selected_id="id" />

</template>

<script setup> 

import itemdetail from '@/components/item/itemdetail.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

</script>

