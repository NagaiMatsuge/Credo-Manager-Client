<template>
    <div class="addTask__user">
      <div class="addTask__user-body">
        <div class="addTask__user-title">Выберите исполнителей</div>
        <div class="addTask__user-tab">
          <button :class="{active: tab === 'developers'}" @click="tab = 'developers'">Прогеры</button>
          <button :class="{active: tab === 'designers'}" @click="tab = 'designers'">Дизайнеры</button>
        </div>
        <div class="addTask__user-container">
          <div class="addTask__user-group" v-for="(item, index) in infoUser" v-if="tab === index">
            <label v-for="(user) in infoUser[index]">
              <input type="checkbox" v-model="formData.user_ids" :value="user.id">
              <div v-if="!user.photo" class="addTask__user-noImg" :style="`background: ${user.color}`">{{ user.name.charAt(0).toUpperCase() }}</div>
              <img v-else :src="domain + user.photo" alt="">
              <p>{{ user.name }}</p>
            </label>
            <label v-if="!item.length"><p>Увас нет {{index === 'designers' ? 'Дизайнеров' : 'Прогеров'}}</p></label>
          </div>
          <small
              class="error"
              v-if="validator.user_ids.$dirty && !validator.user_ids.required"
          >Выберите исполнителя</small>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      tab: 'developers',
      domain: process.env.VUE_APP_DOMAIN
    }
  },
  props:{
    infoUser: {},
    formData:{},
    validator:{}
  }

}
</script>

