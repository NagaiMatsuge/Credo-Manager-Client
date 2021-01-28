<template>
  <div class="server__ftp">
    <div class="server__ftp-title">
      FTP {{ type_id }}
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
    }
  }


}
</script>