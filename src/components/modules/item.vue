<template>
  <li class="img">
    <img :src="src" alt="search result image">
  </li>
</template>

<script>
export default {
  props: ["src"]
}
</script>


<style lang="scss" scoped>
.img {
  width: 14.666%;
  margin: 1%;
  img {
    display: block;
    width: 100%;
  }
}
</style>
