<template>
  <div class="main__layout">
    <h1>MainLayouts</h1>
    <Sidebar />
    <div class="content">
      <div class="_container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: "MainLayots",
  data() {
    return {};
  },
  components:{
    Sidebar,
  }
};
</script>
<style scoped lang="scss"></style>
