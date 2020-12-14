<template>
  <ul class="header__dropdown">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="header__dropdown__item"
    >
      <div @click.prevent="item.callBack">{{item.name}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style>
</style>