<template>
  <div>
    <div class="content">
      <div class="content__login">
        <h1>Вход в аккаунт</h1>
        <form @submit.prevent="submitHandler">
          <div class="content__login-group">
            <input
              type="text"
              placeholder="Логин или email"
              v-model.trim="email"
              :class="{
                invalid:
                  ($v.email.$dirty && !$v.email.required) ||
                  ($v.email.$dirty && !$v.email.email),
              }"
            />
            <small class="erorr" v-if="$v.email.$dirty && !$v.email.required"
              >Поле Email не должно быть пустым</small
            >
            <small class="erorr" v-else-if="$v.email.$dirty && !$v.email.email"
              >Введите коректый Email</small
            >
          </div>
          <div class="content__login-group">
            <input
              type="password"
              placeholder="Пароль"
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
              >Введите пароль</small
            >
            <small
              class="erorr"
              v-else-if="$v.password.$dirty && !$v.password.minLength"
              >Пароль должен быть
              {{ $v.password.$params.minLength.min }} символов. Сейчас он
              {{ password.length }}</small
            >
          </div>
          <div class="content__login-relog">
            <router-link to="/password-reset">Забыли пороль?</router-link>
          </div>
          <button>ВОЙТИ</button>
        </form>
      </div>
      <div class="empty__footer">
        <span>Credo Studio© 2020 Credo</span>
      </div>
    </div>
  </div>
</template>
<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      console.log(formData);
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/auth/login.scss";
</style>
