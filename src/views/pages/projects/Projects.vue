<template>
  <div class="projects" v-if="projects">
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
        <div class="projects__pagination"></div>
        <div class="projects__active" :class="active" @click="archive='',active='active'">Актуальные проекты (5)</div>|
        <div class="projects__archive" :class="archive" @click="active='',archive='active'">Архив проектов (7)</div>
        <button class="projects__add" @click="$router.push('/add-projects')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8.4718H8.46612V14H5.56263V8.4718H0V5.55692H5.56263V0H8.46612V5.55692H14V8.4718Z" fill="white"/>
          </svg>
          Создать проект
        </button>
      </div>
    </div>
  </div>
</template>
<script >
import ProjectList from "@/components/Projects/ProjectList";
export default {
  data() {
    return {
      active: 'active',
      archive: ''

    };
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