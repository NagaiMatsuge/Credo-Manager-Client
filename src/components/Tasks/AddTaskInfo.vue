<template>
  <div class="addTask__info">
    <div class="addTask__info-body">
      <div class="addTask__info-title">Основаная информация о задаче</div>
      <div class="addTask__info-group" >
        <input
            type="text"
            id="title"
            v-model="formData.title"
            :class="{
              invalid:
              (validator.title.$dirty && !validator.title.required) ||
              (validator.title.$dirty && !validator.title.minLength),
            }"
        >
        <label for="title" class="label" :class="{focus: !(formData.title === '')}">Название задачи</label>
        <small
            class="error"
            v-if="validator.title.$dirty && !validator.title.required"
        >Введите название задачи</small>
        <small
            class="error"
            v-else-if="validator.title.$dirty && !validator.title.minLength"
        >
          Название задачи должен содержать минимум {{ validator.title.$params.minLength.min }} символов. Сейчас он
          {{ formData.title.length }}
        </small>
      </div>
        <div class="addTask__info-group">
          <Select
              :options="allProjects.projects"
              :value="formData.projects"
              :optionId="'id'"
              :optionValue="'title'"
              id="projects"
              @change="getStep"
              :class="{
                invalid: validator.projects.id.$dirty && !validator.title.required
              }"
          />
          <label for="projects" class="label" v-if="formData.projects" :class="{focus: !(formData.projects.title === '')}">Выберите проект</label>
          <small
              class="error"
              v-if="validator.projects.id.$dirty && !validator.projects.id.required"
          >Выберите проект</small>
        </div>
        <div class="addTask__info-group" v-if="allSteps && formData.projects">
          <Select
              :options="allSteps.steps"
              :value="formData.step_ids"
              :optionId="'id'"
              :optionValue="'title'"
              id="step_id"
              @change="stepId"
              :class="{
                invalid: validator.step_ids.id.$dirty && !validator.step_ids.id.required
              }"
          />
          <label for="step_id" class="label" v-if="formData.step_ids" :class="{focus: !(formData.step_ids.title === '')}">Выберите этап проекта</label>
          <small
              class="error"
              v-if="validator.step_ids.id.$dirty && !validator.step_ids.id.required"
          >Выберите этап</small>
        </div>
      <div class="addTask__info-group">
        <input type="radio" name="time" v-model.number="formData.type" value="1" @change="formData.times.hh = '00'; formData.times.mm = '00'; formData.deadline = null; formData.time = 0" id="time_1">
        <label for="time_1" class="label__radio">Время на выполнение</label>
        <div class="time__picker" v-if="formData.type === 1">
          <div class="time__picker-group">
            <div class="vue__time-picker">
              <input type="number" minlength="0" v-model="formData.times.hh" id="time_hh" @change="timeCalc(formData.times)">
              <label for="time_hh" :class="{focus: !(formData.times.hh === '')}">
                Часов
              </label>
            </div>
          </div>
          <div class="time__picker-group">
            <div class="vue__time-picker">
              <input type="number"  v-model="formData.times.mm" id="time_mm" @change="timeCalc(formData.times)">
              <label for="time_mm" :class="{focus: !(formData.times.mm === '')}">
                Минут
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="addTask__info-group">
        <input type="radio" name="time" v-model.number="formData.type" value="2" @change="formData.times.hh = '00'; formData.times.mm = '00'; formData.deadline = null; formData.time = 0" id="time_2">
        <label for="time_2" class="label__radio">Дедлаин</label>
        <div class="data__picker" v-if="formData.type === 2" >
          <Datepicker  :language="lang" :disabled-dates="disabledDates" id="deadline" @input="dataPick($event)"
                       placeholder="" :format="format"/>
          <label for="deadline" :class="{focus: !(formData.deadline === null)}">
            Выберите дату
          </label>
        </div>

      </div>
      <div class="addTask__info-group">
        <input type="radio" name="time" v-model.number="formData.type"  value="3" id="time_3">
        <label for="time_3" class="label__radio">Без времени</label>
      </div>
    </div>


  </div>
</template>
<script>
import VueTimepicker from "vue2-timepicker";
import Datepicker from 'vuejs-datepicker';
import lang from 'vuejs-datepicker/dist/locale/translations/ru';
import Select from "@/components/Select";
export default {
  data(){
    return{
      Datepicker

    }
  },
  props:{
    allProjects:{},
    allSteps:{},
    formData:{},
    validator:{}
  },
  methods:{
    getStep(id){
        this.formData.projects = id
        this.$store.dispatch('fetchProjectInfo', id.id)
        this.formData.step_ids = {
          id: null,
          title: ''
        }
    },
    stepId(e){
        this.formData.step_ids = e
        this.formData.step_id = e.id
    },
    timeCalc(obj){
      this.formData.time = (parseInt(obj.hh) * 60) + parseInt(obj.mm)
    },
    dataPick(event){
      let date = event.getDate();
      let month = event.getMonth()+1;
      let year = event.getFullYear();
      this.formData.deadline = `${year}-${month}-${date}`
    }

  },
  components:{
    VueTimepicker,
    Datepicker,
    Select
  }
}
</script>
<style lang="scss">
@import "~vue2-timepicker/dist/VueTimepicker.css";
</style>