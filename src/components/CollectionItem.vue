<template>
  <div
    :style="{ width: width }"
    class="dib relative overflow-hidden v-top"
  >
    <img
      :src="thumbSrc"
      :title="title"
      class="mb-1"
    >
    <div 
      v-if="showTitle || showDate" 
      class="absolute left-0 top-0 pa1 bg-black-50"
    >
      <div v-if="showTitle">{{title}}</div>
      <div v-if="showDate">{{date}}</div>
    </div>          
  </div>
</template>

<script>
export default {
  name: 'CollectionItem',
  props: {
    width: String,
    thumbSrc: String,
    title: String,
    date: String,
    showTitle: Boolean,
    showDate: Boolean,
  }
}
</script>

<style scoped>
</style>
