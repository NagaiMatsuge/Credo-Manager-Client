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
              <img v-else :src="user.photo" alt="">
              <p>{{ user.name }}</p>
            </label>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      tab: 'developers',
    }
  },
  props:{
    infoUser: {},
    formData:{}
  }

}
</script>

<style scoped>

</style>
