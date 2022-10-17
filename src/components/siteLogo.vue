<template>
  <v-content>
    <v-img
      id="web-site-logo"
      width="600px"
      height="200px"
      color="grey"
      tile
      class="mx-auto mt-12"
      :src="siteLogo"
      contain
    ></v-img>
  </v-content>
</template>

<script>
import ImageLinks from "../data/ImageLinks";

export default {
  data: () => ({
    siteLogo: ImageLinks.images.Logo,
  }),
};
</script>
