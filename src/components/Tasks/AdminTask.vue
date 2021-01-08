<template>
  <div class="task" v-if="data && tasks">
    <div class="task__filter" >
      <div class="task__filter-group">
        <div class="task__filter-title">Фильтр</div>
        <div class="task__filter-group" >
          <DynamicSelect
              v-if="data.projects"
              :options="data.projects.data"
              option-value="id"
              option-text="title"
              :placeholder="'Все проекты'"
              v-model="projects"
              id="projects"
          />
          <label for="projects" class="label" :class="{focus: !(projects.title === '')}">Все проекты</label>
        </div>
      </div>
      <div class="task__filter-group">
        <DynamicSelect
            v-if="data.users"
            :options="data.users.data"
            option-value="id"
            option-text="name"
            :placeholder="'Все сотрудники'"
            v-model="users"
            id="users"
        />
        <label for="users" class="label" :class="{focus: !(users.name === '')}">Все сотрудники</label>
      </div>
      <div class="task__filter-group">
        <label>
          <input type="checkbox">

          Только находящиеся на рабочем месте
        </label>
      </div>
    </div>
    <div class="task__card-container">
      <div class="task__card" v-for="(item , index) in tasks.data" :key="index">
        <div class="task__card-body" >
          <div class="task__card-head" @click="item.hide = !item.hide">
            <div class="task__card-img">
              <img v-if="item.user.photo !== null" :src="domain +item.user.photo" alt="">
              <div v-else class="no-img" :style="`background: ${item.user.color};`">{{item.user.name.charAt(0).toUpperCase() || '--'}}</div>
            </div>
            <div class="task__card-name">
              <p>{{ item.user.name }}</p>
              <span>{{ item.user.role }}</span>
            </div>
            <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{active: item.hide}">
              <path d="M4 0L7.4641 3.75L0.535898 3.75L4 0Z" fill="#AAACB3"/>
            </svg>
          </div>
          <div class="task__body">
            <div class="task__body-title" v-if="item.tasks">Сейчас в работе</div>
            <div class="task__body-worked" v-if="item.tasks && item.tasks.active.length" :class="{active: !item.hide}">
              <div class="task__body-pause">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66666 2.22217C7.89396 2.22217 8.88889 3.21709 8.88889 4.44439L8.88888 15.5555C8.88888 16.7828 7.89396 17.7777 6.66666 17.7777C5.43936 17.7777 4.44444 16.7828 4.44444 15.5555L4.44444 4.44439C4.44444 3.21709 5.43936 2.22217 6.66666 2.22217Z" fill="#B4B8CC"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3333 2.22217C14.5606 2.22217 15.5556 3.21709 15.5556 4.44439L15.5556 15.5555C15.5556 16.7828 14.5606 17.7777 13.3333 17.7777C12.106 17.7777 11.1111 16.7828 11.1111 15.5555L11.1111 4.44439C11.1111 3.21709 12.106 2.22217 13.3333 2.22217Z" fill="#B4B8CC"/>
                </svg>
              </div>
              <div class="task__body-work-name">
                <p :class="{active: !item.hide}">{{ item.tasks.active[0].title }}</p>
                <span v-if="item.hide">{{ item.tasks.active[0].project.title }}</span>
              </div>
              <div class="task__body-time">
                <span :class="{active: !item.hide}">{{ timeConvert(item.tasks.active[0].time) }}</span>
                <div v-if="item.hide">
                  <button>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.7749 11.0156C3.8042 11.0156 3.8335 11.0127 3.86279 11.0083L6.32666 10.5762C6.35596 10.5703 6.38379 10.5571 6.4043 10.5352L12.6138 4.32568C12.6273 4.31213 12.6381 4.29604 12.6455 4.27831C12.6528 4.26059 12.6566 4.2416 12.6566 4.22241C12.6566 4.20323 12.6528 4.18423 12.6455 4.16651C12.6381 4.14879 12.6273 4.13269 12.6138 4.11914L10.1792 1.68311C10.1514 1.65527 10.1147 1.64062 10.0752 1.64062C10.0356 1.64062 9.99902 1.65527 9.97119 1.68311L3.76172 7.89258C3.73975 7.91455 3.72656 7.94092 3.7207 7.97021L3.28857 10.4341C3.27432 10.5126 3.27942 10.5933 3.30341 10.6694C3.3274 10.7454 3.36957 10.8145 3.42627 10.8706C3.52295 10.9644 3.64453 11.0156 3.7749 11.0156ZM4.76221 8.46094L10.0752 3.14941L11.1489 4.22314L5.83594 9.53467L4.53369 9.76465L4.76221 8.46094ZM12.8906 12.2461H2.10938C1.8501 12.2461 1.64062 12.4556 1.64062 12.7148V13.2422C1.64062 13.3066 1.69336 13.3594 1.75781 13.3594H13.2422C13.3066 13.3594 13.3594 13.3066 13.3594 13.2422V12.7148C13.3594 12.4556 13.1499 12.2461 12.8906 12.2461Z" fill="#CBCFE6"/>
                    </svg>
                  </button>
                  <button @click.prevent="toMessage(item.user.id, item.tasks.active[0].id)">
                    <div class="count__message" v-if="item.tasks.active[0].unread_count">{{ item.tasks.active[0].unread_count }}</div>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.8333 1.0835H2.16668C1.56922 1.0835 1.08334 1.56775 1.08334 2.1625V8.67116C1.08334 9.26591 1.56922 9.75016 2.16668 9.75016H3.79168V11.9168L7.2318 9.75016H10.8333C11.4308 9.75016 11.9167 9.26591 11.9167 8.67116V2.1625C11.9158 1.87584 11.8013 1.60124 11.5982 1.39895C11.3951 1.19666 11.12 1.08321 10.8333 1.0835Z" fill="#CBCFE6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="task__body-not-worked" v-if="item.hide && item.tasks" @click="item.active = !item.active">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33332 13.3332C8.79166 13.3332 9.16666 12.9582 9.16666 12.4998V7.49984C9.16666 7.0415 8.79166 6.6665 8.33332 6.6665C7.87499 6.6665 7.49999 7.0415 7.49999 7.49984V12.4998C7.49999 12.9582 7.87499 13.3332 8.33332 13.3332ZM9.99999 1.6665C5.39999 1.6665 1.66666 5.39984 1.66666 9.99984C1.66666 14.5998 5.39999 18.3332 9.99999 18.3332C14.6 18.3332 18.3333 14.5998 18.3333 9.99984C18.3333 5.39984 14.6 1.6665 9.99999 1.6665ZM9.99999 16.6665C6.32499 16.6665 3.33332 13.6748 3.33332 9.99984C3.33332 6.32484 6.32499 3.33317 9.99999 3.33317C13.675 3.33317 16.6667 6.32484 16.6667 9.99984C16.6667 13.6748 13.675 16.6665 9.99999 16.6665ZM11.6667 13.3332C12.125 13.3332 12.5 12.9582 12.5 12.4998V7.49984C12.5 7.0415 12.125 6.6665 11.6667 6.6665C11.2083 6.6665 10.8333 7.0415 10.8333 7.49984V12.4998C10.8333 12.9582 11.2083 13.3332 11.6667 13.3332Z" fill="#F5C544"/>
              </svg>
              В ожидании
              <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{active: item.active}">
                <path d="M4 4L7.4641 0.249999L0.535897 0.25L4 4Z" fill="#F5C544"/>
              </svg>
            </div>
            <div class="task__body-worked pause" v-if="item.active && item.hide && item.tasks" :class="{active: item.active}" v-for="(inactive, index) in item.tasks.inactive" :key="index">
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
                  <button>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.7749 11.0156C3.8042 11.0156 3.8335 11.0127 3.86279 11.0083L6.32666 10.5762C6.35596 10.5703 6.38379 10.5571 6.4043 10.5352L12.6138 4.32568C12.6273 4.31213 12.6381 4.29604 12.6455 4.27831C12.6528 4.26059 12.6566 4.2416 12.6566 4.22241C12.6566 4.20323 12.6528 4.18423 12.6455 4.16651C12.6381 4.14879 12.6273 4.13269 12.6138 4.11914L10.1792 1.68311C10.1514 1.65527 10.1147 1.64062 10.0752 1.64062C10.0356 1.64062 9.99902 1.65527 9.97119 1.68311L3.76172 7.89258C3.73975 7.91455 3.72656 7.94092 3.7207 7.97021L3.28857 10.4341C3.27432 10.5126 3.27942 10.5933 3.30341 10.6694C3.3274 10.7454 3.36957 10.8145 3.42627 10.8706C3.52295 10.9644 3.64453 11.0156 3.7749 11.0156ZM4.76221 8.46094L10.0752 3.14941L11.1489 4.22314L5.83594 9.53467L4.53369 9.76465L4.76221 8.46094ZM12.8906 12.2461H2.10938C1.8501 12.2461 1.64062 12.4556 1.64062 12.7148V13.2422C1.64062 13.3066 1.69336 13.3594 1.75781 13.3594H13.2422C13.3066 13.3594 13.3594 13.3066 13.3594 13.2422V12.7148C13.3594 12.4556 13.1499 12.2461 12.8906 12.2461Z" fill="#CBCFE6"/>
                    </svg>
                  </button>
                  <button @click.prevent="toMessage(item.user.id, inactive.id)">
                    <div class="count__message" v-if="inactive.unread_count">{{ inactive.unread_count }}</div>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.8333 1.0835H2.16668C1.56922 1.0835 1.08334 1.56775 1.08334 2.1625V8.67116C1.08334 9.26591 1.56922 9.75016 2.16668 9.75016H3.79168V11.9168L7.2318 9.75016H10.8333C11.4308 9.75016 11.9167 9.26591 11.9167 8.67116V2.1625C11.9158 1.87584 11.8013 1.60124 11.5982 1.39895C11.3951 1.19666 11.12 1.08321 10.8333 1.0835Z" fill="#CBCFE6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="task__body-no-tasks" v-if="!item.tasks">
              <p>Нет задач</p>
              <button>Дать задачу</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="task__btn">
      <div class="pagination" v-if="tasks && tasks.links.last_page !== 1">
        <paginate
            :page-count="tasks.links.last_page"
            :prev-text="''"
            :next-text="''"
            :clickHandler="paginationLink"
        >
        </paginate>
      </div>
      <button @click.prevent="$router.push('/add-task')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8.4718H8.46612V14H5.56263V8.4718H0V5.55692H5.56263V0H8.46612V5.55692H14V8.4718Z" fill="white"/>
        </svg>
        Добавить задачу
      </button>
    </div>
  </div>
