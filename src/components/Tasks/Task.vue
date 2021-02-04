<template>
  <div class="task__card-container" v-if="tasks && tasks.data">
    <div class="task__card" >

      <div class="task__card-body">
        <div class="task__body">
          <div class="task__body-title" style="margin-top: 15px;" v-if="tasks.data.tasks">Сейчас в работе</div>
          <div class="task__body-worked" v-if="tasks.data.tasks.active.length">
            <div class="task__body-work-name">
              <p>{{ tasks.data.tasks.active[0].title }}</p>
              <span>{{ tasks.data.tasks.active[0].project.title }}</span>
            </div>
            <div class="task__body-time" >
              <span>{{ timeConvert(tasks.data.tasks.active[0].time) }}</span>
              <div>
                <button @click.prevent="getChat(tasks.data.tasks.active[0])">
                  <div class="count__message" v-if="tasks.data.tasks.active[0].unread_count">{{ tasks.data.tasks.active[0].unread_count }}</div>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8333 1.0835H2.16668C1.56922 1.0835 1.08334 1.56775 1.08334 2.1625V8.67116C1.08334 9.26591 1.56922 9.75016 2.16668 9.75016H3.79168V11.9168L7.2318 9.75016H10.8333C11.4308 9.75016 11.9167 9.26591 11.9167 8.67116V2.1625C11.9158 1.87584 11.8013 1.60124 11.5982 1.39895C11.3951 1.19666 11.12 1.08321 10.8333 1.0835Z" fill="#CBCFE6"/>
                  </svg>
                </button>
                <button class="ok" @click.prevent="toCheck(tasks.data.tasks.active[0])">
                  <svg height="417pt" viewBox="0 -46 417.81333 417" width="417pt" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4473f6" d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="task__body-worked" v-else>
            Нет активных задач
          </div>
          <div class="task__body-not-worked" @click="tasks.data.active = !tasks.data.active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.33332 13.3332C8.79166 13.3332 9.16666 12.9582 9.16666 12.4998V7.49984C9.16666 7.0415 8.79166 6.6665 8.33332 6.6665C7.87499 6.6665 7.49999 7.0415 7.49999 7.49984V12.4998C7.49999 12.9582 7.87499 13.3332 8.33332 13.3332ZM9.99999 1.6665C5.39999 1.6665 1.66666 5.39984 1.66666 9.99984C1.66666 14.5998 5.39999 18.3332 9.99999 18.3332C14.6 18.3332 18.3333 14.5998 18.3333 9.99984C18.3333 5.39984 14.6 1.6665 9.99999 1.6665ZM9.99999 16.6665C6.32499 16.6665 3.33332 13.6748 3.33332 9.99984C3.33332 6.32484 6.32499 3.33317 9.99999 3.33317C13.675 3.33317 16.6667 6.32484 16.6667 9.99984C16.6667 13.6748 13.675 16.6665 9.99999 16.6665ZM11.6667 13.3332C12.125 13.3332 12.5 12.9582 12.5 12.4998V7.49984C12.5 7.0415 12.125 6.6665 11.6667 6.6665C11.2083 6.6665 10.8333 7.0415 10.8333 7.49984V12.4998C10.8333 12.9582 11.2083 13.3332 11.6667 13.3332Z" fill="#F5C544"/>
            </svg>
            В ожидании
            <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{active: tasks.data.active}">
              <path d="M4 4L7.4641 0.249999L0.535897 0.25L4 4Z" fill="#F5C544"/>
            </svg>
          </div>
          <div class="task__body-worked pause" v-if="tasks.data.active && tasks.data.tasks" :class="{active: tasks.data.active}" v-for="(inactive, index) in tasks.data.tasks.inactive" :key="index">

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
          <div class="task__body-no-tasks" v-if="!tasks.data.tasks">
            <p>Нет задач</p>
          </div>
        </div>
      </div>
    </div>
    <Chat v-if="chat" :chat="chat" :id="id_chat"/>
    <div v-else class="chat">
      <img src="../../assets/img/message.png" alt="">
    </div>
  </div>
</template>
<script>
import Chat from "@/components/Tasks/Chat"
export default {
  data(){
    return{
      id_chat: null
    }
  },
  mounted() {
    this.$store.commit('clearChat')
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
        rhours = '0' + rhours
      }
      if (toStringMinutes === 1){
        rminutes = '0' + rminutes
      }
      return rhours + ":" + rminutes
    },
    async getChat(task){
      this.id_chat = task
      await this.$store.dispatch('userHasReadMessages', task.id)
      await this.$store.dispatch('allMessages', task.id)
    },
    async toCheck(e){
      await this.$store.dispatch('toCheck', e.id)
    }
  },
  computed:{

    chat(){
      return this.$store.getters.chat
    }
  },
  props:{ tasks: {} },
  components:{
    Chat
  }
}
</script>