<template>
  <div class="main__layout">
    <Sidebar />
    <div class="content">
      <Header />
      <div class="_container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
export default {
  name: "MainLayots",
  data() {
    return {};
  },
  components: {
    Sidebar,
    Header,
  },
};
</script>
<style lang='scss'>
@import "@/assets/scss/layouts/main";
</style>
