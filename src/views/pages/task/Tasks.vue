<template >
  <div class="task" v-if="user" >
    <AdminTask v-if="user.role === 'Admin'"  :data="data" :tasks="tasks" />
    <Task v-else :tasks="tasks"/>

  </div>
</template>
<script>

import AdminTask from "@/components/Tasks/AdminTask";
import Task from "@/components/Tasks/Task";

export default {
  computed:{
    data(){
      return this.$store.getters.getProjectsAll
    },
    tasks(){
      return this.$store.getters.getTasks
    },
    user(){
      return this.$store.getters.getUserCredentials
    }
  },
  components:{
    AdminTask,
    Task,
  },
  async created() {
    await this.$store.dispatch('tasksAll')
  },
};
</script>
<style lang='scss'>
@import '@/assets/scss/pages/task/app';
</style>