<template>
  <div class="projectAdd">
    <ProjectAddInfo v-if="getInfoProject" :validator="$v.getInfoProject.project" :getInfoProject="getInfoProject" />
    <ProjectAddStage v-if="getInfoProject" :validator="$v.getInfoProject.steps" :getInfoProject="getInfoProject"  />
    <button class="projectAdd__btn" @click.prevent="submitHandler">Сохранить</button>

  </div>
</template>
<script>
import ProjectAddInfo from "@/components/Projects/ProjectAddInfo"
import ProjectAddStage from "@/components/Projects/ProjectAddStage"
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  data(){
    return{
      formData: {
        project: {
          title: null,
          deadline: null,
          description: null,
          color: "#8F73FC"
        },
        steps:[]
      }
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
  },
  mounted() {
    this.$store.dispatch('fetchInfoProject')
    this.$store.dispatch('fetchProjectInfo', this.$route.params.id)
  },

  methods:{

    async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.getInfoProject.project.deadline = document.getElementById('deadline').value
      try {
        await this.$store.dispatch("putProject", this.getInfoProject)
        await this.$router.push("/projects");
        this.$store.commit("setNotification", "project-edit-success");
      } catch (e) {}
    }
  },

  components:{
    ProjectAddInfo,
    ProjectAddStage
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/projects-add';
</style>