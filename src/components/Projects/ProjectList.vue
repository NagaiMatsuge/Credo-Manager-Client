<template>
  <div>
    <div
      v-for="(project, index) in projects"
      :key="index"
      class="projects__body-element"
    >
      <div class="projects__body__name">
        <div class="projects__body__name-logo">
          <img
            v-if="project.photo"
            :src="project.photo"
          >
          <div v-else>
            Not Image
          </div>
        </div>
        <div class="projects__body__name-text">Text</div>
      </div>
      <div class="projects__body__description">Description</div>
      <div class="projects__body__deadline ">Deadline</div>
      <div class="projects__body__status">Status</div>
      <div class="projects__body__paid">Paid</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects,
  },
};
</script>

<style>
</style>