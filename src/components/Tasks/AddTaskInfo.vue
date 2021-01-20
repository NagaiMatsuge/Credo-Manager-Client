<template>
  <div class="addTask__info">
    <div class="addTask__info-body">
      <div class="addTask__info-title">Основаная информация о задаче</div>
      <div class="addTask__info-group">
        <input type="text" id="title" v-model="formData.title">
        <label for="title" class="label" :class="{focus: !(formData.title === '')}">Название задачи</label>
      </div>
      <div class="addTask__info-group">
        <DynamicSelect
            v-if="allProjects.projects"
            :options="allProjects.projects.data"
            option-value="id"
            option-text="title"
            placeholder=""
            v-model="formData.projects"
            @input="getStep"
            id="projects"
            style="width: 100%;"
        />
        <label for="projects" class="label" :class="{focus: !(formData.projects.title === '')}">Выберите проект</label>
      </div>
      <template v-if="allSteps">
      <div class="addTask__info-group">
        <DynamicSelect
            v-if="allSteps.steps"
            :options="allSteps.steps"
            option-value="id"
            option-text="title"
            placeholder=""
            v-model="formData.step_ids"
            @input="stepId($event)"
            id="step_id"
            style="width: 100%;"
        />
        <label for="step_id" class="label" :class="{focus: !(formData.step_ids.title === '')}">Выберите этап проекта</label>
      </div>
      </template>
      <div class="addTask__info-group">
        <input type="radio" name="time" v-model="formData.type" value="1" @change="formData.times.hh = '00'; formData.times.mm = '00'; formData.deadline = null; formData.time = 0" id="time_1">
        <label for="time_1" class="label__radio">Время на выполнение</label>
        <div class="time__picker" v-if="formData.type === '1'">
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
        <input type="radio" name="time" v-model="formData.type" value="2" @change="formData.times.hh = '00'; formData.times.mm = '00'; formData.deadline = null; formData.time = 0" id="time_2">
        <label for="time_2" class="label__radio">Дедлаин</label>
        <div class="data__picker" v-if="formData.type === '2'" >
          <Datepicker  :language="lang" :disabled-dates="disabledDates" id="deadline" @input="dataPick($event)"
                       placeholder="" :format="format"/>
          <label for="deadline" :class="{focus: !(formData.deadline === null)}">
            Выберите дату
          </label>
        </div>

      </div>
      <div class="addTask__info-group">
        <input type="radio" name="time" v-model="formData.type"  value="3" id="time_3">
        <label for="time_3" class="label__radio">Без времени</label>
      </div>
    </div>


  </div>
</template>
<script>
import DynamicSelect from "vue-dynamic-select";
import VueTimepicker from "vue2-timepicker";
import Datepicker from 'vuejs-datepicker';
import lang from 'vuejs-datepicker/dist/locale/translations/ru';
export default {
  data(){
    return{
      format: 'yyyy-MM-dd',
      lang,
      disabledDates: {
        to: new Date(),
      },

    }
  },
  props:{
    addTaskInfo:{},
    allProjects:{},
    allSteps:{},
    formData:{}
  },
  methods:{
    getStep(id){
      this.$store.dispatch('fetchProjectInfo', id.id)
      this.formData.step_ids.id=null
      this.formData.step_ids.title=''
    },
    stepId(e){
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
    DynamicSelect,
    VueTimepicker,
    Datepicker
  }
}
</script>
<style lang="scss">
@import "~vue2-timepicker/dist/VueTimepicker.css";

</style>
<style lang="scss">

.vdp-datepicker{
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
}
.data__picker{
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  label{
    position: absolute;
    top: 13px;
    left: 15px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #B4B8CC;
    transition: 0.2s;
    user-select: none;
    &.focus{
      top: 0;
      font-size: 11px;
      line-height: 15px;
    }
  }
}
.time{
  &__picker{
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    .vue__time-picker{
      margin-left: 10px;
      width: 100px;
      height: 50px;
      input{
        height: 50px !important;
        &:focus{
          +label{
            top: 0;
          }
        }
      }
    }
  }
  &__picker-group{
    position: relative;
    label{
      position: absolute;
      top: 13px;
      left: 15px;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      color: #B4B8CC;
      transition: 0.2s;
      user-select: none;
      &.focus{
        top: 0;
      }

    }

  }
}



</style>