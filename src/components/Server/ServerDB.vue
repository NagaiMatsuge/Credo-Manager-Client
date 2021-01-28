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
          :disabled="blocked || disabled"
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
          :disabled="blocked || disabled"
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
      >Введите название</small>
      <small
          class="error"
          v-else-if="validator.db_access.db_name.$dirty && !validator.db_access.db_name.minLength"
      >
        Название должен содержать минимум {{ validator.db_access.db_name.$params.minLength.min }} символов. Сейчас он
        {{ db.db_name.length }}
      </small>
    </div>
    <div class="server__db-group">
      <input
          type="text"
          id="db_name"
          :disabled="blocked || disabled"
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
      disabled: false
    }
  },
  props:{
    db:{},
    validator:{},
    type_id: Number,
    blocked: Boolean
  },
  watch: {
    type_id: {
      handler(newValue) {
        console.log(newValue)
        if (newValue === 1) {
          this.autoGenerator()
          this.disabled = true
        }
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
    }
  }
}
</script>
