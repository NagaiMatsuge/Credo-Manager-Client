<template>
  <div class="addTask">
    <AddTaskInfo
        v-if="allProjects && allSteps && editInfo"
        :validator="$v.editInfo"
        :formData="editInfo"
        :allProjects="allProjects"
        :allSteps="allSteps"
    />
    <AddTaskUser
        v-if="infoUser && editInfo"
        :validator="$v.editInfo"
        :formData="editInfo"
        :infoUser="infoUser"
    />
    <div class="user__add">
      <div class="user__add-submit">
        <button
            class="cancel"
            type="submit"
            @click.prevent="$router.push('/tasks'); $store.commit('setProjectInfo', {})"
        >Отменить изменения
        </button>
        <button
            class="add"
            @click.prevent="sendTask"
            type="submit"
        >Сохранить
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import AddTaskInfo from '@/components/Tasks/AddTaskInfo'
import AddTaskUser from '@/components/Tasks/AddTaskUser'
import {minLength, required} from "vuelidate/lib/validators";

export default {
  validations: {
    editInfo: {
      title:{
        required,
        minLength: minLength(4)
      },
      user_ids: {required},
      step_ids:{
        id:{required}
      },
      projects:{
        id:{required}
      }
    },
  },
  methods: {
    async sendTask() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch('editTask', {obj: this.editInfo, id: this.$route.params.id})

        await this.$router.push('/tasks')

        this.$store.commit("setNotification", "task-edit-success");

      } catch (e) {
      }
    }
  },
  async mounted() {

    await this.$store.dispatch('fetchEditInfo', this.$route.params.id);

    await this.$store.dispatch('fetchProjectsAll');

    await this.$store.dispatch('fetchProjectInfo', this.$route.params.projects_id);


    await this.$store.dispatch('fetchInfoUser');

  },
  computed: {

    editInfo() {
      return this.$store.getters.getEditInfo
    },

    allSteps() {
      return this.$store.getters.getProjectInfo
    },

    allProjects() {
      return this.$store.getters.getProjectsAll
    },

    infoUser() {
      return this.$store.getters.getInfoUser
    },

  },
  components: {AddTaskInfo, AddTaskUser}
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/task/app';
</style>