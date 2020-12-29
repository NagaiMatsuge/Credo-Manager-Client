<template>
  <div class="pagination">
    <paginate
        :page-count="pagination.meta.last_page"
        :prev-text="''"
        :next-text="''"
        :clickHandler="paginationLink"
        >
    </paginate>
<!--    <button v-for="(pagination, index) in pagination.meta.links" :key="index" @click.prevent="paginationLink(pagination.url)" :class="{active: pagination.active}" >-->
<!--      {{pagination.label}}-->
<!--    </button>-->
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
@import "@/assets/scss/var";
.pagination{
  width: 100%;
  height: auto;
  ul {
    display: flex;
    align-items: center;
    margin-right: auto;
    list-style: none;
    li {
      &:last-child,
      &:first-child{
        display: none;
      }
      &.active {
        a{
          background: $attention;
          color: $white;
          border: 1px solid $attention;
        }
      }
      a {
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        margin: 5px;
        background: none;
        color: $black;
        border: 1px solid $light8;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

      }
    }
  }

}
</style>