<template>
  <div class="projectAdd__info">
    <div class="projectAdd__info-body">
      <div class="projectAdd__info-img">

        <form>
          <label>
            <img :src="this.getInfoProject.project.photo" alt="">

            <div class="projectAdd__info-noImg">
              <p v-if="getInfoProject.project.title">
                {{getInfoProject.project.title.charAt(0).toUpperCase() || ''}}
              </p>
              <span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.38259 2.75531V3.22406H9.85134H12.2274C12.4412 3.22406 12.645 3.30792 12.7942 3.45524C12.9433 3.60235 13.0259 3.80054 13.0259 4.00588V10.4932C13.0259 10.6985 12.9433 10.8967 12.7942 11.0438C12.645 11.1912 12.4412 11.275 12.2274 11.275H8.28711C9.97253 10.6986 11.1907 9.11596 11.1907 7.24985C11.1907 4.89543 9.25149 2.99063 6.88092 2.99063C4.51015 2.99063 2.57243 4.89563 2.57243 7.24985C2.57243 9.11449 3.78803 10.6973 5.47159 11.275H1.53506C1.3213 11.275 1.11753 11.1912 0.968243 11.0438C0.81917 10.8967 0.736572 10.6985 0.736572 10.4932V4.00588C0.736572 3.80054 0.819169 3.60235 0.968243 3.45524C1.11753 3.30792 1.3213 3.22406 1.53506 3.22406H3.91114H4.37989V2.75531V2.28613H9.38259V2.75531ZM6.88098 5.17807L6.93276 5.17806C7.47453 5.19109 7.9902 5.40914 8.37263 5.78644C8.76701 6.17554 8.98746 6.70198 8.98752 7.24959C8.98759 7.79721 8.76727 8.3237 8.37299 8.71289C7.9785 9.10229 7.44211 9.32218 6.8815 9.32225C6.60408 9.32228 6.32952 9.26839 6.07354 9.16379C5.81757 9.05919 5.58538 8.90603 5.39008 8.71334C5.19478 8.52067 5.04019 8.29225 4.93483 8.04131C4.82947 7.79039 4.7753 7.52166 4.77527 7.25041C4.77524 6.97917 4.82933 6.71043 4.93463 6.45948C5.03993 6.20851 5.19447 5.98006 5.38971 5.78734C5.58497 5.5946 5.81712 5.44138 6.07306 5.33673C6.32901 5.23207 6.60356 5.1781 6.88098 5.17807Z" fill="#E2E3E6" stroke="#E2E3E6" stroke-width="0.9375"/>
            </svg>
          </span>
            </div>
            <input type="file" id="file-img" @change="photoSubmit" ref="file" accept="image/*">
          </label>
        </form>
      </div>
      <div class="projectAdd__info-form" >
        <p class="projectAdd__info-title">О проекте</p>
        <form>
          <div class="projectAdd__info-group">
            <input type="text" id="name" v-model="getInfoProject.project.title" :class="{
              invalid:
              (validator.title.$dirty && !validator.title.required) ||
              (validator.title.$dirty && !validator.title.minLength),
              }"
            />
            <label for="name" :class="{focus: !(getInfoProject.project.title === '')}">Наименование проекта</label>
            <small
                class="error"
                v-if="validator.title.$dirty && !validator.title.required"
            >Введите название проекта</small>
            <small
                class="error"
                v-else-if="validator.title.$dirty && !validator.title.minLength"
            >
              Название проекта должен содержать минимум {{ validator.title.$params.minLength.min }} символов. Сейчас он {{ getInfoProject.project.title.length }}
            </small>
          </div>
          <div class="projectAdd__info-group">
            <input type="text" id="desc" v-model="getInfoProject.project.description" :class="{
              invalid:
              (validator.description.$dirty && !validator.description.required) ||
              (validator.description.$dirty && !validator.description.minLength),
              }"
            />
            <label for="desc" :class="{focus: !(getInfoProject.project.description === '')}">Описание</label>
            <small
                class="error"
                v-if="validator.description.$dirty && !validator.description.required"
            >Введите название проекта</small>
            <small
                class="error"
                v-else-if="validator.description.$dirty && !validator.description.minLength"
            >
              Название проекта должен содержать минимум {{ validator.description.$params.minLength.min }} символов. Сейчас он {{ getInfoProject.project.description.length }}
            </small>
          </div>
          <div class="projectAdd__info-group">
            <Datepicker :language="lang" :disabled-dates="disabledDates"  id="deadline" v-model="getInfoProject.project.deadline" :format="format"/>
            <label for="deadline" :class="{focus: !(getInfoProject.project.deadline === '')}">Дедлайн</label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import lang from 'vuejs-datepicker/dist/locale/translations/ru';
export default {
  data(){
    return{
      format:'yyyy-MM-dd',
      lang,
      img: '',
      disabledDates: {
        to: new Date(),
      }
    }
  },
  methods:{
    photoSubmit(e){
      let fileRender = new FileReader()
      fileRender.readAsDataURL(e.target.files[0])
       fileRender.onload = (e) =>{
         this.getInfoProject.project.photo = e.target.result
      }
    },
  },
  props:{
    getInfoProject: {},
    validator: {}
  },

  components: {
    Datepicker,
  }
}
</script>