<template>
  <div class="time-wrapper">
    <div class="time-wrapper__date">
      {{dateV}}
    </div>
    <div class="time-wrapper__time">
      {{timeV}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeV: null,
      dateV: null,
    };
  },
  mounted() {
    setInterval(() => {
      this.time();
      this.date();
    }, 1000);
  },
  methods: {
    time() {
      let time = new Date();
      this.timeV = time.getHours() + ":" + (time.getMinutes().toString().length === 1  ? '0' + time.getMinutes() : time.getMinutes());
    },
    date() {
      let arrayOfWeekdays = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ];
      let monthes = [
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
      ];

      let dateObj = new Date();
      let weekdayNumber = dateObj.getDay();
      let day = dateObj.getDate();
      let month = dateObj.getMonth();
      this.dateV =
        arrayOfWeekdays[weekdayNumber] + ", " + day + " " + monthes[month];
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/time";
</style>