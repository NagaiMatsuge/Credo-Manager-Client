<template>
  <div class="payments">
    <div class="payments__head">
      <div class="payments__date">Дата зачисления</div>
      <div class="payments__comments">Комментарий</div>
      <div class="payments__step">Относится к этапу</div>
      <div class="payments__amount">Зачислено</div>
      <div class="payments__dept">Остаток по этапу</div>
      <div class="payments__payment">Метод оплаты</div>
      <div class="payments__btn"></div>
    </div>
    <div class="payments__form">
      <form>
        <div class="payments__date">
          <div class="payments__form-group">
            <Datepicker :language="lang" :disabled-dates="disabledDates" id="date"
                        v-model="formData.payment_date" :format="format"/>
            <label for="date" :class="{focus: !(formData.payment_date === '')}">Дата</label>
          </div>
        </div>
        <div class="payments__comments">
          <div class="payments__form-group">
            <input type="text" id="comments" v-model="formData.comment">
            <label for="comments" :class="{focus: !(formData.comment === '')}">Комментарий</label>
          </div>
        </div>
        <div class="payments__step">
          <div class="payments__form-group">
            <Select
                :options="getInfoProjectInPayments.steps"
                :value="formData.step"
                :optionId="'id'"
                :optionValue="'title'"
                @change="step($event)"
                id="step"
            />
            <label for="step" :class="{focus: !(formData.step.title === '')}">Оплачиваемый этап</label>
          </div>
        </div>
        <div class="payments__amount">
          <div class="payments__form-group">
            <input type="text" v-model.number="formData.amount" id="amount">
            <label for="amount" :class="{focus: !(formData.amount === null)}">Зачислено</label>
          </div>
        </div>
        <div class="payments__dept">
          <div class="payments__form-group">
            <input type="text" disabled v-model="formData.currency_id.name" id="dept">
            <label for="dept" :class="{focus: !(formData.currency_id.name === '')}">Валюта</label>
          </div>
        </div>
        <div class="payments__payment">
          <div class="payments__form-group" style="width: 100%;">
            <Select
                :options="getInfoProjectInPayments.payment_types"
                :value="formData.payment_type"
                :optionId="'id'"
                :optionValue="'name'"
                @change="e => formData.payment_type = e"
                id="method"
            />
            <label :for="`method`" :class="{focus: !(formData.payment_type.name === '')}">Метод
              оплаты</label>
          </div>
        </div>
        <div class="payments__btn" v-if="edit">
          <button @click.prevent="submitEditPayment">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.40909 11.3724L2.02841 7.99174C1.65499 7.61832 1.04956 7.61832 0.676136 7.99174V7.99174C0.302716 8.36516 0.302717 8.9706 0.676136 9.34402L5.40909 14.077L16.3239 3.1622C16.6973 2.78878 16.6973 2.18335 16.3239 1.80993V1.80993C15.9504 1.43651 15.345 1.43651 14.9716 1.80993L5.40909 11.3724Z" fill="#29CC97"/>
            </svg>
          </button>
          <button @click.prevent="cls">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.58204 8.49999L15.9435 2.13857C16.0692 1.99177 16.1349 1.80294 16.1274 1.60982C16.12 1.41669 16.0399 1.23349 15.9032 1.09683C15.7666 0.960166 15.5834 0.880105 15.3902 0.872645C15.1971 0.865185 15.0083 0.930877 14.8615 1.05659L8.50006 7.41801L2.13864 1.04892C1.99414 0.90442 1.79816 0.823242 1.59381 0.823242C1.38946 0.823242 1.19348 0.90442 1.04899 1.04892C0.904491 1.19341 0.823313 1.38939 0.823313 1.59374C0.823313 1.79809 0.904491 1.99407 1.04899 2.13857L7.41809 8.49999L1.04899 14.8614C0.968659 14.9302 0.903418 15.0149 0.857358 15.1101C0.811299 15.2053 0.785416 15.309 0.781334 15.4146C0.777252 15.5203 0.795059 15.6257 0.833637 15.7242C0.872216 15.8227 0.930734 15.9121 1.00552 15.9869C1.0803 16.0617 1.16973 16.1202 1.26821 16.1587C1.36668 16.1973 1.47206 16.2151 1.57774 16.2111C1.68342 16.207 1.78712 16.1811 1.88232 16.135C1.97752 16.089 2.06218 16.0237 2.13097 15.9434L8.50006 9.58197L14.8615 15.9434C15.0083 16.0691 15.1971 16.1348 15.3902 16.1273C15.5834 16.1199 15.7666 16.0398 15.9032 15.9032C16.0399 15.7665 16.12 15.5833 16.1274 15.3902C16.1349 15.197 16.0692 15.0082 15.9435 14.8614L9.58204 8.49999Z" fill="#E53750"/>
            </svg>
          </button>
        </div>
        <div class="payments__btn" v-else>
          <button @click.prevent="submitAddPayment">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.40909 11.3724L2.02841 7.99174C1.65499 7.61832 1.04956 7.61832 0.676136 7.99174V7.99174C0.302716 8.36516 0.302717 8.9706 0.676136 9.34402L5.40909 14.077L16.3239 3.1622C16.6973 2.78878 16.6973 2.18335 16.3239 1.80993V1.80993C15.9504 1.43651 15.345 1.43651 14.9716 1.80993L5.40909 11.3724Z" fill="#29CC97"/>
            </svg>
          </button>
          <button @click.prevent="cls">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.58204 8.49999L15.9435 2.13857C16.0692 1.99177 16.1349 1.80294 16.1274 1.60982C16.12 1.41669 16.0399 1.23349 15.9032 1.09683C15.7666 0.960166 15.5834 0.880105 15.3902 0.872645C15.1971 0.865185 15.0083 0.930877 14.8615 1.05659L8.50006 7.41801L2.13864 1.04892C1.99414 0.90442 1.79816 0.823242 1.59381 0.823242C1.38946 0.823242 1.19348 0.90442 1.04899 1.04892C0.904491 1.19341 0.823313 1.38939 0.823313 1.59374C0.823313 1.79809 0.904491 1.99407 1.04899 2.13857L7.41809 8.49999L1.04899 14.8614C0.968659 14.9302 0.903418 15.0149 0.857358 15.1101C0.811299 15.2053 0.785416 15.309 0.781334 15.4146C0.777252 15.5203 0.795059 15.6257 0.833637 15.7242C0.872216 15.8227 0.930734 15.9121 1.00552 15.9869C1.0803 16.0617 1.16973 16.1202 1.26821 16.1587C1.36668 16.1973 1.47206 16.2151 1.57774 16.2111C1.68342 16.207 1.78712 16.1811 1.88232 16.135C1.97752 16.089 2.06218 16.0237 2.13097 15.9434L8.50006 9.58197L14.8615 15.9434C15.0083 16.0691 15.1971 16.1348 15.3902 16.1273C15.5834 16.1199 15.7666 16.0398 15.9032 15.9032C16.0399 15.7665 16.12 15.5833 16.1274 15.3902C16.1349 15.197 16.0692 15.0082 15.9435 14.8614L9.58204 8.49999Z" fill="#E53750"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
    <div class="payments__lists" v-if="getPayments.data.length !== 0">
      <div  class="payments__list" v-for="(payment, index) in getPayments.data" :key="index">
        <div class="payments__date">{{ payment.payment_date }}</div>
        <div class="payments__comments">{{ payment.comment }}</div>
        <div class="payments__step">{{ payment.step.title }}</div>
        <div class="payments__amount">{{ payment.amount }} {{ payment.currency.name }}</div>
        <div class="payments__dept">{{ payment.step.debt }} {{ payment.currency.name }}</div>
        <div class="payments__payment">
          <img v-if="payment.payment_type.url" :src="domain+payment.payment_type.url" alt="">
          {{ payment.payment_type.name }}</div>
        <div class="payments__btn" >
          <button @click="updatePayments(payment)">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.7749 11.0156C3.8042 11.0156 3.8335 11.0127 3.86279 11.0083L6.32666 10.5762C6.35596 10.5703 6.38379 10.5571 6.4043 10.5352L12.6138 4.32568C12.6273 4.31213 12.6381 4.29604 12.6455 4.27831C12.6528 4.26059 12.6566 4.2416 12.6566 4.22241C12.6566 4.20323 12.6528 4.18423 12.6455 4.16651C12.6381 4.14879 12.6273 4.13269 12.6138 4.11914L10.1792 1.68311C10.1514 1.65527 10.1147 1.64062 10.0752 1.64062C10.0356 1.64062 9.99902 1.65527 9.97119 1.68311L3.76172 7.89258C3.73975 7.91455 3.72656 7.94092 3.7207 7.97021L3.28857 10.4341C3.27432 10.5126 3.27942 10.5933 3.30341 10.6694C3.3274 10.7454 3.36957 10.8145 3.42627 10.8706C3.52295 10.9644 3.64453 11.0156 3.7749 11.0156ZM4.76221 8.46094L10.0752 3.14941L11.1489 4.22314L5.83594 9.53467L4.53369 9.76465L4.76221 8.46094ZM12.8906 12.2461H2.10938C1.8501 12.2461 1.64062 12.4556 1.64062 12.7148V13.2422C1.64062 13.3066 1.69336 13.3594 1.75781 13.3594H13.2422C13.3066 13.3594 13.3594 13.3066 13.3594 13.2422V12.7148C13.3594 12.4556 13.1499 12.2461 12.8906 12.2461Z" fill="#B4B8CC"/>
            </svg>
          </button>
          <button @click="deletePayments(payment)">
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.15625 5.15625C4.28057 5.15625 4.3998 5.20564 4.48771 5.29354C4.57561 5.38145 4.625 5.50068 4.625 5.625V11.25C4.625 11.3743 4.57561 11.4935 4.48771 11.5815C4.3998 11.6694 4.28057 11.7188 4.15625 11.7188C4.03193 11.7188 3.9127 11.6694 3.82479 11.5815C3.73689 11.4935 3.6875 11.3743 3.6875 11.25V5.625C3.6875 5.50068 3.73689 5.38145 3.82479 5.29354C3.9127 5.20564 4.03193 5.15625 4.15625 5.15625V5.15625ZM6.5 5.15625C6.62432 5.15625 6.74355 5.20564 6.83146 5.29354C6.91936 5.38145 6.96875 5.50068 6.96875 5.625V11.25C6.96875 11.3743 6.91936 11.4935 6.83146 11.5815C6.74355 11.6694 6.62432 11.7188 6.5 11.7188C6.37568 11.7188 6.25645 11.6694 6.16854 11.5815C6.08064 11.4935 6.03125 11.3743 6.03125 11.25V5.625C6.03125 5.50068 6.08064 5.38145 6.16854 5.29354C6.25645 5.20564 6.37568 5.15625 6.5 5.15625V5.15625ZM9.3125 5.625C9.3125 5.50068 9.26311 5.38145 9.17521 5.29354C9.0873 5.20564 8.96807 5.15625 8.84375 5.15625C8.71943 5.15625 8.6002 5.20564 8.51229 5.29354C8.42439 5.38145 8.375 5.50068 8.375 5.625V11.25C8.375 11.3743 8.42439 11.4935 8.51229 11.5815C8.6002 11.6694 8.71943 11.7188 8.84375 11.7188C8.96807 11.7188 9.0873 11.6694 9.17521 11.5815C9.26311 11.4935 9.3125 11.3743 9.3125 11.25V5.625Z" fill="#B4B8CC"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5938 2.8125C12.5938 3.06114 12.495 3.2996 12.3192 3.47541C12.1433 3.65123 11.9049 3.75 11.6562 3.75H11.1875V12.1875C11.1875 12.6848 10.99 13.1617 10.6383 13.5133C10.2867 13.865 9.80978 14.0625 9.3125 14.0625H3.6875C3.19022 14.0625 2.71331 13.865 2.36167 13.5133C2.01004 13.1617 1.8125 12.6848 1.8125 12.1875V3.75H1.34375C1.09511 3.75 0.856653 3.65123 0.680837 3.47541C0.505022 3.2996 0.40625 3.06114 0.40625 2.8125V1.875C0.40625 1.62636 0.505022 1.3879 0.680837 1.21209C0.856653 1.03627 1.09511 0.9375 1.34375 0.9375H4.625C4.625 0.68886 4.72377 0.450403 4.89959 0.274587C5.0754 0.0987721 5.31386 0 5.5625 0L7.4375 0C7.68614 0 7.9246 0.0987721 8.10041 0.274587C8.27623 0.450403 8.375 0.68886 8.375 0.9375H11.6562C11.9049 0.9375 12.1433 1.03627 12.3192 1.21209C12.495 1.3879 12.5938 1.62636 12.5938 1.875V2.8125ZM2.86063 3.75L2.75 3.80531V12.1875C2.75 12.4361 2.84877 12.6746 3.02459 12.8504C3.2004 13.0262 3.43886 13.125 3.6875 13.125H9.3125C9.56114 13.125 9.7996 13.0262 9.97541 12.8504C10.1512 12.6746 10.25 12.4361 10.25 12.1875V3.80531L10.1394 3.75H2.86063ZM1.34375 2.8125V1.875H11.6562V2.8125H1.34375Z" fill="#B4B8CC"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
    <div v-else class="payments__lists">
      <div class="payments__list" style="text-align:center; justify-content: center">
        Оплат нет
      </div>
    </div>

  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import lang from 'vuejs-datepicker/dist/locale/translations/ru';
