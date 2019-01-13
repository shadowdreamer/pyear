<template>
  <div id="app">

    <LayoutZH v-if="lang == 'zh-CN'"></LayoutZH>
    <LayoutJA v-else></LayoutJA>
  </div>
</template>

<script>
import LayoutJA from "./components/LayoutJA.vue";
import LayoutZH from "./components/LayoutZH.vue";

export default {
  name: "app",
  components: {
    LayoutJA,
    LayoutZH
  },
  computed: {
    lang() {
      return navigator.language;
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
