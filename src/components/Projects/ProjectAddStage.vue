<template>
  <div class="projectAdd__stage">

    <div class="projectAdd__stage-body">

      <div class="projectAdd__stage-title">
        Этапы работы
      </div>
      <div class="projectAdd__stage-list">

        <form>
          <div class="projectAdd__stage-card" v-for="(form, index) in getInfoProject.steps" :key="index">

            <div class="projectAdd__stage-group">
              <input type="text" :id="`stage_name_${index}`" v-model="form.title" :class="{
              invalid:
              (validator.$each[index].title.$dirty && !validator.$each[index].title.required) ||
              (validator.$each[index].title.$dirty && !validator.$each[index].title.minLength),
              }"
              />
              <label :for="`stage_name_${index}`" :class="{focus: !(form.title === '')}">Наименовани этапа</label>


              <small
                  class="error"
                  v-if="validator.$each[index].title.$dirty && !validator.$each[index].title.required"
              >Введите название этапа</small>
              <small
                  class="error"
                  v-else-if="validator.$each[index].title.$dirty && !validator.$each[index].title.minLength"
              >
                Название этапа должен содержать минимум {{ validator.$each[index].title.$params.minLength.min }} символов. Сейчас он {{ form.title.length }}
              </small>

            </div>
            <div class="projectAdd__stage-group">
              <input type="text" :id="`stage_price_${index}`" v-model.number="form.price" :class="{
                invalid:
                (validator.$each[index].price.$dirty && !validator.$each[index].price.required) ||
                (validator.$each[index].price.$dirty && !validator.$each[index].price.maxLength),
                }"
              />
              <label :for="`stage_price_${index}`" :class="{focus: !(form.price === '')}">Сумма за этап</label>
              <small
                  class="error"
                  v-if="validator.$each[index].price.$dirty && !validator.$each[index].price.required"
              >Введите сумму этапа</small>
              <small
                  class="error"
                  v-else-if="validator.$each[index].price.$dirty && !validator.$each[index].price.maxLength"
              >
                Сумма этапа должен содержать максимум {{ validator.$each[index].price.$params.maxLength.max }} символов. Сейчас он {{ (form.price).toString().length }}
              </small>
            </div>
            <div class="projectAdd__stage-group currency">
              <DynamicSelect
                  v-if="getInfoProject.currencies"
                  :options="getInfoProject.currencies"
                  option-value="name"
                  option-text="name"
                  placeholder=""
                  v-model="form.currency_id"
                  :id="`stage_currency_${index}`"
              />
              <label :for="`stage_currency_${index}`" :class="{focus: !(form.currency_id.name === '')}">Валюта</label>
            </div>
            <div class="projectAdd__stage-group">
              <DynamicSelect
                  v-if="getInfoProject.payment_types"
                  :options="getInfoProject.payment_types"
                  option-value="name"
                  option-text="name"
                  placeholder=""
                  v-model="form.payment_type"
                  :id="`stage_method_${index}`"
              />
              <label :for="`stage_method_${index}`" :class="{focus: !(form.payment_type.name === '')}">Метод
                оплаты</label>
            </div>
            <div class="projectAdd__stage-group close" @click="deleteForm(index)">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.01836 8.00002L15.0056 2.0128C15.1239 1.87463 15.1857 1.69691 15.1787 1.51515C15.1717 1.33338 15.0963 1.16096 14.9677 1.03233C14.8391 0.90371 14.6667 0.828359 14.4849 0.821338C14.3031 0.814317 14.1254 0.876144 13.9873 0.994463L8.00003 6.98169L2.01281 0.987241C1.87681 0.851244 1.69236 0.774841 1.50003 0.774841C1.3077 0.774841 1.12325 0.851244 0.98725 0.987241C0.851253 1.12324 0.774851 1.30769 0.774851 1.50002C0.774851 1.69235 0.851253 1.8768 0.98725 2.0128L6.98169 8.00002L0.98725 13.9872C0.911647 14.052 0.850243 14.1317 0.806893 14.2213C0.763543 14.3109 0.739182 14.4085 0.73534 14.5079C0.731499 14.6074 0.748258 14.7066 0.784567 14.7993C0.820877 14.8919 0.875952 14.9761 0.946336 15.0465C1.01672 15.1169 1.10089 15.1719 1.19357 15.2083C1.28625 15.2446 1.38544 15.2613 1.4849 15.2575C1.58436 15.2536 1.68196 15.2293 1.77156 15.1859C1.86116 15.1426 1.94084 15.0812 2.00558 15.0056L8.00003 9.01835L13.9873 15.0056C14.1254 15.1239 14.3031 15.1857 14.4849 15.1787C14.6667 15.1717 14.8391 15.0963 14.9677 14.9677C15.0963 14.8391 15.1717 14.6667 15.1787 14.4849C15.1857 14.3031 15.1239 14.1254 15.0056 13.9872L9.01836 8.00002Z" fill="#E53750"/>
                </svg>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
    <button class="projectAdd__stage-add" @click="pushForm">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 8.4718H8.46612V14H5.56263V8.4718H0V5.55692H5.56263V0H8.46612V5.55692H14V8.4718Z" fill="#4473F6"/>
      </svg>
      Добавить этап
    </button>
  </div>
</template>
<script>

import DynamicSelect from "vue-dynamic-select";
export default {
  data() {
    return {}
  },
  props: {
    getInfoProject: {},
    validator: {}
  },

  methods: {
    pushForm() {
      this.getInfoProject.steps.push({
        id: null,
        title: '',
        price: '',
        currency_id: {
          id: 1,
          name: 'USD'
        },
        payment_type: {
          id: 1,
          name: 'Qiwi'
        },
      })
    },
    deleteForm($event) {
      this.getInfoProject.steps.splice($event, 1)
      if (this.getInfoProject.steps.length === 0){
        this.pushForm()
      }
    },
  },
  components: {
    DynamicSelect
  }
}
</script>