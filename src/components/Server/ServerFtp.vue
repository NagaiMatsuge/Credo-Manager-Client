<template>
  <div class="server__ftp">
    <div class="server__ftp-title">
      FTP
    </div>
    <div class="server__ftp-group">
      <input
          type="text"
          id="host_ftp"
          v-model="ftp.host"
          :disabled="blocked"
          :class="{
            invalid:
            (validator.ftp_access.host.$dirty && !validator.ftp_access.host.required) ||
            (validator.ftp_access.host.$dirty && !validator.ftp_access.host.minLength),
          }"
      >
      <label for="host_ftp" :class="{focus: !(ftp.host === '')}">Введите хост</label>
      <small
          class="error"
          v-if="validator.ftp_access.host.$dirty && !validator.ftp_access.host.required"
      >Введите хост</small>
      <small
          class="error"
          v-else-if="validator.ftp_access.host.$dirty && !validator.ftp_access.host.minLength"
      >
        Название хост должен содержать минимум {{ validator.ftp_access.host.$params.minLength.min }} символов. Сейчас он
        {{ ftp.host.length }}
      </small>
    </div>
    <div class="server__ftp-group">
      <input
          type="text"
          id="title_ftp"
          v-model="ftp.port"
          :disabled="blocked"
          :class="{
            invalid:
            (validator.ftp_access.port.$dirty && !validator.ftp_access.port.required)
          }"
      >
      <label for="title_ftp" :class="{focus: !(ftp.port === '')}">Порт</label>
      <small
          class="error"
          v-if="validator.ftp_access.port.$dirty && !validator.ftp_access.port.required"
      >Введите Порт</small>
    </div>
    <div class="server__ftp-group">
      <input
          type="text"
          id="login_ftp"
          v-model="ftp.login"
          :disabled="blocked"
          :class="{
            invalid:
            (validator.ftp_access.login.$dirty && !validator.ftp_access.login.required) ||
            (validator.ftp_access.login.$dirty && !validator.ftp_access.login.minLength),
          }"
      >
      <label for="login_ftp" :class="{focus: !(ftp.login === '')}">Пользователь</label>
      <small
          class="error"
          v-if="validator.ftp_access.login.$dirty && !validator.ftp_access.login.required"
      >Введите имя пользователя</small>
      <small
          class="error"
          v-else-if="validator.ftp_access.login.$dirty && !validator.ftp_access.login.minLength"
      >
        Имя пользователя должен содержать минимум {{ validator.ftp_access.login.$params.minLength.min }} символов.
        Сейчас он
        {{ ftp.login.length }}
      </small>
    </div>
    <div class="server__ftp-group">
      <div class="generator" @click="ftp.password = generatePassword()">
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
          id="password_ftp"
          v-model="ftp.password"
          :class="{
            invalid:
            (validator.ftp_access.password.$dirty && !validator.ftp_access.password.required) ||
            (validator.ftp_access.password.$dirty && !validator.ftp_access.password.minLength),
          }"
      >

      <label for="password_ftp" :class="{focus: !(ftp.password === '')}">Введите пароль</label>
      <small
          class="error"
          v-if="validator.ftp_access.password.$dirty && !validator.ftp_access.password.required"
      >Введите пароль</small>
      <small
          class="error"
          v-else-if="validator.ftp_access.password.$dirty && !validator.ftp_access.password.minLength"
      >
        Пароль должен содержать минимум {{ validator.ftp_access.password.$params.minLength.min }} символов. Сейчас он
        {{ ftp.password.length }}
      </small>
    </div>
    <div class="server__ftp-group full">
      <textarea id="desc" v-model="ftp.description"
                :class="{
          invalid:
          (validator.ftp_access.description.$dirty && !validator.ftp_access.description.required) ||
          (validator.ftp_access.description.$dirty && !validator.ftp_access.description.minLength),
        }"
      ></textarea>
      <label for="desc" :class="{focus: !(ftp.description === '')}">Описание</label>
      <small
          class="error"
          v-if="validator.ftp_access.description.$dirty && !validator.ftp_access.description.required"
      >Введите Описание</small>
      <small
          class="error"
          v-else-if="validator.ftp_access.description.$dirty && !validator.ftp_access.description.minLength"
      >
        Описание должено содержать минимум {{ validator.ftp_access.description.$params.minLength.min }} символов. Сейчас
        он
        {{ ftp.description.length }}
      </small>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SelectForm',
  data() {
    return {
      type: {
        id: 0,
        title: ''
      }
    }
  },
  props: {
    ftp: {},
    validator: {},
    type_id: Number,
    blocked: Boolean
  },
  watch: {
    type_id: {
      handler(newValue) {
        if (newValue === 1) {
          this.autoGenerator()
        }else {
          this.cls()
        }
      },
      deep: true
    },
  },
  mounted() {
    if (this.type_id === 1){
      this.autoGenerator()
    }
  },
  methods: {
    generatePassword() {
      let length = 20,
          charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    },
    autoGenerator(){
      this.ftp.port = '21'
      this.ftp.host = '192.168.0.106'
      this.ftp.login = this.generatePassword()
      this.ftp.password = this.generatePassword()
      this.ftp.description = `Это Ftp доступы Нашего сервера`
    },
    cls(){
      this.ftp.port = ''
      this.ftp.host = ''
      this.ftp.login = ''
      this.ftp.password = ''
      this.ftp.description = ``
    }
  }


}
</script>