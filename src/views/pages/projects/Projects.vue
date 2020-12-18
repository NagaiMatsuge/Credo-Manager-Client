<template>
  <div class="projects">
    <div class="projects__container">
      <div class="projects__head">
        <div class="projects__head__name">Наименование проекта</div>
        <div class="projects__head__description">Описание</div>
        <div class="projects__head__deadline">Дедлайн</div>
        <div class="projects__head__status">Стат ус выполнения</div>
        <div class="projects__head__paid">Оплачено</div>
      </div>
      <div class="projects__body">
        <ProjectList
          v-if="projects"
          :projects="projects"
        />
      </div>
      <div class="projects__controls">
        <!-- Pagination and buttons -->
      </div>
    </div>
  </div>
</template>
<script >
import ProjectList from "@/components/Projects/ProjectList";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("fetchProjects");
  },
  computed: {
    projects() {
      return this.$store.getters.getProjects;
    },
  },
  components: {
    ProjectList,
  },
};
</script>
<style lang='scss'>
@import "@/assets/scss/pages/projects";
</style>