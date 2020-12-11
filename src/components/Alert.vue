<template>
  <div>
      <div v-if="error" class="alert error">{{error}}</div>
      <div v-if="notification" class="alert notification">{{notification}}</div>
  </div>
</template>

<script>
export default {
  props:{
    error: null,
    notification: null
  }
}
</script>
<style lang="scss">
@import "../assets/scss/alert.scss";
</style>