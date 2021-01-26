<template>
  <div class="user__add">
    <div class="user__add-info">
      <div class="user__add-info-form">
        <h2>Данные сотрудника</h2>

        <form>

          <div class="user__add-group">
            <input
              type="text"
              placeholder="Имя"
              v-model="name"
              :class="{
                  invalid:
                    ($v.name.$dirty && !$v.name.required) ||
                    ($v.name.$dirty && !$v.name.minLength),
                }"
            />
            <small
              class="error"
              v-if="$v.name.$dirty && !$v.name.required"
            >Введите имя</small>
            <small
              class="error"
              v-else-if="$v.name.$dirty && !$v.name.minLength"
            >
              Имя должен содержать минимум {{ $v.name.$params.minLength.min }} символов. Сейчас он {{ name.length }}
            </small>
          </div>
          <div class="user__add-group">
            <input
              type="text"
              placeholder="Email"
              v-model="email"
              onfocus="this.removeAttribute('readonly');"
              readonly
              :class="{
                  invalid:
                    ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email),
                }"
            />
            <small
              class="error"
              v-if="$v.email.$dirty && !$v.email.required"
            >Поле Email не должно быть пустым</small>
            <small
              class="error"
              v-else-if="$v.email.$dirty && !$v.email.email"
            >Введите коректый Email</small>
          </div>
          <div class="user__add-group">
            <input
              type="text"
              placeholder="Телефонный номер"
              v-model="phone"
              onfocus="this.removeAttribute('readonly');"
              readonly
              :class="{ invalid:($v.phone.$dirty && !$v.phone.required) }"
            />
            <small
              class="error"
              v-if="$v.phone.$dirty && !$v.phone.required"
            >Введите номер телефона</small>
          </div>
          <div class="user__add-group">
            <input
              :type="type"
              placeholder="Пароль"
              v-model="password"
              onfocus="this.removeAttribute('readonly');"
              readonly
              :class="{
                  invalid:
                    ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength),
                }"
            />
            <small
              class="error"
              v-if="$v.password.$dirty && !$v.password.required"
            >Введите пароль</small>
            <small
              class="error"
              v-else-if="$v.password.$dirty && !$v.password.minLength"
            >
              Пароль должен быть {{ $v.password.$params.minLength.min }} символов. Сейчас он {{ password.length }}
            </small>
            <span
              v-if="type === 'text'"
              class="visible"
              @click="type = 'password'"
            >
              <svg
                version="1.1"
                id="Capa_1"
                width="34"
                height="34"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 469.44 469.44"
                style="enable-background:new 0 0 469.44 469.44;"
                xml:space="preserve"
              >
                <path
                  fill="#B4B8CC"
                  d="M231.147,160.373l67.2,67.2l0.32-3.52c0-35.307-28.693-64-64-64L231.147,160.373z"
                />
                <path
                  fill="#B4B8CC"
                  d="M234.667,117.387c58.88,0,106.667,47.787,106.667,106.667c0,13.76-2.773,26.88-7.573,38.933l62.4,62.4c32.213-26.88,57.6-61.653,73.28-101.333c-37.013-93.653-128-160-234.773-160c-29.867,0-58.453,5.333-85.013,14.933l46.08,45.973C207.787,120.267,220.907,117.387,234.667,117.387z"
                />
                <path
                  fill="#B4B8CC"
                  d="M21.333,59.253l48.64,48.64l9.707,9.707C44.48,145.12,16.64,181.707,0,224.053c36.907,93.653,128,160,234.667,160c33.067,0,64.64-6.4,93.547-18.027l9.067,9.067l62.187,62.293l27.2-27.093L48.533,32.053L21.333,59.253z M139.307,177.12l32.96,32.96c-0.96,4.587-1.6,9.173-1.6,13.973c0,35.307,28.693,64,64,64c4.8,0,9.387-0.64,13.867-1.6l32.96,32.96c-14.187,7.04-29.973,11.307-46.827,11.307C175.787,330.72,128,282.933,128,224.053C128,207.2,132.267,191.413,139.307,177.12z"
                />
              </svg>
            </span>
            <span
              v-if="type === 'password'"
              class="visible"
              @click="type = 'text'"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1484 17C13.1484 17.9863 13.5402 18.9322 14.2376 19.6296C14.935 20.327 15.8809 20.7188 16.8672 20.7188C17.8535 20.7188 18.7993 20.327 19.4967 19.6296C20.1942 18.9322 20.5859 17.9863 20.5859 17C20.5859 16.0137 20.1942 15.0678 19.4967 14.3704C18.7993 13.673 17.8535 13.2812 16.8672 13.2812C15.8809 13.2812 14.935 13.673 14.2376 14.3704C13.5402 15.0678 13.1484 16.0137 13.1484 17ZM31.284 16.1434C28.1363 9.5127 23.3783 6.17578 17 6.17578C10.6184 6.17578 5.86368 9.51269 2.71602 16.1467C2.58977 16.414 2.52429 16.706 2.52429 17.0017C2.52429 17.2973 2.58977 17.5893 2.71602 17.8566C5.86368 24.4873 10.6217 27.8242 17 27.8242C23.3816 27.8242 28.1363 24.4873 31.284 17.8533C31.5397 17.3154 31.5397 16.6912 31.284 16.1434ZM16.8672 22.8438C13.6399 22.8438 11.0234 20.2273 11.0234 17C11.0234 13.7727 13.6399 11.1562 16.8672 11.1562C20.0945 11.1562 22.7109 13.7727 22.7109 17C22.7109 20.2273 20.0945 22.8438 16.8672 22.8438Z"
                  fill="#B4B8CC"
                />
              </svg>
            </span>
          </div>
          <div class="user__add-group">
            <Select
                :options="roles"
                :value="role"
                :optionId="'id'"
                :optionValue="'name'"
                id="projects"
                @change="e => role = e"
                :class="{ invalid: ($v.role.$dirty && $v.role.$model.name == '')}"
            />
            <label
                for="projects"
                :class="{focus: !(role.name === ''), invalid: ($v.role.$dirty && $v.role.$model.name == '')}"

            >
              Выберите роль
            </label>
            <small
              class="error"
              v-if="$v.role.$dirty && $v.role.$model.name == ''"
            >Выберите роль</small>
          </div>
        </form>
      </div>

    </div>
    <div class="user__add-workDays">
      <div class="user__add-workDays-form">
        <h2>График сотрудника</h2>
        <form @submit.prevent="submitHandler">
          <div class="user__add-group">
            <label>Начало работы</label>
            <vue-timepicker
              :minute-interval="5"
              v-model="work_start_time"
              placeholder="Начало работы"
              :class="{ invalid: ($v.work_start_time.$dirty && !$v.work_start_time.required)}"
            ></vue-timepicker>
            <small
              class="error"
              v-if="$v.work_start_time.$dirty && !$v.work_start_time.required"
            >Выберите начало работы</small>
          </div>

          <div class="user__add-group">
            <label>Завершение работы</label>
            <vue-timepicker
              :minute-interval="5"
              v-model="work_end_time"
              placeholder="Завершение работы"
              :class="{ invalid: ($v.work_end_time.$dirty && !$v.work_end_time.required)}"
            ></vue-timepicker>
            <small
              class="error"
              v-if="$v.work_end_time.$dirty && !$v.work_end_time.required"
            >Выберите завершение работы</small>
          </div>

          <div class="user__add-group">
            <label>Начало перерыва</label>
            <vue-timepicker
              :minute-interval="5"
              v-model="pause_start_time"
              placeholder="Начало перерыва"
              :class="{ invalid: ($v.pause_start_time.$dirty && !$v.pause_start_time.required)}"
            ></vue-timepicker>
            <small
              class="error"
              v-if="$v.pause_start_time.$dirty && !$v.pause_start_time.required"
            >Выберите начало перерыва</small>
          </div>

          <div class="user__add-group">
            <label>Завершение перерыва</label>
            <vue-timepicker
              :minute-interval="5"
              v-model="pause_end_time"
              placeholder="Завершение перерыва"
              :class="{ invalid: ($v.pause_end_time.$dirty && !$v.pause_end_time.required)}"
            ></vue-timepicker>
            <small
              class="error"
              v-if="$v.pause_end_time.$dirty && !$v.pause_end_time.required"
            >Выберите завершение перерыва</small>
          </div>
          <div class="user__add-checkbox">
            <input
              type="checkbox"
              id="working_days_1"
              v-model.number="working_days"
              value="1"
            >
            <label for="working_days_1">ПН</label>

            <input
              type="checkbox"
              id="working_days_2"
              v-model.number="working_days"
              value="2"
            >
            <label for="working_days_2">ВТ</label>

            <input
              type="checkbox"
              id="working_days_3"
              v-model.number="working_days"
              value="3"
            >
            <label for="working_days_3">СР</label>

            <input
              type="checkbox"
              id="working_days_4"
              v-model.number="working_days"
              value="4"
            >
            <label for="working_days_4">ЧТ</label>

            <input
              type="checkbox"
              id="working_days_5"
              v-model.number="working_days"
              value="5"
            >
            <label for="working_days_5">ПТ</label>

            <input
              type="checkbox"
              id="working_days_6"
              v-model.number="working_days"
              value="6"
            >
            <label for="working_days_6">СБ</label>

            <input
              type="checkbox"
              id="working_days_7"
              v-model.number="working_days"
              value="7"
            >
            <label for="working_days_7">ВС</label>
            <small
              class="error"
              v-if="$v.working_days.$dirty && !$v.working_days.required"
            >Выберите дни недели</small>

          </div>

        </form>
      </div>

    </div>
    <div class="user__add-submit">
      <button
        class="cancel"
        type="submit"
      >Отменить изменения</button>
      <button
        class="add"
        @click.prevent="submitHandler"
        type="submit"
      >Создать</button>
    </div>
  </div>
