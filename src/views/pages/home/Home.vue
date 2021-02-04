<template>
  <div class="home">
    <div class="home__app">
      <Time />
      <Notifications v-if="note && note.notifications" :notifications="note.notifications"/>
      <Notes v-if="note && note.notes" :notes="note.notes"/>
    </div>
    <div class="home__users">
      <Users
      :mid="mid"
      />
    </div>
    <div class="home__projects">
      <Projects v-if="right" :right="right"/>
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
  async mounted() {
    await this.$store.dispatch('getMidUser')
    await this.$store.dispatch('getRightUser')
    await this.$store.dispatch('getNotesUser')
  },
  computed:{
    mid(){
      return this.$store.getters.getMid
    },
    right(){
      return this.$store.getters.getRight
    },
    note(){
      return this.$store.getters.getNote
    }
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