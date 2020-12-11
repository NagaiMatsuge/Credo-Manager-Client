<template>
  <div class="content">
    <div class="content__login">
      <h1>Сброс пароля</h1>
      <form @submit.prevent="passwordReset">
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
        >Поле Email не должно быть пустым</small>
        <small class="erorr" v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите коректый Email</small>
        <button>Отправить</button>
      </form>
    </div>
    <div class="empty__footer">
      <router-link to="/login">Войти в аккаунт</router-link>
    </div>
  </div>
</template>
<script>
import {email, required} from "vuelidate/lib/validators";

export default {
  name: "password-reset",
  data(){
    return{
      email: ""
    }
  },
  validations: {
    email: { email, required },
  },
  methods:{
    async passwordReset(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
      };
      try {
        this.$store.dispatch("passwordReset", formData)
      } catch (e) {}
    }
  }
};
</script>
<style scoped lang='scss'>
@import "../../assets/scss/auth/login.scss";
</style>