<template >
  <div class="task" v-if="role" >
    <AdminTask v-if="role.role === 'Admin' && data && tasks" :data="data" :tasks="tasks" />
    <Task v-else :tasks="tasks"/>

  </div>
</template>
<script>

import AdminTask from "@/components/Tasks/AdminTask";
import Task from "@/components/Tasks/Task";

export default {
  data(){
    return{


    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProjectsAll')
    await this.$store.dispatch('allMessages')
    await this.$store.dispatch('tasksAll')

  },

  computed:{
    data(){
      return this.$store.getters.getProjectsAll
    },
    tasks(){
      return this.$store.getters.getTasks
    },
    role(){
      return this.$store.getters.getUserCredentials
    }
  },
  components:{
    AdminTask,
    Task,
  }
};
</script>
<style lang='scss'>
@import "@/assets/scss/pages/task";
</style>