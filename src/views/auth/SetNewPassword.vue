<template>
  <div>
    <div class="content">
      <div class="content__login">
        <h1>Введите новый пароль</h1>
        <form @submit.prevent="submitHandler">
          <div class="content__login-group">
            <input
                type="password"
                placeholder="Новый пароль"
                v-model.trim="password"
                :class="{
                invalid:
                  ($v.password.$dirty && !$v.password.required) ||
                  ($v.password.$dirty && !$v.password.minLength),
              }"
            />
            <small
                class="erorr"
                v-if="$v.password.$dirty && !$v.password.required"
            >Введите пароль</small>
            <small
                class="erorr"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
            >Пароль должен быть
              {{ $v.password.$params.minLength.min }} символов. Сейчас он
              {{ password.length }}</small>
          </div>
          <div class="content__login-group">
            <input
                type="password"
                placeholder="Подтвердите пароль"
                v-model.trim="confirmPassword"
                :class="{
                invalid:
                  ($v.confirmPassword.$dirty && !$v.confirmPassword.required) ||
                  ($v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword),
              }"
            />
            <small class="erorr" v-if="$v.confirmPassword.$dirty && !$v.password.required">Введите пароль</small>
            <small class="erorr" v-else-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword">Пароль не совпадает</small>
          </div>
          <div class="content__login-relog">
            <router-link to="/login">Войти в систему</router-link>
          </div>
          <button>Сменить пароль</button>
        </form>
      </div>
      <div class="empty__footer">
        <span>Credo Studio© 2020 Credo</span>
      </div>
    </div>
  </div>
</template>
<script>
import {  required, minLength, sameAs  } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      password: "",
      confirmPassword: "",
      token: this.$route.params.token
    };
  },
  validations: {
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAsPassword: sameAs('password') }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        password: this.password,
        token: this.token,
      };
      try {
        await this.$store.dispatch("SetNewPassword", formData);
        this.$router.push('/login')
      } catch (e) {}
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/auth/login.scss";
</style>
