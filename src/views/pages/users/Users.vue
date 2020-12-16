<template>
  <div>
      <div class="about__app">
        <div class="about__info">
          <div class="about__info-user-name">Пользователи</div>
          <div class="about__info-user-rol">Роль</div>
          <div class="about__info-user-email">Email</div>
          <div class="about__info-user-tel">Телефон</div>
        </div>
        <div class="about__container">
          <div class="about__add">
            <form>
              <div class="about__info-user-name">
              </div>
              <div class="about__info-user-rol">
              </div>
              <div class="about__info-user-email">
              </div>
              <div class="about__info-user-tel">
                <button @click.prevent="$router.push('/user-add')" type="submit">Добавить сотрудника</button>
              </div>
            </form>
          </div>
        </div>
        <UserList v-if="users" :users="users" />
      </div>
  </div>
</template>
<script>
import UserList from "@/components/Users/UserList";
export default {
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch('fetchUsersCredentials')
  },
  computed:{
    users(){
      return this.$store.getters.getUsersCredentials
    }
  },
  components:{
    UserList
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/pages/users";
</style>