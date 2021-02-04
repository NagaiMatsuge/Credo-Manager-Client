<template>
  <div>
    <div class="home__projects-body" v-if="right && !right.message">
      <div class="home__projects-head">
        Проекты
      </div>
      <div class="home__projects-content">
        <div class="home__projects-card" v-for="(item, idx) in right" :key="idx">
          <div class="home__projects-card__head">
            <div class="home__projects-card__img">
              <img :src="domain + item.photo" v-if="item.photo" alt="">
              <div class="no_img" v-else :style="`background: ${item.color};`">
                {{ item.title.charAt(0).toUpperCase() }}
              </div>
            </div>
            <div class="home__projects-card__info">
              <p>{{ item.title }}</p>
              <span>дата начала: {{ item.created_at }}</span>
            </div>
            <div class="home__projects-card__deadline" :class="{deadline: item.deadline.values.days < 7}">
              <p>дедлайн через</p>
              <span
                  v-if="item.deadline && !(dataTime(item.deadline.values.y, 'y', item.deadline.value.date) === 'null')">
                  <template
                      v-if="item.deadline.values.y">{{ dataTime(item.deadline.values.y, 'y', item.deadline.value.date) }}</template>
                  <template
                      v-if="item.deadline.values.m">{{ dataTime(item.deadline.values.m, 'm', item.deadline.value.date) }}</template>
                  <template
                      v-if="item.deadline.values.d">{{ dataTime(item.deadline.values.d, 'd', item.deadline.value.date) }}</template>
                  <template
                      v-if="item.deadline.values.h">{{ dataTime(item.deadline.values.h, 'h', item.deadline.value.date) }}</template>
                </span>
              <span v-else>
                  Истёк
                </span>
            </div>
          </div>
          <div class="home__projects-card__dev">
            <p>Исполнители</p>
            <div class="img" v-for="(dev, index) in item.participants" :key="index"
                 @click="$router.push(`/user-edit/${dev.user_id}`)">
              <img :src="domain + dev.photo" v-if="dev.photo" alt="">
              <div class="no_img" v-else :style="`background: ${dev.color};`">{{ dev.name.charAt(0).toUpperCase() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="right && right.message" class="message">
      <div class="message__title">
        Новые сообщения
      </div>

      <div class="message__body">
        <div class="message__card" v-for="(message, idx) in right.message.data" :key="idx">
          <div class="message__img">
            <img v-if="message.user_photo" :src="domain + message.user_photo" alt="">
            <div v-else class="no_img" :style="`background: ${message.user_color}`">{{ message.user_name.charAt(0).toUpperCase() }}</div>
          </div>
          <div class="message__content">
            <div class="message__name-data">
              <p>{{ message.user_name }}</p>
              <span>{{ message.sent_at }}</span>
            </div>
            <div class="message__task">
              {{ message.project_title }} → {{ message.task_title }}
            </div>
            <div class="message__text" v-html="message.text"></div>
            <div class="message__file" v-if="message.files">
              <a :href="domain + file.file" v-for="(file, idx) in message.files">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M7.5192 13.0929C7.63485 13.0472 7.73989 12.9783 7.82782 12.8903L8.03039 12.5817C8.07488 12.4691 8.09641 12.3488 8.09375 12.2278V4.71875H8.78125V12.2344H8.78122L8.78128 12.2398C8.78359 12.4511 8.74368 12.6607 8.66389 12.8564C8.5841 13.052 8.46604 13.2297 8.31664 13.3791C8.16724 13.5285 7.9895 13.6466 7.79386 13.7264C7.59822 13.8062 7.38861 13.8461 7.17734 13.8438V13.8438H7.17188C6.36665 13.8438 5.5625 13.234 5.5625 12.2344V4.64062C5.5625 3.62558 5.87681 2.80057 6.37857 2.23609C6.8765 1.67592 7.58291 1.34375 8.4375 1.34375C9.33041 1.34375 10.0859 1.69918 10.5921 2.327C10.7027 2.46519 10.8006 2.61306 10.8847 2.76882L11.0265 3.03125H11.3247H13.8438V12.2344C13.8438 12.4789 13.9409 12.7134 14.1138 12.8862C14.2866 13.0591 14.5211 13.1562 14.7656 13.1562H23.9688V24.6797C23.9688 24.7149 23.9548 24.7487 23.9298 24.7736C23.9049 24.7985 23.8712 24.8125 23.8359 24.8125H7.38281C7.34759 24.8125 7.31381 24.7985 7.2889 24.7736C7.26399 24.7487 7.25 24.7149 7.25 24.6797V16.8571V16.397L6.79151 16.3588C4.61202 16.1772 3.03125 14.4122 3.03125 11.9248V8.09375H3.71875V11.9248C3.71875 12.9459 4.03882 13.9023 4.65683 14.6006C5.29258 15.3195 6.17384 15.6875 7.17188 15.6875C8.16983 15.6875 9.05103 15.3196 9.68677 14.6008C10.3049 13.9025 10.625 12.946 10.625 11.9248V4.60793C10.625 4.33909 10.594 3.72757 10.3168 3.16581C10.1747 2.878 9.96114 2.58912 9.64184 2.37314C9.31904 2.15478 8.91801 2.03125 8.4375 2.03125C7.64249 2.03125 7.06697 2.39211 6.71113 2.92627C6.37226 3.43495 6.25 4.06995 6.25 4.64062V12.2344C6.25 12.5824 6.41597 12.8379 6.63412 12.9874C6.82026 13.115 7.02486 13.1546 7.16308 13.1562C7.28481 13.1592 7.40591 13.1377 7.5192 13.0929Z"
                      stroke="#4473F6"/>
                  <mask id="path-2-inside-1" fill="white">
                    <path
                        d="M16.2422 10.9686H23.9578C23.9786 10.9686 23.999 10.9624 24.0163 10.9509C24.0337 10.9393 24.0472 10.9229 24.0552 10.9037C24.0632 10.8844 24.0654 10.8632 24.0613 10.8428C24.0573 10.8223 24.0473 10.8035 24.0327 10.7888L16.2111 2.96719C16.1963 2.9525 16.1775 2.94252 16.157 2.9385C16.1366 2.93448 16.1154 2.93662 16.0962 2.94463C16.0769 2.95264 16.0605 2.96617 16.0489 2.98351C16.0374 3.00086 16.0312 3.02124 16.0313 3.04208V10.7576C16.0313 10.8136 16.0535 10.8672 16.093 10.9068C16.1326 10.9464 16.1862 10.9686 16.2422 10.9686Z"/>
                  </mask>
                  <path
                      d="M23.9578 10.9686L23.9586 9.96858H23.9578V10.9686ZM24.0163 10.9509L24.5708 11.7831L24.0163 10.9509ZM24.0327 10.7888L24.7419 10.0838L24.7398 10.0816L24.0327 10.7888ZM16.2111 2.96719L16.9182 2.26008L16.9161 2.25799L16.2111 2.96719ZM16.0313 3.04208H17.0313L17.0312 3.04128L16.0313 3.04208ZM16.2422 11.9686H23.9578V9.96858H16.2422V11.9686ZM23.957 11.9686C24.1754 11.9688 24.389 11.9042 24.5708 11.7831L23.4619 10.1187C23.609 10.0207 23.7818 9.96844 23.9586 9.96858L23.957 11.9686ZM24.5708 11.7831C24.7526 11.662 24.8944 11.4897 24.9784 11.2881L23.1321 10.5192C23.2 10.3561 23.3148 10.2167 23.4619 10.1187L24.5708 11.7831ZM24.9784 11.2881C25.0623 11.0864 25.0847 10.8644 25.0426 10.6501L23.0801 11.0355C23.046 10.862 23.0641 10.6824 23.1321 10.5192L24.9784 11.2881ZM25.0426 10.6501C25.0005 10.4357 24.8959 10.2387 24.7419 10.0838L23.3234 11.4938C23.1988 11.3684 23.1142 11.2089 23.0801 11.0355L25.0426 10.6501ZM24.7398 10.0816L16.9182 2.26009L15.504 3.6743L23.3256 11.4959L24.7398 10.0816ZM16.9161 2.25799C16.7612 2.10398 16.5641 1.99934 16.3498 1.95724L15.9643 3.91976C15.7909 3.8857 15.6314 3.80102 15.5061 3.6764L16.9161 2.25799ZM16.3498 1.95724C16.1354 1.91515 15.9134 1.9375 15.7118 2.02147L16.4806 3.86779C16.3174 3.93574 16.1378 3.95382 15.9643 3.91976L16.3498 1.95724ZM15.7118 2.02147C15.5101 2.10545 15.3378 2.24728 15.2167 2.42906L16.8812 3.53797C16.7832 3.68506 16.6438 3.79983 16.4806 3.86779L15.7118 2.02147ZM15.2167 2.42906C15.0956 2.61085 15.0311 2.82444 15.0313 3.04287L17.0312 3.04128C17.0314 3.21803 16.9792 3.39087 16.8812 3.53797L15.2167 2.42906ZM15.0313 3.04208V10.7576H17.0312V3.04208H15.0313ZM15.0313 10.7576C15.0313 11.0788 15.1588 11.3868 15.3859 11.6139L16.8001 10.1997C16.9481 10.3477 17.0312 10.5484 17.0312 10.7576H15.0313ZM15.3859 11.6139C15.613 11.841 15.921 11.9686 16.2422 11.9686V9.96858C16.4515 9.96858 16.6522 10.0517 16.8001 10.1997L15.3859 11.6139Z"
                      fill="#4473F6" mask="url(#path-2-inside-1)"/>
                </svg>
                <span>{{ file.name }}</span>
                <small>({{ file.size }})</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      domain: process.env.VUE_APP_DOMAIN
    }
  },
  methods: {
    dataTime(num, val, date) {
      let today = new Date()
      let diff = Math.floor((Date.parse(date) - Date.parse(today)) / 86400000);
      if (diff < 0) {
        return 'null'
      }
      if (val === 'y') {
        if (num > 1 && num < 5) return `${num} года `
        else if (num > 4) return `${num} лет `
        else return `${num} год `
      }
      if (val === 'm') {
        if (num > 1 && num < 5) return `${num} месяцa `
        else if (num > 4) return `${num} месяцев `
        else return `${num} месяц `
      }
      if (val === 'd') {
        if (num > 1 && num < 5) return `${num} дня `
        else if (num > 4) return `${num} дней `
        else return `${num} день `
      }
      if (val === 'h') {
        if (num > 1 && num < 5) return `${num} чaсa`
        else if (num > 4) return `${num} часов`
        else return `${num} час`
      }
    },

  },
  props: {
    right: {}
  }

};
</script>

<style>
</style>