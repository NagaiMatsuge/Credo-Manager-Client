<template>
  <div class="home__projects-body">
    <div class="home__projects-head">
      Проекты
    </div>
    <div class="home__projects-content">
      <div class="home__projects-card" v-for="(item, idx) in right" :key="idx">
        <div class="home__projects-card__head">
          <div class="home__projects-card__img">
            <img :src="domain + item.photo" v-if="item.photo" alt="">
            <div class="no_img" v-else :style="`background: ${item.color};`">{{item.title.charAt(0).toUpperCase()}}</div>
          </div>
          <div class="home__projects-card__info">
            <p>{{item.title}}</p>
            <span>дата начала: {{item.created_at}}</span>
          </div>
          <div class="home__projects-card__deadline" :class="{deadline: item.deadline.values.days < 7}">
            <p>дедлайн через</p>
            <span v-if="item.deadline && !(dataTime(item.deadline.values.y, 'y', item.deadline.value.date) === 'null')">
              <template v-if="item.deadline.values.y">{{dataTime(item.deadline.values.y, 'y', item.deadline.value.date)}}</template>
              <template v-if="item.deadline.values.m">{{dataTime(item.deadline.values.m, 'm', item.deadline.value.date)}}</template>
              <template v-if="item.deadline.values.d">{{dataTime(item.deadline.values.d, 'd', item.deadline.value.date)}}</template>
              <template v-if="item.deadline.values.h">{{dataTime(item.deadline.values.h, 'h', item.deadline.value.date)}}</template>
            </span>
            <span v-else>
              Истёк
            </span>
          </div>
        </div>
        <div class="home__projects-card__dev">
          <p>Исполнители</p>
          <div class="img" v-for="(dev, index) in item.participants" :key="index" @click="$router.push(`/user-edit/${dev.user_id}`)">
            <img :src="domain + dev.photo" v-if="dev.photo" alt="">
            <div class="no_img" v-else :style="`background: ${dev.color};`">{{dev.name.charAt(0).toUpperCase()}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      domain: process.env.VUE_APP_DOMAIN
    }
  },
  methods:{
    dataTime(num, val, date){
      let today = new Date()
      let deadline = date
      let diff =  Math.floor(( Date.parse(deadline) - Date.parse(today) ) / 86400000);
      if (diff < 0){
        return 'null'
      }
      if (val === 'y'){
        if (num > 1 && num < 5) return `${num} года `
        else if (num > 4) return `${num} лет `
        else return `${num} год `
      }
      if (val === 'm'){
        if (num > 1 && num < 5) return `${num} месяцa `
        else if (num > 4) return `${num} месяцев `
        else return `${num} месяц `
      }
      if (val === 'd'){
        if (num > 1 && num < 5) return `${num} дня `
        else if (num > 4) return `${num} дней `
        else return `${num} день `
      }
      if (val === 'h'){
        if (num > 1 && num < 5) return `${num} чaсa`
        else if (num > 4) return `${num} часов`
        else return `${num} час`
      }
    },
    treatAsUTC(date) {
      let result = new Date(date);
      result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
      return result;
    },
    daysBetween(startDate, endDate) {
      let millisecondsPerDay = 24 * 60 * 60 * 1000;
      return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay;
    }
  },
  props:{
    right:{}
  }

};
</script>

<style>
</style>