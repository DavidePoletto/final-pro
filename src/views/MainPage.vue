<template>
  <div class="page">
    <MainBar />
    <div class="main_content"></div>
    
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import title from '@/components/title.vue'

export default {
  components: {
    MainBar,
    title,
  }
};
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main_content {
  height: 100%;
  background-color: gray;
}
</style>