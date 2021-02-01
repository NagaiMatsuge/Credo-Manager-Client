<template>
  <div class="task__card-container">
    <div class="task__card" v-for="(task, index) in taskId()" :key="index" >
      <div class="task__card-body">
        <div class="task__card-head" @click="task.hide = !task.hide">
          <div class="task__card-img">
            <img v-if="task.user.photo !== null" :src="domain +task.user.photo" alt="">
            <div v-else class="no-img" :style="`background: ${task.user.color};`">{{task.user.name.charAt(0).toUpperCase() || '--'}}</div>
          </div>
          <div class="task__card-name">
            <p>{{ task.user.name }}</p>
            <span>{{ task.user.role }}</span>
          </div>

        </div>
        <div class="task__body" v-if="task.tasks">
          <div class="task__body-title" style="margin-top: 15px;" v-if="task.tasks">Сейчас в работе</div>
          <div class="task__body-worked" v-if="task.tasks.active.length">
            <div class="task__body-pause" >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66666 2.22217C7.89396 2.22217 8.88889 3.21709 8.88889 4.44439L8.88888 15.5555C8.88888 16.7828 7.89396 17.7777 6.66666 17.7777C5.43936 17.7777 4.44444 16.7828 4.44444 15.5555L4.44444 4.44439C4.44444 3.21709 5.43936 2.22217 6.66666 2.22217Z" fill="#B4B8CC"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3333 2.22217C14.5606 2.22217 15.5556 3.21709 15.5556 4.44439L15.5556 15.5555C15.5556 16.7828 14.5606 17.7777 13.3333 17.7777C12.106 17.7777 11.1111 16.7828 11.1111 15.5555L11.1111 4.44439C11.1111 3.21709 12.106 2.22217 13.3333 2.22217Z" fill="#B4B8CC"/>
              </svg>
            </div>
            <div class="task__body-work-name">
              <p>{{ task.tasks.active[0].title }}</p>
              <span>{{ task.tasks.active[0].project.title }}</span>
            </div>
            <div class="task__body-time" >
              <span>{{ timeConvert(task.tasks.active[0].time) }}</span>
              <div>
                <button @click.prevent="getChat(task.tasks.active[0])">
                  <div class="count__message" v-if="task.tasks.active[0].unread_count">{{ task.tasks.active[0].unread_count }}</div>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8333 1.0835H2.16668C1.56922 1.0835 1.08334 1.56775 1.08334 2.1625V8.67116C1.08334 9.26591 1.56922 9.75016 2.16668 9.75016H3.79168V11.9168L7.2318 9.75016H10.8333C11.4308 9.75016 11.9167 9.26591 11.9167 8.67116V2.1625C11.9158 1.87584 11.8013 1.60124 11.5982 1.39895C11.3951 1.19666 11.12 1.08321 10.8333 1.0835Z" fill="#CBCFE6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="task__body-worked" v-else>
            <p>
              Нет активных задач
            </p>
          </div>
          <div class="task__body-not-worked" @click="task.active = !task.active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.33332 13.3332C8.79166 13.3332 9.16666 12.9582 9.16666 12.4998V7.49984C9.16666 7.0415 8.79166 6.6665 8.33332 6.6665C7.87499 6.6665 7.49999 7.0415 7.49999 7.49984V12.4998C7.49999 12.9582 7.87499 13.3332 8.33332 13.3332ZM9.99999 1.6665C5.39999 1.6665 1.66666 5.39984 1.66666 9.99984C1.66666 14.5998 5.39999 18.3332 9.99999 18.3332C14.6 18.3332 18.3333 14.5998 18.3333 9.99984C18.3333 5.39984 14.6 1.6665 9.99999 1.6665ZM9.99999 16.6665C6.32499 16.6665 3.33332 13.6748 3.33332 9.99984C3.33332 6.32484 6.32499 3.33317 9.99999 3.33317C13.675 3.33317 16.6667 6.32484 16.6667 9.99984C16.6667 13.6748 13.675 16.6665 9.99999 16.6665ZM11.6667 13.3332C12.125 13.3332 12.5 12.9582 12.5 12.4998V7.49984C12.5 7.0415 12.125 6.6665 11.6667 6.6665C11.2083 6.6665 10.8333 7.0415 10.8333 7.49984V12.4998C10.8333 12.9582 11.2083 13.3332 11.6667 13.3332Z" fill="#F5C544"/>
            </svg>
            В ожидании
            <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{active: task.active}">
              <path d="M4 4L7.4641 0.249999L0.535897 0.25L4 4Z" fill="#F5C544"/>
            </svg>
          </div>
          <div class="task__body-worked pause" v-if="task.active && task.tasks" :class="{active: task.active}" v-for="(inactive, index) in task.tasks.inactive" :key="index">
            <div class="task__body-pause">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.55 10.2598C19.75 10.1443 19.75 9.85566 19.55 9.74019L5.45 1.59955C5.25 1.48408 5 1.62842 5 1.85936L5 18.1406C5 18.3716 5.25 18.5159 5.45 18.4004L19.55 10.2598Z" fill="#39A571"/>
              </svg>
            </div>
            <div class="task__body-work-name">
              <p>{{ inactive.title }}</p>
              <span>{{ inactive.project.title }}</span>
            </div>
            <div class="task__body-time">
              <span>{{timeConvert(inactive.time)}}</span>
              <div>

                <button @click.prevent="getChat(inactive)">
                  <div class="count__message" v-if="inactive.unread_count">{{ inactive.unread_count }}</div>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8333 1.0835H2.16668C1.56922 1.0835 1.08334 1.56775 1.08334 2.1625V8.67116C1.08334 9.26591 1.56922 9.75016 2.16668 9.75016H3.79168V11.9168L7.2318 9.75016H10.8333C11.4308 9.75016 11.9167 9.26591 11.9167 8.67116V2.1625C11.9158 1.87584 11.8013 1.60124 11.5982 1.39895C11.3951 1.19666 11.12 1.08321 10.8333 1.0835Z" fill="#CBCFE6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="task__body-no-tasks" v-if="!task.tasks">
            <p>Нет задач</p>
          </div>
        </div>
      </div>
    </div>
    <Chat v-if="chat" :chat="chat" :id="$store.getters.getTaskId"/>
    <div v-else class="chat">
      <img src="../../../assets/img/message.png" alt="">
    </div>
  </div>
