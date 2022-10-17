<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      color="rgb(255, 255, 255, 0.5)"
      :elevation="hover ? 12 : 2"
      shaped
      width="400"
      class="flex-column d-flex mx-auto"
      v-bind:to="'/' + item._id"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        max-height="200px"
        :src="item.image"
      >
      </v-img>
      <v-card-subtitle class="pb-0">{{ item.blogCategory }}</v-card-subtitle>
      <v-card-title class="py-0">{{ item.blogTitle }}</v-card-title>
      <v-card-text
        v-text="item.blogSubTitle"
        class="text--primary pb-0"
      ></v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-avatar size="30">
          <v-img :src="item.avatar"></v-img>
        </v-avatar>
        <v-spacer></v-spacer>
        <v-card-subtitle v-text="item.newDate"> </v-card-subtitle>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["item"],
};
</script>
