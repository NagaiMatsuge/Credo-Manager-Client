<template>
  <div class="addTask__info">
    <div class="addTask__info-body">
      <div class="addTask__info-title">Основаная информация о задаче</div>
      <div class="addTask__info-group">
        <input type="text" id="title">
        <label for="title" class="label">Название проекта</label>
      </div>
      <div class="addTask__info-group">
        <DynamicSelect
            v-if="allProjects.projects"
            :options="allProjects.projects"
            option-value="id"
            option-text="title"
            placeholder=""
            v-model="projects"
            @input="getStep"
            id="projects"
            style="width: 100%;"
        />
        <label for="projects" class="label" :class="{focus: !(projects.title === '')}">Выберите проект</label>
      </div>
      <template v-if="allSteps">
      <div class="addTask__info-group">
        <DynamicSelect
            v-if="allSteps.steps"
            :options="allSteps.steps"
            option-value="id"
            option-text="title"
            placeholder=""
            v-model="step_id"
            id="step_id"
            style="width: 100%;"
        />
        <label for="step_id" class="label" :class="{focus: !(step_id.title === '')}">Выберите этап проекта</label>
      </div>
      </template>
      <div class="addTask__info-group">
        <input type="radio" name="time" id="time_1">
        <label for="time_1" class="label__radio">Время на выполнение</label>
      </div>
      <div class="addTask__info-group">
        <input type="radio" name="time" id="time_2">
        <label for="time_2" class="label__radio">Без времени</label>
      </div>
    </div>
<!--      <div v-for="(project, index) in allProjects.projects" :key="index">{{project.title}}</div>-->

<!--    <template v-if="allSteps">-->
<!--      <div v-for="(step, index) in allSteps.steps" :key="index">{{step.title}}</div>-->
<!--    </template>-->
<!--    <button v-for="(project, index) in allProjects.projects" :key="index" @click.prevent="getStep(project.id)">{{project.title}}</button>-->
  </div>
</template>
<script>
import DynamicSelect from "vue-dynamic-select";
export default {
  data(){
    return{
      projects:{
        id: null,
        title: ''
      },
      step_id:{
        id: null,
        title: ''
      }

    }
  },
  props:{
    addTaskInfo:{},
    allProjects:{},
    allSteps:{}
  },
  methods:{
    getStep(id){
      this.$store.dispatch('fetchProjectInfo', id.id)
      this.step_id.id=null
      this.step_id.title=''
    }
  },
  components:{
    DynamicSelect
  }
}
</script>