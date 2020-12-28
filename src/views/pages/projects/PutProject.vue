<template>
  <div class="projectAdd">
    <ProjectAddInfo v-if="getInfoProject" :validator="$v.getInfoProject.project" :getInfoProject="getInfoProject" @changed="isChanged" />
    <ProjectAddStage v-if="getInfoProject" :validator="$v.getInfoProject.steps" :getInfoProject="getInfoProject"  />
    <PaymentsList v-if="getInfoProject && getPayments" :validator="$v.getInfoProject" :getInfoProjectInPayments="getInfoProjectInPayments" :getPayments="getPayments"  />
    <Paginations v-if="getPayments && getPayments.meta.last_page !== 1" :pagination="getPayments" />
    <button class="projectAdd__btn" @click.prevent="submitHandler">Сохранить</button>
  </div>
</template>
<script>
import ProjectAddInfo from "@/components/Projects/ProjectAddInfo"
import ProjectAddStage from "@/components/Projects/ProjectAddStage"
import PaymentsList from "@/components/Projects/PaymentsList"
import Paginations from "@/components/Paginations"
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  data(){
    return{
      childPhotoChanged: false
    }
  },
  validations: {
    getInfoProject: {
      project: {
        title:{
          required,
          minLength: minLength(4)
        },
        description: {
          required,
          minLength: minLength(10)
        }
      },
      steps:{
        $each: {
          title: {
            required,
            minLength: minLength(4)
          },
          price: {
            required,
            maxLength: maxLength(13)
          }
        }
      }
    },
  },
  computed:{
    getInfoProject(){
      return this.$store.getters.getProjectInfo
    },
    getInfoProjectInPayments(){
      return this.$store.getters.getProjectInfo
    },
    getPayments(){
      return this.$store.getters.getPayments
    },
  },
  mounted() {
    this.$store.dispatch('fetchInfoProject')
    this.$store.dispatch('fetchProjectInfo', this.$route.params.id)
    this.$store.dispatch('fetchProjectPayments', this.$route.params.id)
  },

  methods:{
    isChanged(val){
      if (val === false){
        delete this.getInfoProject.project.photo
        this.childPhotoChanged = false;
      }else{
        this.childPhotoChanged = true;
      }
    },
    async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.childPhotoChanged === false){
        delete this.getInfoProject.project.photo
      }
      this.getInfoProject.project.deadline = document.getElementById('deadline').value
      try {
        await this.$store.dispatch("putProject", this.getInfoProject)
        await this.$router.push("/projects");
        this.$store.commit("setNotification", "project-edit-success");
        this.getInfoProject.project.photo = ''
      } catch (e) {}
    }
  },

  components:{
    ProjectAddInfo,
    ProjectAddStage,
    PaymentsList,
    Paginations
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/projects-add';
</style>