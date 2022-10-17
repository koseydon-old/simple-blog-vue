<template>
  <v-container>
    <v-row class="mt-10" justify="center">
      <v-card color="rgb(255, 255, 255, 0.5)" outlined flat width="1000px">
        <v-row justify="center">
          <v-col cols="9">
            <v-card-title>
              <span class="blogTitle">
                {{ item.blogTitle }}
              </span>
            </v-card-title>
            <v-card-subtitle>
              <span class="blogSubtitle">
                {{ item.blogSubTitle }}
              </span>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="9">
            <v-list-item class="grow">
              <v-col cols="12" sm="12">
                <v-row>
                  <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title> {{ item.author }} </v-list-item-title>
                  </v-list-item-content>
                  <v-card-subtitle v-text="item.newDate"> </v-card-subtitle>
                </v-row>
              </v-col>
            </v-list-item>
          </v-col>
        </v-row>
        <v-col>
          <v-img
            class="white--text align-end"
            :src="item.image"
            contain
            max-height="400px"
          ></v-img>
        </v-col>
        <v-row justify="center">
          <v-col md="8" cols="10">
            <v-card-subtitle>{{ item.blogCategory }}</v-card-subtitle>
            <v-card-text>
              <span v-html="item.blogText" class="blogText"></span>
            </v-card-text>
            <v-flex class="d-flex justify-space-between">
              <v-btn
                v-show="toggleUserSignin"
                @click="blogEdit"
                fab
                dark
                small
                text
                color="grey"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-speed-dial v-show="toggleUserSignin" direction="right">
                <template v-slot:activator>
                  <v-btn fab text left small color="grey">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-btn fab dark small text color="grey">
                  <v-icon>mdi-close-thick</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteBlogPost(item._id)"
                  fab
                  dark
                  small
                  text
                  color="grey"
                >
                  <v-icon>mdi-check-bold</v-icon>
                </v-btn>
              </v-speed-dial>
            </v-flex>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Endpoints from "../../data/Endpoints";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  data() {
    return {
      toggleUserSignin: false,
      id: this.$route.params.id,
      item: [],
    };
  },
  async created() {
    let response = await this.$http.get(Endpoints.blogSingleView + this.id);
    this.item = response.body;
    console.log(this.item);
    this.item.newDate = this.item.date
      ? format(parseISO(this.item.date), "do MMM yyyy")
      : "";
    let responseToken = await this.$http.get(Endpoints.validateToken, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    if (responseToken.status === 200) {
      this.toggleUserSignin = true;
    }
  },
  computed: {
    formatedDate() {
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    },
  },
  methods: {
    blogEdit() {
      window.location.href = "/editblog/" + this.$route.params.id;
    },
    async deleteBlogPost(id) {
      await this.$http.delete(Endpoints.blogSingleItemDelete + id, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      window.location.href = "/blog";
    },
  },
};
</script>

<style>
.blogTitle {
  font-size: 48px;
  line-height: 1;
  text-align: center;
  display: flex;
  padding-bottom: 20px;
  word-break: normal;
}

.blogSubtitle {
  font-size: 32px;
  line-height: 1;
  text-align: center;
  display: flex;
}

.blogText {
  font-size: 20px;
  text-align: justify;
}
@media screen and (max-width: 960px) {
  .blogTitle {
    font-size: 32px;
  }
  .blogSubtitle {
    font-size: 24px;
  }
}
</style>
