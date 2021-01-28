<template>
  <div class="server">
    {{serverAdd}}
    <SelectForm
      v-if="serverAdd"
      :server="serverAdd.server"
      :validator="$v.serverAdd"
    />
    <ServerFtp
        v-if="serverAdd && serverAdd.server.type_id"
        :ftp="serverAdd.ftp_access"
        :type_id="serverAdd.server.type_id"
        :validator="$v.serverAdd"
    />
    <ServerDB
        v-if="serverAdd && serverAdd.server.type_id"
        :db="serverAdd.db_access"
        :type_id="serverAdd.server.type_id"
        :validator="$v.serverAdd"
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
  data(){
    return {
    }
  },

  methods: {
    async sendServer() {
      // if (this.$v.$invalid) {
      //   this.$v.$touch();
      //   return;
      // }
      this.serverAdd.server.project_id = this.$route.params.id
      try {
        await this.$store.dispatch('createServer', this.serverAdd)
      }catch (e) {}
    },
  },
  validations: {
    serverAdd: {
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
    serverAdd(){
      return this.$store.getters.getServerAdd
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