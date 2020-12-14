<template>
  <div class="empty__layout">

    <div class="empty__layout-left">
      <div class="empty__layout-log ">
        <img src="../assets/img/logo.svg" alt />
        <span>CTM</span>
      </div>
      <div class="empty__layout-text">
        <p>
          Наблюдение и управление
          <br />за проектами в Вашей студии
        </p>
      </div>
      <div class="empty__layout-bottom">
        <a href="#!">Политика конфиденциальности</a>
        <p>Credo Studio© 2020 Credo</p>
      </div>
    </div>
    <Alert :error="error" :notification="notification" />
    <div class="content__layout-rigth">
      <router-view />
    </div>
  </div>
</template>
<script>
import messages from '@/utils/messages'
import Alert from '@/components/Alert'
export default {
  computed:{
    error(){
      return (messages[this.$store.getters.error])
    },
    notification(){
      return (messages[this.$store.getters.notification])
    },
  },

  components:{
    Alert
  }
}
</script>
<style lang='scss'>
@import "@/assets/scss/layouts/auth.scss";
</style>