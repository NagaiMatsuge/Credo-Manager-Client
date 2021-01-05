<template>
  <div class="main__layout">
    <Sidebar />
    <div class="content">
      <Header
        v-if="user && title"
        :user="user"
        :title="title"
        :breadcrumbs="breadcrumbs"
      />
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
  name: "MainLayouts",
  data() {
    return {};
  },
  components: {
    Sidebar,
    Header,
  },
  mounted() {
    if (!this.$store.getters.getUserCredentials) {
      this.$store.dispatch("fetchUserCredentials");
    }
    Echo.channel("to.1").listen("NewMessage", (e)=>{console.log(e)})
  },
  computed: {
    user() {
      return this.$store.getters.getUserCredentials;
    },
    title() {
      return this.$route.meta.title;
    },
    breadcrumbs() {
      return this.$route.meta.breadcrumb;
    },
  },
};
</script>
<style lang='scss'>
@import "@/assets/scss/layouts/main";
</style>
