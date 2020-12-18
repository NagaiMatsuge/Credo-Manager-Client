<template>
  <div class="user__add-info">
    <div class="user__add-info-form">
      <h2>Данные сотрудника</h2>
      <form>
        <div class="user__add-group">
          <input
              type="text"
              placeholder="Имя"
              v-model="name"
              :class="{
                  invalid:
                    ($v.name.$dirty && !$v.name.required) ||
                    ($v.name.$dirty && !$v.name.minLength),
                }"
          />
          <small class="error" v-if="$v.name.$dirty && !$v.name.required">Введите имя</small>
          <small class="error" v-else-if="$v.name.$dirty && !$v.name.minLength">
            Имя должен содержать минимум {{ $v.name.$params.minLength.min }}  символов. Сейчас он {{ name.length }}
          </small>
        </div>
        <div class="user__add-group">
          <input
              type="text"
              placeholder="Email"
              v-model="email"
              onfocus="this.removeAttribute('readonly');"
              readonly
              disabled
              :class="{
                  invalid:
                    ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email),
                }"
          />
          <small class="error" v-if="$v.email.$dirty && !$v.email.required">Поле Email не должно быть пустым</small>
          <small class="error" v-else-if="$v.email.$dirty && !$v.email.email">Введите коректый Email</small>
        </div>
        <div class="user__add-group">
          <input
              type="text"
              placeholder="Телефонный номер"
              v-model="phone"
              onfocus="this.removeAttribute('readonly');"
              readonly
          />
        </div>
        <div class="user__add-group">
          <input
              :type="type"
              placeholder="Пароль"
              v-model="password"
              onfocus="this.removeAttribute('readonly');"
              readonly
              :class="{
                  invalid: ($v.password.$dirty && !$v.password.minLength),
                }"
          />
          <small class="error" v-else-if="$v.password.$dirty && !$v.password.minLength">
            Пароль должен быть {{ $v.password.$params.minLength.min }} символов. Сейчас он {{ password.length }}
          </small>
          <span v-if="type === 'text'" class="visible" @click="type = 'password'">
            <svg version="1.1" id="Capa_1" width="34" height="34"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 469.44 469.44" style="enable-background:new 0 0 469.44 469.44;" xml:space="preserve">
              <path fill="#B4B8CC" d="M231.147,160.373l67.2,67.2l0.32-3.52c0-35.307-28.693-64-64-64L231.147,160.373z"/>
              <path fill="#B4B8CC" d="M234.667,117.387c58.88,0,106.667,47.787,106.667,106.667c0,13.76-2.773,26.88-7.573,38.933l62.4,62.4c32.213-26.88,57.6-61.653,73.28-101.333c-37.013-93.653-128-160-234.773-160c-29.867,0-58.453,5.333-85.013,14.933l46.08,45.973C207.787,120.267,220.907,117.387,234.667,117.387z"/>
              <path fill="#B4B8CC" d="M21.333,59.253l48.64,48.64l9.707,9.707C44.48,145.12,16.64,181.707,0,224.053c36.907,93.653,128,160,234.667,160c33.067,0,64.64-6.4,93.547-18.027l9.067,9.067l62.187,62.293l27.2-27.093L48.533,32.053L21.333,59.253z M139.307,177.12l32.96,32.96c-0.96,4.587-1.6,9.173-1.6,13.973c0,35.307,28.693,64,64,64c4.8,0,9.387-0.64,13.867-1.6l32.96,32.96c-14.187,7.04-29.973,11.307-46.827,11.307C175.787,330.72,128,282.933,128,224.053C128,207.2,132.267,191.413,139.307,177.12z"/>
            </svg>
          </span>
          <span v-if="type === 'password'" class="visible" @click="type = 'text'">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.1484 17C13.1484 17.9863 13.5402 18.9322 14.2376 19.6296C14.935 20.327 15.8809 20.7188 16.8672 20.7188C17.8535 20.7188 18.7993 20.327 19.4967 19.6296C20.1942 18.9322 20.5859 17.9863 20.5859 17C20.5859 16.0137 20.1942 15.0678 19.4967 14.3704C18.7993 13.673 17.8535 13.2812 16.8672 13.2812C15.8809 13.2812 14.935 13.673 14.2376 14.3704C13.5402 15.0678 13.1484 16.0137 13.1484 17ZM31.284 16.1434C28.1363 9.5127 23.3783 6.17578 17 6.17578C10.6184 6.17578 5.86368 9.51269 2.71602 16.1467C2.58977 16.414 2.52429 16.706 2.52429 17.0017C2.52429 17.2973 2.58977 17.5893 2.71602 17.8566C5.86368 24.4873 10.6217 27.8242 17 27.8242C23.3816 27.8242 28.1363 24.4873 31.284 17.8533C31.5397 17.3154 31.5397 16.6912 31.284 16.1434ZM16.8672 22.8438C13.6399 22.8438 11.0234 20.2273 11.0234 17C11.0234 13.7727 13.6399 11.1562 16.8672 11.1562C20.0945 11.1562 22.7109 13.7727 22.7109 17C22.7109 20.2273 20.0945 22.8438 16.8672 22.8438Z" fill="#B4B8CC"/>
            </svg>
          </span>
        </div>
        <div class="user__add-group">
          <dynamic-select
              v-if="roles"
              :options="roles"
              option-value="name"
              option-text="name"
              placeholder="Выберите роль"
              v-model="role"
              :class="{ invalid: ($v.role.$dirty && $v.role.$model.name == 'Выберите роль')}"
          />
          <small class="error" v-if="$v.role.$dirty && $v.role.$model.name == 'Выберите роль'">Выберите роль</small>
        </div>
      </form>
    </div>

  </div>
</template>