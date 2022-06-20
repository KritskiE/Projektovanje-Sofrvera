<template>
  <div id="appl">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/navigation/Header.vue'

export default {
  name: "App",
  components: {
    Header,
  },
  // mounted() {
  //   if (localStorage.getItem("client")) {
  //     this.$store.commit("SET_CLIENT", localStorage.getItem("client"));
  //   }
  // },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
html{
  overflow-y: auto !important;
}
</style>
