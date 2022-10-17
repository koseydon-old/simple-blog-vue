<template>
  <v-app>
    <div></div>
    <navbar />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navbar from "./components/navbar";

export default {
  name: "App",

  components: {
    navbar,
  },

  watch: {
    $route(to) {
      document.title = to.meta.title || "DreamForge";
    },
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  background-color: #f4f8fb;
  background-image: url(/backend/background/forge-background.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 70%;
}
</style>