</template>
<script>
import Chat from "@/components/Tasks/Chat"
export default {
  data(){
    return{
      domain: process.env.VUE_APP_DOMAIN,
      id_chat: null
    }
  },
  async mounted() {
    await this.$store.dispatch('tasksAll')
    this.taskId()
  },
  methods:{
    timeConvert(n) {
      let num = n;
      let hours = (num / 60);
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      let toStringHours = (rhours + "").length
      let toStringMinutes = (rminutes + "").length
      if (toStringHours === 1){
        rhours += '0'
      }
      if (toStringMinutes === 1){
        rminutes += '0'
      }
      return rhours + ":" + rminutes
    },
    async getChat(task){
      this.$store.commit('setTaskId', task)
      await this.$store.dispatch('allMessages', task.id)
      await this.$store.dispatch('userHasReadMessages', task.id)
    },
    taskId(){
      if (this.tasks){
        let data = this.tasks.data
        let keys = Object.keys(data)
        let res = []
        for (let i = 0; i < keys.length; i++) {
          let el = data[keys[i]]
          if (el.user.id === this.$route.params.id){
            res.push(el)
          }
        }
        return res
      }
    }
  },
  computed:{
    tasks(){
      return this.$store.getters.getTasks
    },
    user(){
      return this.$store.getters.getUserCredentials
    },
    chat(){
      return this.$store.getters.chat
    }
  },
  components:{
    Chat
  }
}
</script>
<style lang='scss'>
@import '@/assets/scss/pages/task/app';
</style>