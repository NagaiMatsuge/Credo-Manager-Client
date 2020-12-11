<template>
  <div class="main__layout">
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
<style lang='scss'>
@import "@/assets/scss/layouts/main";
</style>
