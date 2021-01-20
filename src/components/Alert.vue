<template>
  <div>
      <div v-if="error" class="alert error">{{error}}</div>
      <div v-if="notification" class="alert notification">{{notification}}</div>
  </div>
</template>

<script>
export default {
  props: {
    error: null,
    notification: null
  },
  watch:{
    notification: {
      handler(newValue) {
        if(newValue) this.$store.commit('clearNotification')
      },
      deep: true
    },
    error: {
      handler(newValue) {
        if(newValue) this.$store.commit('clearError')
      },
      deep: true
    },
  }
};
</script>
<style lang="scss">
@import "../assets/scss/alert.scss";
</style>