</template>
<script>
import VueTimepicker from "vue2-timepicker";
import { email, minLength, required } from "vuelidate/lib/validators";
import Select from "@/components/Select";
export default {
  data() {
    return {
      name: null,
      phone: "",
      email: null,
      password: null,
      work_start_time: "09:00",
      work_end_time: "18:00",
      pause_start_time: "13:00",
      pause_end_time: "14:00",
      working_days: [1, 2, 3, 4, 5],
      role: {
        id: 0,
        name: "",
      },
      color: ["#8F73FC", "#fcb573", "#fc73ad"],
      type: "password",
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchRoles");
  },

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    name: { required, minLength: minLength(4) },
    phone: { required },
    role: { required },
    work_start_time: { required },
    work_end_time: { required },
    pause_start_time: { required },
    pause_end_time: { required },
    working_days: { required },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid || this.$v.role.$model.name === "Выберите роль") {
        this.$v.$touch();
        return;
      }
      const formData = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password,
        work_start_time: this.work_start_time,
        work_end_time: this.work_end_time,
        pause_start_time: this.pause_start_time,
        pause_end_time: this.pause_end_time,
        role: this.role.name,
        working_days: this.working_days,
        color: this.color[this.randomInteger(0, 2)],
      };
      console.log(formData);
      try {
        await this.$store.dispatch("createUserCredentials", formData);
        await this.$router.push("/users");
        this.$store.commit("setNotification", "user-add-success");
      } catch (e) {}
    },
    randomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
  },
  computed: {
    roles() {
      return this.$store.getters.getRoles;
    },
  },
  components: { VueTimepicker, Select },
};
</script>
<style lang="scss">
@import "@/assets/scss/pages/user/app";
@import "~vue2-timepicker/dist/VueTimepicker.css";
</style>
