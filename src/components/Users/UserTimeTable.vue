<template>
  <div class="user__add-workDays">
    <div class="user__add-workDays-form">
      <h2>График сотрудника</h2>
      <form @submit.prevent="submitHandler">
        <div class="user__add-group">
          <label>Начало работы</label>
          <vue-timepicker :minute-interval="5" v-model="work_start_time" placeholder="Начало работы" :class="{ invalid: ($v.work_start_time.$dirty && !$v.work_start_time.required)}"></vue-timepicker>
          <small class="error" v-if="$v.work_start_time.$dirty && !$v.work_start_time.required">Выберите начало работы</small>
        </div>

        <div class="user__add-group">
          <label>Завершение работы</label>
          <vue-timepicker :minute-interval="5" v-model="work_end_time" placeholder="Завершение работы" :class="{ invalid: ($v.work_end_time.$dirty && !$v.work_end_time.required)}"></vue-timepicker>
          <small class="error" v-if="$v.work_end_time.$dirty && !$v.work_end_time.required">Выберите завершение работы</small>
        </div>

        <div class="user__add-group">
          <label>Начало перерыва</label>
          <vue-timepicker :minute-interval="5" v-model="pause_start_time" placeholder="Начало перерыва" :class="{ invalid: ($v.pause_start_time.$dirty && !$v.pause_start_time.required)}"></vue-timepicker>
          <small class="error" v-if="$v.pause_start_time.$dirty && !$v.pause_start_time.required">Выберите начало перерыва</small>
        </div>

        <div class="user__add-group">
          <label>Завершение перерыва</label>
          <vue-timepicker :minute-interval="5" v-model="pause_end_time" placeholder="Завершение перерыва" :class="{ invalid: ($v.pause_end_time.$dirty && !$v.pause_end_time.required)}"></vue-timepicker>
          <small class="error" v-if="$v.pause_end_time.$dirty && !$v.pause_end_time.required">Выберите завершение перерыва</small>
        </div>
        <div class="user__add-checkbox">
          <input type="checkbox" id="working_days_1" v-model.number="working_days" value="1">
          <label for="working_days_1">ПН</label>

          <input type="checkbox" id="working_days_2" v-model.number="working_days" value="2">
          <label for="working_days_2">ВТ</label>

          <input type="checkbox" id="working_days_3" v-model.number="working_days" value="3">
          <label for="working_days_3">СР</label>

          <input type="checkbox" id="working_days_4" v-model.number="working_days" value="4">
          <label for="working_days_4">ЧТ</label>

          <input type="checkbox" id="working_days_5" v-model.number="working_days" value="5">
          <label for="working_days_5">ПТ</label>

          <input type="checkbox" id="working_days_6" v-model.number="working_days" value="6">
          <label for="working_days_6">СБ</label>

          <input type="checkbox" id="working_days_7" v-model.number="working_days" value="7">
          <label for="working_days_7">ВС</label>
          <small class="error" v-if="$v.working_days.$dirty && !$v.working_days.required">Выберите дни недели</small>

        </div>

      </form>
    </div>

  </div>
</template>