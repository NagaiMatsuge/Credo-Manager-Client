<template>
  <div class="main__layout">
    <Sidebar />
    <div class="content">
      <div class="_container">
        <button @click.prevent="logout">ВЫХОД</button>
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
  },
  methods:{
    async logout(){
      console.log(localStorage.token)

      await this.$store.dispatch('logout')
      this.$router.push('/login?message=login')
      localStorage.clear()
    }
  }

};
</script>
<style lang='scss'>
@import "@/assets/scss/layouts/main";
</style>
