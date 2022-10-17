<template>
  <v-content>
    <siteLogo />
    <v-container>
      <v-row justify="center">
        <v-col class="d-flex" cols="9">
          <v-layout id="layout" class="mb-n5 me-5">
            <v-row>
              <v-col
                v-for="n in sortItems.length"
                :key="n"
                id="sort-buttons"
                class="d-flex"
                sm="3"
                md="2"
                xl="1"
                cols="12"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      small
                      text
                      color="grey"
                      class="ml-3"
                      @click="sort(n)"
                      v-on="on"
                    >
                      <v-icon left small>{{
                        sortItems[n - 1].sortIcon
                      }}</v-icon>
                      <span class="caption text-lowercase">{{
                        sortItems[n - 1].sortType
                      }}</span>
                    </v-btn>
                  </template>
                  <span>{{ sortItems[n - 1].sortTooltip }}</span>
                </v-tooltip>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex flex-column" md="6" cols="12">
                <v-text-field
                  class="mt-n2"
                  solo-inverted
                  rounded
                  flat
                  hide-details
                  dense
                  color="black"
                  placeholder="search"
                  v-model="search"
                  append-icon="mdi-magnify"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-layout>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          v-for="(item, i) in filteredPosts"
          :key="i"
        >
          <blogSingleCard :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Endpoints from "../../data/Endpoints";
import SortItems from "../../data/SortItems";
import { sortBlogKeyword } from "../../data/Funcs";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  name: "blog",

  data: () => ({
    sortItems: [],
    fab: true,
    searchToggle: false,
    search: "",
    items: [],
  }),

  components: {
    blogSingleCard: () => import("../cards/blogSingleCard"),
    siteLogo: () => import("../siteLogo"),
  },

  methods: {
    sort(prop) {
      let keyword = sortBlogKeyword(prop);
      if (this.searchToggle) {
        this.items.sort((a, b) => (a[keyword] < b[keyword] ? -1 : 1));
        this.searchToggle = !this.searchToggle;
      } else {
        this.items.sort((a, b) => (b[keyword] < a[keyword] ? -1 : 1));
        this.searchToggle = !this.searchToggle;
      }
    },
  },

  computed: {
    filteredPosts() {
      return this.items.filter((item) => {
        return item.blogText.match(this.search);
      });
    },
  },

  async created() {
    this.sortItems = SortItems.blog;
    let response = await this.$http.get(Endpoints.blogItemGet);
    this.items = response.body;
    this.items.forEach((element) => {
      element.newDate = element.date
        ? format(parseISO(element.date), "do MMM yyyy")
        : "";
    });
    this.items.reverse();
  },
};
</script>

<style>
@media screen and (max-width: 960px) {
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
