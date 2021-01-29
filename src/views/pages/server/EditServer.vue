<template>
  <div v-if="serverEdit" class="server">
    <SelectForm
        v-if="serverEdit"
        :server="serverEdit.server"
        :validator="$v.serverEdit"
        :blocked="blocked"
    />
    <ServerFtp
        v-if="serverEdit"
        :ftp="serverEdit.ftp_access"
        :validator="$v.serverEdit"
        :blocked="blocked"
    />
    <ServerDB
        v-if="serverEdit"
        :db="serverEdit.db_access"
        :validator="$v.serverEdit"
        :blocked="blocked"
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
            @click.prevent="saveServer"
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
  data() {
    return {
      blocked: true
    }
  },
  async mounted() {
    await this.$store.commit('clearServer')
    await this.$store.dispatch('getEditServer', this.$route.params.server_id)
    if (this.serverEdit.server.type.id === '2') {
      this.blocked = false
    } else {
      this.blocked = true
    }
  },

  validations: {
    serverEdit: {
      server: {
        title: {
          required,
          minLength: minLength(4)
        },
        host: {
          required,
          minLength: minLength(4)
        },
        type_id: {
          required
        }
      },
      db_access: {
        host: {
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
      ftp_access: {
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
  computed: {
    serverEdit() {
      return this.$store.getters.getEditServer
    }
  },
  methods: {
    async saveServer() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch('updateServer', this.serverEdit)
        await this.$store.dispatch('serverAll', this.$route.params.id)
        await this.$store.commit('setNotification', 'successes-edit-server')
        await this.$router.push(`/server/${this.$route.params.id}`)
      }catch (e) {
      }
    }
  },
  components: {
    SelectForm,
    ServerDB,
    ServerFtp
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/pages/server/app";
</style>