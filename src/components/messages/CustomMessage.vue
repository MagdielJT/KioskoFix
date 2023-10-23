<template>
  <div class="container">
    <div v-html="msg"></div>
  </div>
</template>

<script>
export default {
  name: "CustomMessage",
  props: {msg: String}
}
</script>

<style scoped>

</style>