import Select from '@/components/Select';
export default {
  data(){
    return{
      format: 'yyyy-MM-dd',
      disabledDates: {
        to: new Date(),
      },
      lang,
      formData:{
        id: null,
        payment_date: new Date(),
        comment: '',
        step: {
          id: null,
          title: '',
        },
        amount: null,
        currency_id: {
          name: '',
          id: null
        },
        payment_type: {
          id: 1,
          name: "Qiwi"
        }
      },
      domain: process.env.VUE_APP_DOMAIN,
      edit: false
    }
  },
  methods:{
    async submitAddPayment(){
      let date = new Date();
      let seconds = date.getSeconds();
      let minutes = date.getMinutes();
      let hour = date.getHours();
      let payment_date = document.getElementById('date').value + ` ${hour}:${minutes}:${seconds}`;
      let formData = {
        comment: this.formData.comment,
        payment_date: payment_date,
        step_id: this.formData.step.id,
        currency_id: this.formData.currency_id.id,
        amount: this.formData.amount,
        payment_type: this.formData.payment_type.id,
      }
      try{
        await this.$store.dispatch('createPayment', formData)
        await this.$store.dispatch("fetchProjectPayments", this.$route.params.id);
        this.cls()
      }catch (e){}
    },
    async submitEditPayment(){
      let date = new Date();
      let seconds = date.getSeconds();
      let minutes = date.getMinutes();
      let hour = date.getHours();
      let payment_date = document.getElementById('date').value + ` ${hour}:${minutes}:${seconds}`;
      let formData = {
        id: this.formData.id,
        comment: this.formData.comment,
        payment_date: payment_date,
        step_id: this.formData.step.id,
        currency_id: this.formData.currency_id.id,
        amount: this.formData.amount,
        payment_type: this.formData.payment_type.id,
      }
      try{
        await this.$store.dispatch('editPayment', formData)
        await this.$store.dispatch("fetchProjectPayments", this.$route.params.id);
        this.cls()
      }catch (e){}
    },
    updatePayments(e){
      this.edit = true
      this.formData.id = e.id
      this.formData.comment = e.comment
      this.formData.payment_date = e.payment_date
      this.formData.step.id = e.step.id
      this.formData.step.title = e.step.title
      this.formData.amount = e.amount
      this.formData.currency_id.id = e.currency.id
      this.formData.currency_id.name =  e.currency.name
      this.formData.payment_type.id = e.payment_type.id
      this.formData.payment_type.name =  e.payment_type.name
    },
    async deletePayments(payment){
      try{
        await this.$store.dispatch('deletePayment', payment.id)
        await this.$store.dispatch("fetchProjectPayments", this.$route.params.id);
      }catch (e){}
    },
    step(e){
      if (e){
        this.formData.step = e
        this.formData.currency_id.name = e.currency_id.name
        this.formData.currency_id.id = e.currency_id.id
      }
    },
    cls(){
      this.edit = false
      this.formData.comment = ''
      this.formData.step.id = null
      this.formData.step.title = ''
      this.formData.payment_date = new Date()
      this.formData.amount = null
      this.formData.currency_id.name = ''
      this.formData.currency_id.id = null
      this.formData.payment_type.id = 1
      this.formData.payment_type.name =  "Qiwi"

    }
  },
  props: {
    getInfoProjectInPayments: {},
    getPayments: {},
    validator: {}
  },
  components: {
    Datepicker,
    Select
  }
}
</script>
