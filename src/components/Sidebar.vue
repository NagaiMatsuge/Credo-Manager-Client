<template>
  <div>
    <div class="nav">
      <div class="nav__logo">
        <router-link to="/">
          LOGO {{api}}
        </router-link>
      </div>
      <router-link to="/login">
        Login
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  data() {
    return {
        api: process.env.VUE_APP_SERVICE_URL
    };
  },
  created() {
      console.log(process.env.VUE_APP_SERVICE_URL)
  },
};
</script>
