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
            <p>{{ (new Date(item.created_at)).getDate() }}
              {{ monthes[(new Date(item.created_at)).getMonth()] }}</p>
            <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M5.83797 8.57757C5.83797 8.40935 5.69706 8.27307 5.52318 8.27307H4.42468C4.25101 8.27307 4.11006 8.40935 4.11006 8.57757V9.64106C4.11006 9.80949 4.25101 9.94582 4.42468 9.94582H5.52318C5.69706 9.94582 5.83797 9.80949 5.83797 9.64106V8.57757Z"
                  fill="#CBCFE6"
              />
              <path
                  d="M8.58327 8.57757C8.58327 8.40935 8.44232 8.27307 8.26879 8.27307H7.17015C6.99648 8.27307 6.85553 8.40935 6.85553 8.57757V9.64106C6.85553 9.80949 6.99648 9.94582 7.17015 9.94582H8.26879C8.44232 9.94582 8.58327 9.80949 8.58327 9.64106V8.57757Z"
                  fill="#CBCFE6"
              />
              <path
                  d="M11.3287 8.57757C11.3287 8.40935 11.1877 8.27307 11.014 8.27307H9.91554C9.74167 8.27307 9.60075 8.40935 9.60075 8.57757V9.64106C9.60075 9.80949 9.74167 9.94582 9.91554 9.94582H11.014C11.1877 9.94582 11.3287 9.80949 11.3287 9.64106V8.57757Z"
                  fill="#CBCFE6"
              />
              <path
                  d="M5.83797 11.2359C5.83797 11.0674 5.69706 10.9313 5.52318 10.9313H4.42468C4.25101 10.9313 4.11006 11.0674 4.11006 11.2359V12.2992C4.11006 12.4676 4.25101 12.6039 4.42468 12.6039H5.52318C5.69706 12.6039 5.83797 12.4675 5.83797 12.2992V11.2359Z"
                  fill="#CBCFE6"
              />
              <path
                  d="M8.58327 11.2359C8.58327 11.0674 8.44232 10.9313 8.26879 10.9313H7.17015C6.99648 10.9313 6.85553 11.0674 6.85553 11.2359V12.2992C6.85553 12.4676 6.99648 12.6039 7.17015 12.6039H8.26879C8.44232 12.6039 8.58327 12.4675 8.58327 12.2992V11.2359Z"
                  fill="#CBCFE6"
              />
              <path
                  d="M11.3287 11.2359C11.3287 11.0674 11.1877 10.9313 11.0142 10.9313H9.91554C9.74167 10.9313 9.60075 11.0674 9.60075 11.2359V12.2992C9.60075 12.4676 9.74167 12.6039 9.91554 12.6039H11.0142C11.1877 12.6039 11.3287 12.4675 11.3287 12.2992V11.2359Z"
                  fill="#CBCFE6"
              />
              <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.2929 4.28879V2.6644C13.9555 2.68374 14.5 3.21463 14.5 3.86717V13.3869C14.5 14.0506 13.9425 14.5977 13.2569 14.5977H2.18183C1.49523 14.5977 0.938721 14.0517 0.938721 13.3869V3.86717C0.938721 3.21463 1.48321 2.68374 2.14583 2.6644V4.28879C2.14583 5.023 2.76095 5.61466 3.51909 5.61466H4.38559C5.1437 5.61466 5.76698 5.023 5.76698 4.28879V2.65857H9.67175V4.28879C9.67175 5.023 10.295 5.61466 11.0533 5.61466H11.9196C12.6778 5.61466 13.2929 5.023 13.2929 4.28879ZM12.353 13.3144C12.6498 13.3144 12.8904 13.0814 12.8904 12.7941L12.8904 7.87677C12.8904 7.58936 12.6498 7.35628 12.353 7.35628H3.06181C2.76494 7.35628 2.52439 7.58936 2.52439 7.87677V12.7941C2.52439 13.0814 2.76497 13.3144 3.06181 13.3144H12.353Z"
                  fill="#CBCFE6"
              />
              <path
                  d="M3.51613 4.74382H4.37305C4.63315 4.74382 4.84404 4.53992 4.84404 4.28808V1.62509C4.84404 1.37322 4.63315 1.16919 4.37305 1.16919H3.51613C3.256 1.16919 3.04514 1.37322 3.04514 1.62509V4.28808C3.04514 4.53992 3.256 4.74382 3.51613 4.74382Z"
                  fill="#CBCFE6"
              />
              <path
                  d="M11.0423 4.74382H11.8992C12.1591 4.74382 12.37 4.53992 12.37 4.28808V1.62509C12.37 1.37322 12.1592 1.16919 11.8992 1.16919H11.0423C10.7822 1.16919 10.5713 1.37322 10.5713 1.62509V4.28808C10.5713 4.53992 10.7822 4.74382 11.0423 4.74382Z"
                  fill="#CBCFE6"
              />
            </svg>
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
                v-if="change"
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
export default {
  data() {
    return {
      change: false,
      modal: false,
      page: 0,
      id: null,
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
      let today = new Date().toISOString();
      let obj = {
        text: '',
        created_at: new Date(),
        publish_date: today.slice(0, 10) + ' ' + today.slice(11, 19)

      }

      this.notifications.data.unshift(obj)
      this.notifications.total++

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
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/components/notifications";
</style>