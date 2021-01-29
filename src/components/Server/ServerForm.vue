<template>
  <div class="server__form">

    <div class="server__form-title">
      Основная информация
    </div>
    <div class="server__form-group">
      <input
          type="text"
          id="title"
          v-model="server.title"
          :class="{
            invalid:
            (validator.server.title.$dirty && !validator.server.title.required) ||
            (validator.server.title.$dirty && !validator.server.title.minLength),
          }"
      >
      <label for="title" :class="{focus: !(server.title === '')}">Название</label>
      <small
          class="error"
          v-if="validator.server.title.$dirty && !validator.server.title.required"
      >Введите название</small>
      <small
          class="error"
          v-else-if="validator.server.title.$dirty && !validator.server.title.minLength"
      >
        Название должен содержать минимум {{ validator.server.title.$params.minLength.min }} символов. Сейчас он
        {{ server.title.length }}
      </small>
    </div>
    <div class="server__form-group">
      <input
          type="text"
          id="host"
          v-model="server.host"
          :disabled="blocked"
          :class="{
            invalid:
            (validator.server.host.$dirty && !validator.server.host.required) ||
            (validator.server.host.$dirty && !validator.server.host.minLength),
          }"
      >
      <label for="host" :class="{focus: !(server.host === '')}">Введите хост</label>
      <small
          class="error"
          v-if="validator.server.host.$dirty && !validator.server.host.required"
      >Введите хост</small>
      <small
          class="error"
          v-else-if="validator.server.host.$dirty && !validator.server.host.minLength"
      >
        Название хост должен содержать минимум {{ validator.server.host.$params.minLength.min }} символов. Сейчас он
        {{ server.host.length }}
      </small>
    </div>

    <div class="server__form-group">
      <Select
          :options="server.type"
          :value="type"
          :optionId="'id'"
          :optionValue="'title'"
          id="projects"
          @change="serverType"
          :disabled="blocked || $route.params.server_id"
          :class="{
                invalid: validator.server.type_id.$dirty && !validator.server.type_id.required
              }"
      />
      <label for="projects" :class="{focus: !(type.title === '')}">Выберите проект</label>
      <small
          class="error"
          v-if="validator.server.type_id.$dirty && !validator.server.type_id.required"
      >Выберите проект</small>

    </div>
  </div>
</template>

<script>
import Select from "@/components/Select";

export default {
  name: 'SelectForm',
  data(){
    return{
      type: {
        id: 0,
        title: ''
      }
    }
  },
  props:{
    server:{},
    validator:{},
    blocked: Boolean
  },
  methods:{
    serverType(e){
      this.server.type_id = e.id
      this.type = e
    }
  },
  mounted() {
    if (this.server.type.id){
      this.type = this.server.type
      this.server.type_id = this.type.id
    }
  },
  components:{
    Select
  }
}
</script>