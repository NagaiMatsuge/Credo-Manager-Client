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


        </div>
        <UserList v-if="users && userId" :users="users" :userId="userId" />
        <div class="about__add" v-if="userId.role === 'Admin'">
            <div class="about__add-pagination pagination" v-if="users && users.last_page > 1">
              <paginate
                  :page-count="users.last_page"
                  :prev-text="''"
                  :next-text="''"
                  :clickHandler="paginationLink"
              >
              </paginate>
            </div>
            <div class="add__button">
              <button @click.prevent="$router.push('/user-add')" type="submit">Добавить сотрудника</button>
            </div>
        </div>
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
  methods:{
    async paginationLink(url) {
        await this.$store.dispatch('paginationLink', {url:this.users.links[url].url, name: "user"})
        await this.users
    },
  },
  computed:{
    users(){
      return this.$store.getters.getUsersCredentials
    },
    userId(){
      return this.$store.getters.getUserCredentials
    }
  },
  components:{
    UserList
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/pages/user/app";
</style>