</template>
<script>
import DynamicSelect from "vue-dynamic-select";
import Chat from "@/components/Tasks/Chat"
export default {
  data(){
    return{
      projects: {
        id: null,
        title: '',
      },
      users: {
        id: null,
        name: '',
      },
      domain: process.env.VUE_APP_DOMAIN,
    }
  },
  props:{ data:{}, tasks:{}},
  methods:{
    async paginationLink(url) {
      try {
        await this.$store.dispatch('paginationLink', {url:this.tasks.links.links[url].url, name: "tasks"})
        await this.tasks
      } catch (e) {}
    },
    timeConvert(n) {
      let rHours = Math.floor((n / 60));
      let rMinutes = Math.round(((n / 60) -  Math.floor((n / 60))) * 60);
      let toStringHours = (rHours + "").length
      let toStringMinutes = (rMinutes + "").length
      if (toStringHours === 1){
        rHours += '0'
      }
      if (toStringMinutes === 1){
        rMinutes += '0'
      }
      return rHours + ":" + rMinutes
    },
    toMessage(id, task_id){
      this.$store.commit('setTaskId', task_id)
      this.$router.push(`/admin-chat/${id}`)
      this.$store.dispatch('userHasReadMessages', task_id)
      this.$store.dispatch('allMessages', task_id)
    }
  },
  components:{
    DynamicSelect,
    Chat
  },
  async mounted() {
    await this.$store.dispatch('fetchProjectsAll')
  }
}
</script>