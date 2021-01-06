<template>
  <div class="main__layout">
    <Sidebar />
    <div class="content">
      <Header
        v-if="user && title"
        :user="user"
        :title="title"
        :breadcrumbs="breadcrumbs"
      />
      <div class="_container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
export default {
  name: "MainLayouts",
  data() {
    return {};
  },
  components: {
    Sidebar,
    Header,
  },
  async mounted() {
    if (!this.$store.getters.getUserCredentials) {
      await this.$store.dispatch("fetchUserCredentials");
    }
    if (this.user){
      console.log('start')
      Echo.channel(`new-message-to-${this.user.id}`).listen("NewMessage", (e)=>{
        // let getters = this.$store.getters
        // this.$store.commit('updateChat', {data:{e, id: this.id}, getters}, )
        let pushDataToLocalChat = {
          color: this.user.color,
          photo: this.user.photo,
          name: this.user.name,
          user_id: this.user.id,
          content: [
            {
              text: e.message
            }
          ]
        }
        if(e.task_id === this.chat_id){
          if (this.chat.data[this.chat.data.length - 1].user_id === this.user.id){
            this.chat.data[this.chat.data.length - 1].content.push({text: e.message})
          }else{
            this.chat.data.push(pushDataToLocalChat)
          }
        }else{
          console.log('nochat')
        }
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUserCredentials;
    },
    title() {
      return this.$route.meta.title;
    },
    breadcrumbs() {
      return this.$route.meta.breadcrumb;
    },
    chat(){
      return this.$store.getters.chat
    },
    chat_id(){
      return this.$store.getters.chat_id
    }
  },
};
</script>
<style lang='scss'>
@import "@/assets/scss/layouts/main";
</style>
