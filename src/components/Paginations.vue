<template>
  <div class="pagination">
    <button v-for="(pagination, index) in pagination.meta.links" :key="index" @click.prevent="paginationLink(pagination.url)" :class="{active: pagination.active, disabled: (pagination.url === null)}">
      {{pagination.label}}
    </button>
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
        await this.$store.dispatch('paginationLink', url)
        await this.getPayments
      } catch (e) {}
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/var";
.pagination{
  display: flex;
  align-items: center;
  margin-right: auto;
  button{
    cursor: pointer;
    margin: 0;
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
    &.active{
      background: $attention;
      color: $white;
      border: 1px solid $attention;
    }
    &.disabled{
      background: $light8;
      color: $black;
      border: 1px solid $light8;
      &:last-child,
      &:first-child{
        font-size: 0px;
        &:before{
          border-top: 5px solid $white ;
          border-bottom: 5px solid transparent ;
          border-right: 5px solid transparent ;
          border-left: 5px solid $white ;
        }
      }
    }
    &:last-child,
    &:first-child{
      font-size: 0px;
      &:before{
        content: '';
        border-top: 5px solid $light8 ;
        border-bottom: 5px solid transparent ;
        border-right: 5px solid transparent ;
        border-left: 5px solid $light8 ;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);

      }
    }
    &:last-child{
      &:before{
        transform: translate(-50%, -50%) rotate(135deg);
      }
    }
  }
}
</style>