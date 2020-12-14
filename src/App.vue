<template>
  <div id="app">
    <vue-topprogress color="#4473F6" ref="topProgress"></vue-topprogress>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "auth") + "-layout";
    },
    progress(){
      return this.$store.getters.getProgress
    },
  },
  mounted() {

  },
  watch:{
    progress: {
      handler(newValue) {
        if(newValue === "start") {
          this.$refs.topProgress.start()
        }else {
          this.$refs.topProgress.done()
        }
      },
      deep: true
    }

  },

  components: {
    AuthLayout,
    MainLayout,
  },
};
</script>
<style lang="scss">
@import url(//db.onlinewebfonts.com/c/623c7118249e082fe87a78e08506cb4b?family=Segoe+UI);
@import "@/assets/scss/base.scss";

</style>
