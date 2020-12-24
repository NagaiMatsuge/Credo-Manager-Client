<template>
  <div class="projectAdd">

    <ProjectAddInfo v-if="getInfoProject" :validator="$v.getInfoProject.project" :getInfoProject="getInfoProject"/>
    <ProjectAddStage v-if="getInfoProject" :validator="$v.getInfoProject.steps" :getInfoProject="getInfoProject"/>
    <div class="projectAdd__button">
      <button class="projectAdd__btn close" @click.prevent="$router.push('/projects')">Отмена</button>
      <button class="projectAdd__btn" @click.prevent="submitHandler">Сохранить</button>
    </div>

  </div>
</template>
<script>
import ProjectAddInfo from "@/components/Projects/ProjectAddInfo"
import ProjectAddStage from "@/components/Projects/ProjectAddStage"
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      color: ["#8F73FC", "#fcb573", "#fc73ad"],
    }
  },
  computed: {
    getInfoProject() {
      return this.$store.getters.getInfoProject
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
  mounted() {
    this.$store.dispatch('fetchInfoProject')
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.getInfoProject.project.color = this.color[this.randomInteger(0, 2)]
      this.getInfoProject.project.deadline = document.getElementById('deadline').value

      try {
        await this.$store.dispatch("createProject", this.getInfoProject)
        await this.$router.push("/projects");
        this.$store.commit("setNotification", "project-add-success");
      } catch (e) {}
    },
    randomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
  },

  components: {
    ProjectAddInfo,
    ProjectAddStage
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/projects-add';
</style>