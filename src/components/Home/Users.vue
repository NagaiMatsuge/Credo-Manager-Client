<template>
  <div>
    <template v-if="mid && mid.tasks">
      <div class="task">
        <div class="task__title">
          Мои задачи
        </div>
        <div class="task__body">
          <div class="task__card">
            <div class="task__card-body">
              <div class="task__body">
                <div class="task__body-title" style="margin-top: 15px;" v-if="mid.tasks">Сейчас в работе</div>
                <div class="task__body-worked" v-if="mid.tasks.active.length">

                  <div class="task__body-work-name">
                    <p>{{ mid.tasks.active[0].title }}</p>
                    <span>{{ mid.tasks.active[0].project.title }}</span>
                  </div>
                  <div class="task__body-time">
                    <span>{{ timeConvert(mid.tasks.active[0].time) }}</span>
                    <div>
                      <button @click.prevent="getChat(mid.tasks.active[0])">
                        <div class="count__message" v-if="mid.tasks.active[0].unread_count">
                          {{ mid.tasks.active[0].unread_count }}
                        </div>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M10.8333 1.0835H2.16668C1.56922 1.0835 1.08334 1.56775 1.08334 2.1625V8.67116C1.08334 9.26591 1.56922 9.75016 2.16668 9.75016H3.79168V11.9168L7.2318 9.75016H10.8333C11.4308 9.75016 11.9167 9.26591 11.9167 8.67116V2.1625C11.9158 1.87584 11.8013 1.60124 11.5982 1.39895C11.3951 1.19666 11.12 1.08321 10.8333 1.0835Z"
                              fill="#CBCFE6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="task__body-worked" v-else>
                  Нет активных задач
                </div>
                <div class="task__body-not-worked" @click="mid.active = !mid.active">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.33332 13.3332C8.79166 13.3332 9.16666 12.9582 9.16666 12.4998V7.49984C9.16666 7.0415 8.79166 6.6665 8.33332 6.6665C7.87499 6.6665 7.49999 7.0415 7.49999 7.49984V12.4998C7.49999 12.9582 7.87499 13.3332 8.33332 13.3332ZM9.99999 1.6665C5.39999 1.6665 1.66666 5.39984 1.66666 9.99984C1.66666 14.5998 5.39999 18.3332 9.99999 18.3332C14.6 18.3332 18.3333 14.5998 18.3333 9.99984C18.3333 5.39984 14.6 1.6665 9.99999 1.6665ZM9.99999 16.6665C6.32499 16.6665 3.33332 13.6748 3.33332 9.99984C3.33332 6.32484 6.32499 3.33317 9.99999 3.33317C13.675 3.33317 16.6667 6.32484 16.6667 9.99984C16.6667 13.6748 13.675 16.6665 9.99999 16.6665ZM11.6667 13.3332C12.125 13.3332 12.5 12.9582 12.5 12.4998V7.49984C12.5 7.0415 12.125 6.6665 11.6667 6.6665C11.2083 6.6665 10.8333 7.0415 10.8333 7.49984V12.4998C10.8333 12.9582 11.2083 13.3332 11.6667 13.3332Z"
                        fill="#F5C544"/>
                  </svg>
                  В ожидании
                  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                       :class="{active: mid.active}">
                    <path d="M4 4L7.4641 0.249999L0.535897 0.25L4 4Z" fill="#F5C544"/>
                  </svg>
                </div>
                <div class="task__body-worked pause" v-if="mid.active && mid.tasks" :class="{active: mid.active}"
                     v-for="(inactive, index) in mid.tasks.inactive" :key="index">

                  <div class="task__body-work-name">
                    <p>{{ inactive.title }}</p>
                    <span>{{ inactive.project.title }}</span>
                  </div>
                  <div class="task__body-time">
                    <span>{{ timeConvert(inactive.time) }}</span>
                    <div>

                      <button @click.prevent="getChat(inactive)">
                        <div class="count__message" v-if="inactive.unread_count">{{ inactive.unread_count }}</div>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M10.8333 1.0835H2.16668C1.56922 1.0835 1.08334 1.56775 1.08334 2.1625V8.67116C1.08334 9.26591 1.56922 9.75016 2.16668 9.75016H3.79168V11.9168L7.2318 9.75016H10.8333C11.4308 9.75016 11.9167 9.26591 11.9167 8.67116V2.1625C11.9158 1.87584 11.8013 1.60124 11.5982 1.39895C11.3951 1.19666 11.12 1.08321 10.8333 1.0835Z"
                              fill="#CBCFE6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="task__body-no-tasks" v-if="!mid.tasks">
                  <p>Нет задач</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="mid && !mid.tasks">
      <div v-if="mid.length" class="tuday__work">
        <div class="tuday__work-title">
          Сегодня работают
        </div>

        <div class="tuday__work-body">
          <div class="tuday__work-card" v-for="(item, index) in mid" :key="index">
            <div class="tuday__work-info">
              <img src="../../assets/img/photo.png" alt="">
              <p>{{ item.user_name }}</p>
              <span>{{ item.user_role }}</span>
            </div>
            <div class="tuday__work-content">
              <a href="#!" v-if="item.project_title">{{ item.project_title }}</a>
              <a href="#!" v-else-if="!item.task_count">{{ 'Нет задач' }}</a>

              <a href="#!" v-else-if="!item.project_title">{{ 'Нет активных задач' }}</a>
              <div class="tuday__work-content-info" v-if="item.task_count && !item.project_title"
                   style="color: #F5C544;">
              <span>
                <div class="img">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.66665 10.6667C7.03331 10.6667 7.33331 10.3667 7.33331 10V6.00004C7.33331 5.63337 7.03331 5.33337 6.66665 5.33337C6.29998 5.33337 5.99998 5.63337 5.99998 6.00004V10C5.99998 10.3667 6.29998 10.6667 6.66665 10.6667ZM7.99998 1.33337C4.31998 1.33337 1.33331 4.32004 1.33331 8.00004C1.33331 11.68 4.31998 14.6667 7.99998 14.6667C11.68 14.6667 14.6666 11.68 14.6666 8.00004C14.6666 4.32004 11.68 1.33337 7.99998 1.33337ZM7.99998 13.3334C5.05998 13.3334 2.66665 10.94 2.66665 8.00004C2.66665 5.06004 5.05998 2.66671 7.99998 2.66671C10.94 2.66671 13.3333 5.06004 13.3333 8.00004C13.3333 10.94 10.94 13.3334 7.99998 13.3334ZM9.33331 10.6667C9.69998 10.6667 9.99998 10.3667 9.99998 10V6.00004C9.99998 5.63337 9.69998 5.33337 9.33331 5.33337C8.96665 5.33337 8.66665 5.63337 8.66665 6.00004V10C8.66665 10.3667 8.96665 10.6667 9.33331 10.6667Z"
                        fill="#F5C544"/>
                  </svg>
               </div>
              </span>
                на отдыхе {{ item.last_pause || 0 }} минут
              </div>
              <div class="tuday__work-content-info" v-if="item.task_count && item.project_title">
              <span>
                <div class="img">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.8845 11.68C14.8532 11.5691 14.7801 11.4747 14.6807 11.4167C14.5812 11.3586 14.463 11.3415 14.3511 11.3689L13.2445 11.6666C13.85 10.774 14.2172 9.74124 14.3111 8.66663C14.4019 7.66125 14.2549 6.64861 13.882 5.71055C13.5091 4.77248 12.9207 3.93529 12.1645 3.26663C12.0771 3.19433 11.9653 3.15819 11.8521 3.16563C11.7389 3.17307 11.6328 3.22351 11.5556 3.30663C11.4779 3.39509 11.4385 3.51075 11.446 3.62824C11.4535 3.74573 11.5073 3.85544 11.5956 3.9333C12.2472 4.50852 12.7542 5.22917 13.0754 6.03685C13.3967 6.84454 13.5231 7.71654 13.4445 8.58219C13.3683 9.49398 13.0625 10.3716 12.5556 11.1333L12.4445 10.0177C12.4529 9.95209 12.4465 9.8854 12.4258 9.82253C12.4051 9.75966 12.3706 9.70221 12.3249 9.65437C12.2791 9.60652 12.2233 9.5695 12.1614 9.546C12.0996 9.52249 12.0332 9.51311 11.9673 9.51852C11.9013 9.52393 11.8374 9.54401 11.7802 9.57728C11.723 9.61055 11.6739 9.65619 11.6366 9.71084C11.5992 9.7655 11.5746 9.8278 11.5644 9.8932C11.5543 9.9586 11.5588 10.0254 11.5778 10.0889L11.8 12.9511L14.5778 12.2133C14.6878 12.1811 14.7812 12.1077 14.8383 12.0083C14.8955 11.9089 14.912 11.7913 14.8845 11.68V11.68Z"
                        fill="#29CC97"/>
                    <path
                        d="M1.91557 7.59111C1.97464 7.62909 2.04145 7.65339 2.11112 7.66222C2.22711 7.67744 2.34443 7.64631 2.43761 7.57558C2.5308 7.50486 2.59234 7.40025 2.6089 7.28444C2.79254 5.92851 3.48164 4.692 4.53819 3.82253C5.59474 2.95306 6.94075 2.51481 8.30668 2.59555L7.31112 3.27555C7.24068 3.32862 7.18762 3.40144 7.15869 3.48476C7.12977 3.56807 7.12628 3.65811 7.14868 3.74341C7.17107 3.82871 7.21834 3.90542 7.28447 3.96377C7.35059 4.02213 7.43259 4.05949 7.52001 4.07111C7.62014 4.08026 7.72041 4.05519 7.80445 4L10.1733 2.37333L8.14668 0.337775C8.11061 0.282513 8.0627 0.235976 8.0064 0.201542C7.95011 0.167107 7.88686 0.145639 7.82124 0.138697C7.75562 0.131755 7.68927 0.139512 7.62702 0.161406C7.56477 0.1833 7.50818 0.218781 7.46135 0.265273C7.41452 0.311765 7.37863 0.368101 7.35629 0.430192C7.33394 0.492283 7.32571 0.55857 7.33218 0.62424C7.33864 0.689911 7.35965 0.753317 7.39368 0.809856C7.42771 0.866394 7.4739 0.914646 7.5289 0.951108L8.28445 1.70666C6.70705 1.63124 5.15868 2.14994 3.94502 3.16036C2.73137 4.17078 1.94062 5.59949 1.7289 7.16444C1.7175 7.24587 1.72892 7.32886 1.76187 7.40418C1.79483 7.47951 1.84803 7.54422 1.91557 7.59111V7.59111Z"
                        fill="#29CC97"/>
                    <path
                        d="M9.65778 13.3023C8.96375 13.524 8.23166 13.6011 7.50667 13.5289C6.62372 13.4424 5.77509 13.1422 5.03407 12.6544C4.29304 12.1666 3.68188 11.5057 3.25333 10.7289L4.36 11.1423C4.46201 11.16 4.567 11.1415 4.65685 11.09C4.74669 11.0386 4.81575 10.9574 4.8521 10.8604C4.88845 10.7635 4.88982 10.6569 4.85597 10.559C4.82211 10.4612 4.75516 10.3782 4.66667 10.3245L2.62667 9.56893L1.97333 9.33337L1.48 12.1556C1.4629 12.2684 1.48981 12.3834 1.55517 12.4769C1.62052 12.5704 1.71932 12.6352 1.83111 12.6578H1.90667C2.01127 12.6597 2.1132 12.6247 2.19449 12.5588C2.27579 12.493 2.33125 12.4005 2.35111 12.2978L2.53778 11.2312C3.04046 12.1117 3.74652 12.8592 4.59701 13.4113C5.4475 13.9633 6.41773 14.3039 7.42667 14.4045C8.2702 14.4881 9.12192 14.3973 9.92889 14.1378C10.0316 14.0953 10.1147 14.0157 10.1617 13.9149C10.2087 13.8142 10.2162 13.6994 10.1827 13.5934C10.1492 13.4873 10.0771 13.3977 9.9808 13.3421C9.88444 13.2866 9.77077 13.2692 9.66222 13.2934L9.65778 13.3023Z"
                        fill="#29CC97"/>
                    <path
                        d="M9.77777 5.77771H6.22222C6.10434 5.77771 5.9913 5.82454 5.90795 5.90788C5.8246 5.99123 5.77777 6.10428 5.77777 6.22215V9.77771C5.77777 9.89558 5.8246 10.0086 5.90795 10.092C5.9913 10.1753 6.10434 10.2222 6.22222 10.2222H9.77777C9.89564 10.2222 10.0087 10.1753 10.092 10.092C10.1754 10.0086 10.2222 9.89558 10.2222 9.77771V6.22215C10.2222 6.10428 10.1754 5.99123 10.092 5.90788C10.0087 5.82454 9.89564 5.77771 9.77777 5.77771ZM9.33333 9.33327H6.66666V6.6666H9.33333V9.33327Z"
                        fill="#29CC97"/>
                  </svg>
               </div>
              </span>
                в процессе
              </div>
            </div>
            <div class="tuday__work-time time__pause">
              <div v-if="item.task_type === 1" class="tuday__work-timer">
                {{
                  parseInt((item.given_time - (parseInt(item.time_spent) + item.additional_time)) / 60) + ' часов ' +
                  parseInt((item.given_time - (parseInt(item.time_spent) + item.additional_time)) % 60) + ' минут'
                }}
              </div>
              <div v-if="item.task_type === 2" class="tuday__work-timer">{{ item.deadline }}</div>
              <div v-if="item.task_type === 3" class="tuday__work-timer">
                {{ parseInt((item.time_spent + item.additional_time) / 60) + ' часов ' + parseInt((item.time_spent + item.additional_time) % 60) + ' минут' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="tuday__work">
        <div class="tuday__work-title">
          Сегодня работают
        </div>
        <div class="tuday__work-body">
          <div class="tuday__work-card">
            <div class="tuday__work-content" style="width: 100%; padding-right: 20px;">
              Увас нет команды перейдите во вкладку "Команда" и создайте нового работника
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    mid: {}
  },
  methods: {
    timeConvert(n) {
      let num = n;
      let hours = (num / 60);
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      let toStringHours = (rhours + "").length
      let toStringMinutes = (rminutes + "").length
      if (toStringHours === 1) {
        rhours = '0' + rhours
      }
      if (toStringMinutes === 1) {
        rminutes = '0' + rminutes
      }
      return rhours + ":" + rminutes
    },
  }

};
</script>

<style>
</style>