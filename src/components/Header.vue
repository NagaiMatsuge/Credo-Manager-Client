<template>
  <div class="header">
    <div class="page_info">
      <div v-if="breadcrumbs" class="page_subtitle">
        <router-link :to="breadcrumbs.parent.path">
          {{ breadcrumbs.parent.title }}
        </router-link>
        <span>»{{ breadcrumbs.child }}</span>
      </div>
      <div class="page_title">
        <div  class="back_icon">
          <router-link v-if="breadcrumbs" :to="breadcrumbs.parent.path">
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="1" width="20" height="22" rx="3.5" fill="white"/>
              <path d="M6.54038 11.5404C6.28654 11.7942 6.28654 12.2058 6.54038 12.4596L10.677 16.5962C10.9308 16.85 11.3424 16.85 11.5962 16.5962C11.85 16.3424 11.85 15.9308 11.5962 15.677L7.91924 12L11.5962 8.32304C11.85 8.0692 11.85 7.65765 11.5962 7.40381C11.3424 7.14996 10.9308 7.14997 10.677 7.40381L6.54038 11.5404ZM8 11.35L7 11.35L7 12.65L8 12.65L8 11.35Z" fill="#282B3D"/>
              <rect x="0.5" y="1" width="20" height="22" rx="3.5" stroke="#B4B8CC"/>
            </svg>
          </router-link>
          <div class="page_name">{{title}}</div>
        </div>
      </div>
    </div>
    <div class="user_info">
      <div class="controls">
        <div class="notifications" >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9375 15H15.4688V8.35938C15.4688 5.60352 13.4316 3.32422 10.7812 2.94531V2.1875C10.7812 1.75586 10.4316 1.40625 10 1.40625C9.56836 1.40625 9.21875 1.75586 9.21875 2.1875V2.94531C6.56836 3.32422 4.53125 5.60352 4.53125 8.35938V15H4.0625C3.7168 15 3.4375 15.2793 3.4375 15.625V16.25C3.4375 16.3359 3.50781 16.4062 3.59375 16.4062H7.8125C7.8125 17.6133 8.79297 18.5938 10 18.5938C11.207 18.5938 12.1875 17.6133 12.1875 16.4062H16.4062C16.4922 16.4062 16.5625 16.3359 16.5625 16.25V15.625C16.5625 15.2793 16.2832 15 15.9375 15ZM10 17.3438C9.48242 17.3438 9.0625 16.9238 9.0625 16.4062H10.9375C10.9375 16.9238 10.5176 17.3438 10 17.3438Z"
              fill="#B4B8CC"
            />
          </svg>
        </div>
        <div class="theme" @click="themeEvent">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.1626 12.1625C15.5806 12.7763 13.8542 12.9168 12.1937 12.567C10.5333 12.2171 9.01034 11.392 7.81044 10.1921C6.61053 8.9922 5.78542 7.46928 5.43559 5.80882C5.08575 4.14835 5.22628 2.42199 5.84007 0.839966C3.93979 1.58053 2.35773 2.96136 1.36704 4.74407C0.376355 6.52677 0.0392264 8.59945 0.413863 10.6042C0.7885 12.609 1.85139 14.4201 3.41901 15.7247C4.98663 17.0293 6.96059 17.7456 9.00007 17.75C10.7654 17.7504 12.4896 17.2171 13.9463 16.2199C15.4031 15.2227 16.5242 13.8083 17.1626 12.1625Z"
              fill="#B4B8CC"
            />
          </svg>
        </div>
      </div>
      <div class="user_credentials" @click="dropdown = !dropdown">
        <div class="user_image">
          <img
            v-if="user.photo"
            :src="domain + user.photo"
            alt=""
          >
          <div v-else class="user__img" :style="`background: ${user.color};`">
            {{user.name.charAt(0).toUpperCase() || '--'}}
          </div>
        </div>
        <div class="user_details">
          <div class="user_name">{{user.name}}
            <svg
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.14645 5.85355C4.34171 6.04882 4.65829 6.04882 4.85355 5.85355L8.03553 2.67157C8.2308 2.47631 8.2308 2.15973 8.03553 1.96447C7.84027 1.7692 7.52369 1.7692 7.32843 1.96447L4.5 4.79289L1.67157 1.96447C1.47631 1.7692 1.15973 1.7692 0.964466 1.96447C0.769204 2.15973 0.769204 2.47631 0.964466 2.67157L4.14645 5.85355ZM4 4.5L4 5.5L5 5.5L5 4.5L4 4.5Z"
                fill="#575A64"
              />
            </svg>
          </div>
          <div class="user_role">{{user.role}}</div>
          <div class="header__dropdown" v-if="dropdown">
            <ul>
              <li>
                <router-link to="/user-settings">Настройка аккаунта</router-link>
              </li>
              <li @click.prevent="logout">
                <a href="#!">Выход</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from "@/components/DropDown";
export default {
  data() {
    return {
      dropdown: false,
      domain: process.env.VUE_APP_DOMAIN,
      theme: false,
    };
  },
  props: {
    user: {},
    title: null,
    breadcrumbs: null
  },
  components: {
    DropDown,
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      await this.$router.push("/login");
      this.$store.commit('setNotification', 'logout')
      localStorage.clear();
    },
    themeEvent(){

      if(this.user.theme === 'light'){
        this.user.theme = 'dark';
        this.$store.dispatch('theme', 'dark')
      }else{
        this.user.theme = 'light';
        this.$store.dispatch('theme', 'light')
      }
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/header";
</style>