<template>
  <div class="content">
    <div class="content__login">
      <h1>Сброс пароля</h1>
      <form>
        <input
          type="text"
          placeholder="Логин или email"
        />
        <button>СБРОСИТЬ ПАРОЛЬ</button>
      </form>
    </div>
    <div class="empty__footer">
      <router-link to="/login">Войти в аккаунт</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "password-reset",
};
</script>
<style scoped lang='scss'>
@import "../../assets/scss/auth/login.scss";
</style>