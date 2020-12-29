<template>
  <div class="app">
    <div class="wrap">
      <div ref="select"></div>
    </div>
  </div>
</template>
<script>
import {Select} from '@/utils/select/index'
export default {
  data(){
    return{

    }
  },
  props: {
    data: {},
    text: String,
    value: String,
    placeholder: String,
  },
  mounted() {
    new Select(this.$refs.select, {
      placeholder: this.placeholder,
      value: this.value,
      text: this.text,
      data: this.data,
      onSelect(item) {
        // this.onSelect(item)
        console.log(item)
      }
    })
  },
  // methods:{
  //   onSelect(item){
  //     this.$emit('modal', item)
  //   }
  // }
}
</script>
<style lang="scss">
@import "@/assets/scss/components/select";
</style>