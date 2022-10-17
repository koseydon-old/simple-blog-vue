<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      v-bind:to="'/' + item._id"
      :elevation="hover ? 12 : 2"
      shaped
      class="mx-auto"
      width="1280px"
      color="rgb(255, 255, 255, 0.5)"
    >
      <v-row no-gutters class="mt-0">
        <v-col class="d-flex" sm="6" md="4">
          <v-img
            class="white--text align-end"
            height="200px"
            min-height="212px"
            :src="item.image"
          >
          </v-img>
        </v-col>
        <v-col class="d-flex flex-column" sm="6" md="8">
          <v-card-subtitle id="itemCategory" class="pb-0"
            >{{ item.blogCategory }}
          </v-card-subtitle>
          <v-card-title id="itemTitle" class="py-0">{{
            item.blogTitle
          }}</v-card-title>
          <v-card-text
            id="itemSubtitle"
            v-text="item.blogSubTitle"
            class="text--primary pb-0"
          >
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-avatar size="30">
              <v-img :src="item.avatar"></v-img>
            </v-avatar>
            <v-spacer></v-spacer>
            <v-card-subtitle v-text="item.newDate"> </v-card-subtitle>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style>
#itemTitle {
  font-size: 36px;
  line-height: 1;
}

#itemSubtitle {
  font-size: 20px;
  line-height: 1;
}

@media screen and (max-width: 960px) {
  #itemTitle {
    font-size: 24px;
  }
  #itemSubtitle {
    font-size: 16px;
  }
  #site-logo {
    margin-bottom: -50px;
  }
}
@media screen and (max-width: 600px) {
  #sort-buttons {
    margin: -8px;
  }
  #site-logo {
    margin-bottom: -50px;
  }
}
</style>
