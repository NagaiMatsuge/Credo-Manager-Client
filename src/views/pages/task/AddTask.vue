<template>
  <div class="addTask">
    <AddTaskInfo v-if="allProjects" :addTaskInfo="addTaskInfo" :allProjects="allProjects" :allSteps="allSteps"/>
  </div>
</template>
<script>
import AddTaskInfo from '@/components/Tasks/AddTaskInfo'
export default {
  data(){
    return{

    }
  },
  async mounted() {
    await this.$store.dispatch('AddTaskInfo')
    await this.$store.dispatch('fetchProjectsAll')
  },
  computed:{
    addTaskInfo(){
      return this.$store.getters.getAddTaskInfo
    },
    allProjects(){
      return this.$store.getters.getProjectsAll
    },
    allSteps(){
      return this.$store.getters.getProjectInfo
    }
  },
  components:{AddTaskInfo}
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/task-add';
</style>