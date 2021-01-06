<template>
  <div class="chat">
    <div class="chat__body">
      <div class="chat__message" id="block">
        <pre>
          {{id}}
        </pre>
        <div class="chat__message-list" v-for="(item, idx) in chat.data" :key="idx" :class="{you: $store.getters.getUserCredentials.id === item.user_id}">
          <div class="avatar" v-if="item.name">
            <img v-if="item.photo" :src="domain+item.photo" alt="">
            <div v-else class="avatar__noImg" :style="`background: ${item.color};`" >
              {{item.name.charAt(0).toUpperCase() || '--'}}
            </div>
          </div>
          <ul >
            <li v-for="(items, idx) in item.content" :key="idx" v-html="items.text"></li>
          </ul>
        </div>
        <div id="anchor"></div>
      </div>
      <div class="chat__form">
        <VueEditor v-model="text" />
        <button class="send add_file">
          <label>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="18.5" fill="#F9FAFC" stroke="#E2E3E6"/>
              <path d="M10 16.3462H16.319V10H21.648V16.3462H28V21.6868H21.648V28H16.319V21.6868H10V16.3462Z" fill="#E2E3E6"/>
            </svg>
            <input type="file">
          </label>
        </button>
        <button class="send" @click.prevent="send">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18.5" fill="#F5F6FA" stroke="#4473F6"/>
            <path d="M28.8717 18.388L13.7467 10.8255C13.6282 10.7663 13.495 10.7425 13.3633 10.7571C13.2315 10.7718 13.1068 10.8242 13.0042 10.908C12.9062 10.9902 12.833 11.0981 12.7929 11.2195C12.7529 11.341 12.7475 11.4712 12.7773 11.5955L14.5992 18.3124H22.3748V19.6874H14.5992L12.7498 26.3837C12.7218 26.4875 12.7185 26.5965 12.7403 26.7018C12.762 26.8072 12.8082 26.906 12.8751 26.9902C12.9419 27.0745 13.0276 27.1419 13.1253 27.187C13.223 27.2321 13.3298 27.2536 13.4373 27.2499C13.545 27.2493 13.6509 27.2234 13.7467 27.1743L28.8717 19.6118C28.9843 19.5541 29.0788 19.4664 29.1448 19.3585C29.2108 19.2505 29.2457 19.1264 29.2457 18.9999C29.2457 18.8734 29.2108 18.7493 29.1448 18.6413C29.0788 18.5334 28.9843 18.4457 28.8717 18.388Z" fill="#4473F6"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>

import { VueEditor } from "vue2-editor";
export default {
  data(){
    return {
      text: '',
      domain: process.env.VUE_APP_DOMAIN
    //   customToolbar: [
    //       ["bold", "italic", "underline"],
    //       [
    //         {
    //           list: "ordered"
    //         },
    //         {
    //           list: "bullet"
    //         }
    //       ],
    //       ["image", "code-block"]]
    }
  },
  methods:{
    async send(){
      let formData = {
        user_id: this.$store.getters.getUserCredentials.id,
        text: this.text,
        files: [

        ],
        task_id: this.id
      }

      try {
       await this.$store.dispatch('sendMessage', formData)
        this.text = "";
      }catch (e){}
      document.getElementById("block").scrollTop = document.getElementById("block").scrollHeight;
    }
  },
  mounted() {
    document.getElementById("block").scrollTop = document.getElementById("block").scrollHeight;

  },
  computed:{
  },
  props: {
    chat:{},
    id: Number
  },
  components: {VueEditor}
}
</script>
<style lang="scss">
@import "@/assets/scss/chat.scss";
</style>