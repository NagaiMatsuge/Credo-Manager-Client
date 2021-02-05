<template>
  <div class="notif" v-if="notifications">
    <Modal
      v-if="modal"
      @modal='onModal'
    />
    <div class="notif__title">
      <div class="notif__title-icon">
        <svg
          width="30"
          height="31"
          viewBox="0 0 30 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.5"
            cx="15"
            cy="15.7347"
            r="15"
            fill="#E53750"
          />
          <path
            d="M20.034 19.9739H19.6365V14.3438C19.6365 12.0073 17.9094 10.0748 15.6624 9.75359V9.11109C15.6624 8.74514 15.366 8.44873 15 8.44873C14.634 8.44873 14.3376 8.74514 14.3376 9.11109V9.75359C12.0906 10.0748 10.3635 12.0073 10.3635 14.3438V19.9739H9.96603C9.67294 19.9739 9.43614 20.2107 9.43614 20.5038V21.0337C9.43614 21.1065 9.49575 21.1661 9.56861 21.1661H13.1454C13.1454 22.1895 13.9766 23.0207 15 23.0207C16.0234 23.0207 16.8546 22.1895 16.8546 21.1661H20.4314C20.5042 21.1661 20.5639 21.1065 20.5639 21.0337V20.5038C20.5639 20.2107 20.3271 19.9739 20.034 19.9739ZM15 21.961C14.5612 21.961 14.2052 21.6049 14.2052 21.1661H15.7948C15.7948 21.6049 15.4388 21.961 15 21.961Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="notif__title-text">Оповещение сотрудникам</div>
      <div class="notif__title-add" @click="newNotifications">
        <svg
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9531 11.0472H11.6875V7.78162C11.6875 7.68708 11.6102 7.60974 11.5156 7.60974H10.4844C10.3898 7.60974 10.3125 7.68708 10.3125 7.78162V11.0472H7.04688C6.95234 11.0472 6.875 11.1246 6.875 11.2191V12.2504C6.875 12.3449 6.95234 12.4222 7.04688 12.4222H10.3125V15.6879C10.3125 15.7824 10.3898 15.8597 10.4844 15.8597H11.5156C11.6102 15.8597 11.6875 15.7824 11.6875 15.6879V12.4222H14.9531C15.0477 12.4222 15.125 12.3449 15.125 12.2504V11.2191C15.125 11.1246 15.0477 11.0472 14.9531 11.0472Z"
            fill="#CBCFE6"
          />
          <path
            d="M11 2.10974C5.68477 2.10974 1.375 6.41951 1.375 11.7347C1.375 17.05 5.68477 21.3597 11 21.3597C16.3152 21.3597 20.625 17.05 20.625 11.7347C20.625 6.41951 16.3152 2.10974 11 2.10974ZM11 19.7269C6.58711 19.7269 3.00781 16.1476 3.00781 11.7347C3.00781 7.32185 6.58711 3.74255 11 3.74255C15.4129 3.74255 18.9922 7.32185 18.9922 11.7347C18.9922 16.1476 15.4129 19.7269 11 19.7269Z"
            fill="#CBCFE6"
          />
        </svg>
      </div>
    </div>
    <template v-if="notifications.data.length" v-for="(item , idx) in notifications.data">
      <template v-if="idx === page">
        <div class="notif__controls">
          <div class="notif__controls-time">
            <date-picker
                v-model="item.publish_date"
                type="datetime"
                value-type="YYYY-MM-DD HH:mm:ss"
                format="DD MMMM YYYY HH:mm:ss"
                placeholder="Выберите дату"
                :lang="lang"
                :disabled="item.published"
                @change="change = true"
            ></date-picker>
          </div>
          <div class="notif__controls-move">
            <div class="notif__controls-left" v-if="!(page === 0)" @click="page--">
              <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                    x="0.5"
                    y="1.23474"
                    width="22"
                    height="22"
                    rx="3.5"
                    fill="#F5F6FA"
                    stroke="#CBCFE6"
                />
                <path
                    d="M9 12.7347L12.75 16.1988L12.75 9.27064L9 12.7347Z"
                    fill="#AAACB3"
                />
              </svg>
            </div>
            <div class="notif__controls-current">
              {{ idx + 1 }}/{{ notifications.total }}
            </div>
            <div class="notif__controls-right" v-if="!(page === notifications.total - 1)" @click="page++">
              <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                    x="22.5"
                    y="23.2347"
                    width="22"
                    height="22"
                    rx="3.5"
                    transform="rotate(-180 22.5 23.2347)"
                    fill="#F5F6FA"
                    stroke="#CBCFE6"
                />
                <path
                    d="M14 11.7347L10.25 8.27064L10.25 15.1988L14 11.7347Z"
                    fill="#AAACB3"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="notif__input">
          <div class="notif__input-controls">
            <div
                class="notif__input-decline"
                @click="deleteNotifications(idx)"
            >
              <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M8.32844 7.50075L14.8281 1.00102C15.057 0.772184 15.057 0.401169 14.8281 0.172361C14.5993 -0.0564477 14.2283 -0.0564769 13.9995 0.172361L7.49975 6.67209L1.00004 0.172361C0.771207 -0.0564769 0.400192 -0.0564769 0.171384 0.172361C-0.0574242 0.401198 -0.0574535 0.772213 0.171384 1.00102L6.67109 7.50073L0.171384 14.0005C-0.0574535 14.2293 -0.0574535 14.6003 0.171384 14.8291C0.285788 14.9435 0.435758 15.0007 0.585729 15.0007C0.735699 15.0007 0.88564 14.9435 1.00007 14.8291L7.49975 8.32941L13.9995 14.8291C14.1139 14.9435 14.2638 15.0007 14.4138 15.0007C14.5638 15.0007 14.7137 14.9435 14.8281 14.8291C15.057 14.6003 15.057 14.2293 14.8281 14.0005L8.32844 7.50075Z"
                    fill="#E53750"
                />
              </svg>
            </div>
            <div
                class="notif__input-approve"
                v-if="change && !(item.text === '')"
                @click="saveNotifications(item)"
            >
              <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M6.04545 12.7103L2.26705 8.93186C1.84969 8.51451 1.17303 8.51451 0.755682 8.93186C0.33833 9.34921 0.33833 10.0259 0.755682 10.4432L6.04545 15.733L18.2443 3.53413C18.6617 3.11678 18.6617 2.44012 18.2443 2.02277C17.827 1.60542 17.1503 1.60542 16.733 2.02277L6.04545 12.7103Z"
                    fill="#29CC97"
                />
              </svg>
            </div>
          </div>
          <textarea
              name="notification"
              id="new_notification"
              placeholder="Введите текст"
              v-model="item.text"
              @input="item.text === '' ? change = false : change = true"
          >
      </textarea>
        </div>
      </template>
    </template>
    <div class="notes__input" v-if="notifications.data.length === 0">
      <p>У вас нет оповещений</p>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default {
  data() {
    return {
      change: false,
      modal: false,
      page: 0,
      id: null,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },

      monthes: [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ]
    };
  },
  components: {
    Modal,
    DatePicker
  },
  methods: {
    async onModal(confirm) {
      this.modal = false;
      if (confirm) {
        if (!(this.page === 0)){
          this.page--
        }
        if (this.notifications.data[this.id].id){
          try {
            await this.$store.dispatch("deleteNotifications", this.notifications.data[this.id].id);
          } catch (e) {}
        }
        this.notifications.total--
        this.notifications.data.splice(this.id, 1)

      } else {
        this.id = "";
      }
    },
    newNotifications(){
      let obj = {
        text: '',
        created_at: this.dataConvert(),
        publish_date: this.dataConvert()
      }
      this.notifications.data.unshift(obj)
      this.notifications.total++
    },
    dataConvert(){
        let today = new Date()
        let year = today.getFullYear(),
            month = ((today.getMonth() + 1).toString().length === 1 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)),
            day = (today.getDate().toString().length === 1 ? '0' + today.getDate() : today.getDate()),
            hours = (today.getHours().toString().length === 1 ? '0' + today.getHours() : today.getHours()),
            minutes = (today.getMinutes().toString().length === 1 ? '0' + today.getMinutes() : today.getMinutes()),
            seconds = (today.getSeconds().toString().length === 1 ? '0' + today.getSeconds() : today.getSeconds())
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    async saveNotifications(item){
      if (item.id){
        await this.$store.dispatch('updateNotifications', item)
        this.change = false
      }else{
        await this.$store.dispatch('createNotifications', item)
        await this.$store.dispatch('getNotesUser')
        this.change = false
      }
    },
    deleteNotifications(id) {
      this.id = id;
      this.modal = true;
    },
  },
  props:{
    notifications:{}
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/notifications";
</style>