<template>
  <div class="pagination">

  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  props: {
    pagination: {},
  },
  methods: {
    async paginationLink(url){
      try {
        await this.$store.dispatch('paginationLink', this.pagination.meta.links[url].url)
        await this.getPayments
      } catch (e) {}
    },
  }
}
</script>
<style lang="scss">

</style>