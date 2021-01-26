<template>
  <div class="main__layout" v-if="user" :class="{dark__theme: user.theme === 'dark'}">
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
      Echo.channel(`new-message-to-${this.user.id}`).listen("NewMessage", (e)=>{
        console.log(e)
        let pushDataToLocalChat = {
          color: e.user.color,
          photo: e.user.photo,
          name: e.user.name,
          user_id: e.user.id,
          content: [
            {
              text: e.message,
              files: e.files
            }
          ]
        }
        if(e.task_id === this.chat_id){
          if (this.chat.data.length){
            if (this.chat.data[this.chat.data.length - 1].user_id === e.user.id){
              this.chat.data[this.chat.data.length - 1].content.push({text: e.message, files: e.files})
            }else{
              this.chat.data.push(pushDataToLocalChat)
            }
          }else {
            this.chat.data.push(pushDataToLocalChat)
          }
          this.$store.dispatch('userHasReadMessages', e.task_id)
        }else{
          if (this.user.role === 'Admin'){
            let data = this.tasks.data
            let keys = Object.keys(data)
            for (let i = 0; i < keys.length; i++) {
              let el = data[keys[i]]

              if (el.tasks.active.length !== 0){
                if(el.tasks.active[0].id === e.task_id){
                  el.tasks.active[0].unread_count++
                }
              }
              if ( el.tasks.inactive.length !== 0){
                for (let j = 0; j < el.tasks.inactive.length; j++) {
                  let elm = el.tasks.inactive[j]
                  if (elm.id === e.task_id){
                    elm.unread_count++
                  }
                }
              }else{}
            }
          }else{
            if(this.tasks.data.tasks.active[0].id === e.task_id){
              this.tasks.data.tasks.active[0].unread_count++
            }else{
              for (let i = 0; i < this.tasks.data.tasks.inactive; i++) {
                let el = this.tasks.data.tasks.inactive[i]
                if (el.id === e.task_id){
                  el.unread_count++
                }
              }
            }
          }
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
    tasks(){
      return this.$store.getters.getTasks
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
