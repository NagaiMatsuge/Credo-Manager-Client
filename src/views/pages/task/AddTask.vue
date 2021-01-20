<template>
  <div class="addTask">
    <AddTaskInfo v-if="allProjects" :formData="formData" :addTaskInfo="addTaskInfo" :allProjects="allProjects" :allSteps="allSteps"/>
    <AddTaskUser v-if="infoUser" :formData="formData" :infoUser="infoUser"/>
    <div class="user__add-submit">
      <button
          class="cancel"
          type="submit"
          @click.prevent="$router.push('/tasks')"
      >Отменить изменения</button>
      <button
          class="add"
          @click.prevent="sendTask"
          type="submit"
      >Сохранить</button>
    </div>
  </div>
</template>
<script>
import AddTaskInfo from '@/components/Tasks/AddTaskInfo'
import AddTaskUser from '@/components/Tasks/AddTaskUser'
export default {
  data(){
    return{
        formData : {
          projects:{
            id: null,
            title: ''
          },
          step_ids:{
            id: null,
            title: ''
          },
          times: {
            hh: '00',
            mm: '00'
          },
          title: '',
          user_ids: [],
          step_id: '',
          time: 0,
          type: 3,
          deadline: null
        }
    }
  },
  methods:{
    async sendTask(){
      try {
        await this.$store.dispatch('sendTask', this.formData)
        await this.$router.push('/tasks')
        this.$store.commit("setNotification", "task-add-success");
      }catch (e){}
    }
  },
  async mounted() {
    await this.$store.dispatch('AddTaskInfo')
    await this.$store.dispatch('fetchProjectsAll')
    await this.$store.dispatch('fetchInfoUser')
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
    },
    infoUser(){
      return this.$store.getters.getInfoUser
    }
  },
  components:{AddTaskInfo, AddTaskUser}
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/task-add';
</style>