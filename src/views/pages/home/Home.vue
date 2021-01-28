<template>
  <div class="home">
    <div class="home__app">
      <Time />
      <Notifications />
      <Notes />
    </div>
    <div class="home__users">
      <Users />
    </div>
    <div class="home__projects">
      <Projects />
    </div>
  </div>
</template>

<script>
import Time from "@/components/Home/Time";
import Notifications from "@/components/Home/Notifications";
import Notes from "@/components/Home/Notes";
import Projects from "@/components/Home/Projects";
import Users from "@/components/Home/Users";
export default {
  data() {
    return {};
  },
  components: {
    Time,
    Notifications,
    Notes,
    Projects,
    Users,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/home/app";
</style>