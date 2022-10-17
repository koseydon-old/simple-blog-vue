<template>
  <v-col sm="9" md="12">
    <v-hover v-slot:default="{ hover }">
      <v-card
        id="first-card"
        :elevation="hover ? 12 : 2"
        shaped
        class="flex-column d-flex mx-auto"
        width="1280px"
        v-bind:to="'/' + item._id"
        color="rgb(255, 255, 255, 0.5)"
      >
        <v-row no-gutters class="mt-0">
          <v-col class="d-flex" md="8">
            <v-img
              id="first-card-image"
              class="white--text align-end"
              height="400px"
              :src="item.image"
            >
            </v-img>
          </v-col>
          <v-col class="d-flex flex-column" md="4">
            <v-card-subtitle class="pb-0">{{
              item.blogCategory
            }}</v-card-subtitle>
            <v-card-title id="first-card-blog-title" class="py-0">{{
              item.blogTitle
            }}</v-card-title>
            <v-card-text
              id="first-card-blog-subtitle"
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
  </v-col>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style>
#first-card-blog-title {
  font-size: 36px;
  line-height: 1.3;
}
#first-card-blog-subtitle {
  font-size: 24px;
  line-height: 1;
}
@media screen and (max-width: 960px) {
  #first-card {
    max-width: 400px;
  }
  #first-card-image {
    height: 200px !important;
  }
  #first-card-blog-title {
    font-size: inherit;
    line-height: inherit;
  }
  #first-card-blog-subtitle {
    font-size: inherit;
    line-height: inherit;
  }
}

@media screen and (max-width: 470px) {
  #first-card {
    max-width: inherit;
  }
}
</style>
