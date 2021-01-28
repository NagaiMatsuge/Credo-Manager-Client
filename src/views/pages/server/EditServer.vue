<template>
  <div v-if="serverEdit" class="server">
    <SelectForm
        v-if="serverEdit"
        :server="serverEdit.server"
        :validator="$v.serverEdit"
        :blocked="true"
    />
    <ServerFtp
        v-if="serverEdit"
        :ftp="serverEdit.ftp_access"
        :validator="$v.serverEdit"
        :blocked="true"
    />
    <ServerDB
        v-if="serverEdit"
        :db="serverEdit.db_access"
        :validator="$v.serverEdit"
        :blocked="true"
    />
    <div class="server_add">
      <div class="server_add-submit">
        <button
            class="cancel"
            type="submit"
            @click.prevent="$router.push('/projects');"
        >Отменить изменения
        </button>
        <button
            class="add"
            @click.prevent="sendServer"
            type="submit"
        >Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectForm from '@/components/Server/ServerForm';
import ServerDB from '@/components/Server/ServerDB';
import ServerFtp from '@/components/Server/ServerFtp';
import {minLength, required} from "vuelidate/lib/validators";
export default {
   mounted() {
     this.$store.dispatch('getEditServer', this.$route.params.id)
   },
  validations: {
    serverEdit: {
      server:{
        title: {
          required,
          minLength: minLength(4)
        },
        host:{
          required,
          minLength: minLength(4)
        },
        type_id:{
          required
        }
      },
      db_access:{
        host: {
          required,
          minLength: minLength(4)
        },
        server_name: {
          required,
          minLength: minLength(4)
        },
        db_name: {
          required,
          minLength: minLength(4)
        },
        login: {
          required,
          minLength: minLength(4)
        },
        password: {
          required,
          minLength: minLength(8)
        },
        description: {
          required,
          minLength: minLength(10)
        },
      },
      ftp_access:{
        host: {
          required,
          minLength: minLength(4)
        },
        port: {
          required
        },
        login: {
          required,
          minLength: minLength(4)
        },
        password: {
          required,
          minLength: minLength(8)
        },
        description: {
          required,
          minLength: minLength(10)
        },
      }
    },
  },
  computed:{
   serverEdit(){
     return this.$store.getters.getEditServer
   }
  },
  components:{
    SelectForm,
    ServerDB,
    ServerFtp
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/pages/server/app";
</style>