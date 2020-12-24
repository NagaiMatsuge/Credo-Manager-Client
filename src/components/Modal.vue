<template>
  <div class="modal">
    <div class="modal__wrapper"></div>
    <div class="modal__body">
      <div class="modal__text">
        Вы уверены?
      </div>
      <div class="modal__button">
        <button class="no" @click.prevent="modal(false)">Нет я просто нажал</button>
        <button class="yes" @click.prevent="modal(true)">Да</button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods: {
    modal (e) {
      this.$emit('modal', e)
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/var";
.modal{
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000000;
  top: 0;
  left: 0;
  right: 0;
  &__wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
  }
  &__text{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px 30px;
  }
  &__body{
    background: $white;
    color: $black;
    width: 400px;
    position: relative;
    border-radius: 10px;
  }
  &__button{
    display: flex;
    align-items: center;
    padding: 15px 30px;
    border-top: 1px solid $light8 ;
    justify-content: space-between;
    button{
      padding: 10px 25px;
      cursor: pointer;
      &.no{
        border: 1px solid $error;
        color: $error;
        background: none;
        border-radius: 4px;
      }
      &.yes{
        padding: 10px 45px;
        border: 1px solid $attention;
        color: $white;
        background: $attention;
      }

    }
  }
}
</style>