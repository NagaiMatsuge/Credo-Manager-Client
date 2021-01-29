<template>
  <div class="server__db">
    <div class="server__db-title">
      DB
    </div>
    <div class="server__db-group">
      <input
          type="text"
          id="host_db"
          v-model="db.host"
          :disabled="blocked"
          :class="{
            invalid:
            (validator.db_access.host.$dirty && !validator.db_access.host.required) ||
            (validator.db_access.host.$dirty && !validator.db_access.host.minLength),
          }"
      >
      <label for="host_db" :class="{focus: !(db.host === '')}">Хост</label>
      <small
          class="error"
          v-if="validator.db_access.host.$dirty && !validator.db_access.host.required"
      >Введите хост</small>
      <small
          class="error"
          v-else-if="validator.db_access.host.$dirty && !validator.db_access.host.minLength"
      >
        Название хост должен содержать минимум {{ validator.db_access.host.$params.minLength.min }} символов. Сейчас он
        {{ db.host.length }}
      </small>
    </div>
    <div class="server__db-group">
      <input
          type="text"
          id="title_db"
          v-model="db.db_name"
          :disabled="blocked"
          :class="{
            invalid:
            (validator.db_access.db_name.$dirty && !validator.db_access.db_name.required) ||
            (validator.db_access.db_name.$dirty && !validator.db_access.db_name.minLength),
          }"
      >
      <label for="title_db" :class="{focus: !(db.db_name === '')}">Имя базы данных</label>
      <small
          class="error"
          v-if="validator.db_access.db_name.$dirty && !validator.db_access.db_name.required"
      >Введите имя базы данных</small>
      <small
          class="error"
          v-else-if="validator.db_access.db_name.$dirty && !validator.db_access.db_name.minLength"
      >
        Имя базы данных должен содержать минимум {{ validator.db_access.db_name.$params.minLength.min }} символов. Сейчас он
        {{ db.db_name.length }}
      </small>
    </div>
    <div class="server__db-group">
      <input
          type="text"
          id="db_name"
          :disabled="blocked"
          v-model="db.login"
          :class="{
            invalid:
            (validator.db_access.login.$dirty && !validator.db_access.login.required) ||
            (validator.db_access.login.$dirty && !validator.db_access.login.minLength),
          }"
      >
      <label for="db_name" :class="{focus: !(db.login === '')}">Логин</label>
      <small
          class="error"
          v-if="validator.db_access.login.$dirty && !validator.db_access.login.required"
      >Введите логин</small>
      <small
          class="error"
          v-else-if="validator.db_access.login.$dirty && !validator.db_access.login.minLength"
      >
        Логин должен содержать минимум {{ validator.db_access.login.$params.minLength.min }} символов. Сейчас он
        {{ db.login.length }}
      </small>
    </div>
    <div class="server__db-group">
      <div class="generator" @click="db.password = generatePassword()">
        <svg id="_x31__x2C_5" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512"
             xmlns="http://www.w3.org/2000/svg">
          <path d="m11.25 20h-9c-1.24 0-2.25-1.01-2.25-2.25v-8.5c0-1.24 1.01-2.25 2.25-2.25h11.5c1.24 0 2.25 1.01 2.25 2.25v3c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3c0-.413-.337-.75-.75-.75h-11.5c-.413 0-.75.337-.75.75v8.5c0 .413.337.75.75.75h9c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
          <path d="m12.25 8.5c-.414 0-.75-.336-.75-.75v-2.75c0-1.93-1.57-3.5-3.5-3.5s-3.5 1.57-3.5 3.5v2.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-2.75c0-2.757 2.243-5 5-5s5 2.243 5 5v2.75c0 .414-.336.75-.75.75z"/>
          <path d="m23.25 18h-2c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25v-1.25c0-.414.336-.75.75-.75s.75.336.75.75v2c0 .414-.336.75-.75.75z"/>
          <path d="m14.75 23.5c-.414 0-.75-.336-.75-.75v-2c0-.414.336-.75.75-.75h2c.414 0 .75.336.75.75s-.336.75-.75.75h-1.25v1.25c0 .414-.336.75-.75.75z"/>
          <path d="m14.94 18.5c-.072 0-.146-.011-.218-.032-.396-.121-.62-.54-.5-.936.643-2.113 2.563-3.532 4.778-3.532 1.85 0 3.537 1.015 4.403 2.648.193.366.054.82-.312 1.015-.369.191-.82.054-1.015-.312-.603-1.142-1.783-1.851-3.076-1.851-1.55 0-2.893.992-3.342 2.468-.098.324-.396.532-.718.532z"/>
          <path d="m19 24c-1.85 0-3.537-1.015-4.403-2.648-.193-.366-.054-.82.312-1.015.368-.192.82-.054 1.015.312.603 1.142 1.783 1.851 3.076 1.851 1.541 0 2.885-.993 3.344-2.473.123-.395.542-.617.938-.493.396.122.616.543.493.938-.654 2.11-2.573 3.528-4.775 3.528z"/>
        </svg>
      </div>
      <input
          type="text"
          id="password"
          v-model="db.password"
          :class="{
            invalid:
            (validator.db_access.password.$dirty && !validator.db_access.password.required) ||
            (validator.db_access.password.$dirty && !validator.db_access.password.minLength),
          }"
      >
      <label for="password" :class="{focus: !(db.password === '')}">Введите пароль</label>
      <small
          class="error"
          v-if="validator.db_access.password.$dirty && !validator.db_access.password.required"
      >Введите пароль</small>
      <small
          class="error"
          v-else-if="validator.db_access.password.$dirty && !validator.db_access.password.minLength"
      >
        Пароль должен содержать минимум {{ validator.db_access.password.$params.minLength.min }} символов. Сейчас он
        {{ db.password.length }}
      </small>
    </div>
    <div class="server__db-group full">
      <textarea id="desc_db" v-model="db.description"
                :class="{
          invalid:
          (validator.db_access.description.$dirty && !validator.db_access.description.required) ||
          (validator.db_access.description.$dirty && !validator.db_access.description.minLength),
        }"
      ></textarea>
      <label for="desc_db" :class="{focus: !(db.description === '')}">Описание</label>
      <small
          class="error"
          v-if="validator.db_access.description.$dirty && !validator.db_access.description.required"
      >Введите Описание</small>
      <small
          class="error"
          v-else-if="validator.db_access.description.$dirty && !validator.db_access.description.minLength"
      >
        Описание должено содержать минимум {{ validator.db_access.description.$params.minLength.min }} символов. Сейчас он
        {{ db.description.length }}
      </small>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SelectForm',
  data(){
    return{
      type: {
        id: 0,
        title: ''
      },
    }
  },
  props:{
    db:{},
    validator:{},
    type_id: Number,
    blocked: Boolean,
    host: String
  },
  watch: {
    type_id: {
      handler(newValue) {
        if (newValue === 1) {
          this.autoGenerator()
        }else{
          this.cls()
        }
      },
      deep: true
    },
    host: {
      handler(newValue) {
        this.db.db_name = newValue.replace(/[^a-zA-Z ]/g, "")
        this.db.login = newValue.replace(/[^a-zA-Z ]/g, "")
      },
      deep: true
    },

  },
  mounted() {
    if (this.type_id === 1) {
      this.autoGenerator()
    }
  },
  methods: {
    generatePassword() {
      var length = 20,
          charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    },

    autoGenerator(){
      this.db.host = "192.168.0.106"
      this.db.db_name = (this.validator.server.host.$model).replace(/[^a-zA-Z ]/g, "")
      this.db.login = (this.validator.server.host.$model).replace(/[^a-zA-Z ]/g, "")
      this.db.password = this.generatePassword()
      this.db.description = `Это DB доступы Нашего сервера`
    },
    cls(){
      this.db.host = ''
      this.db.db_name = ''
      this.db.login = ''
      this.db.password = ''
      this.db.description = ''
    }
  }
}
</script>
