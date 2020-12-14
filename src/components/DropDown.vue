<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :key="index"
    >
      <router-link :to="item.link">{{item.name}}</router-link>
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