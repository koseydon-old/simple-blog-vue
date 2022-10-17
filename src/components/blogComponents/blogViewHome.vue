<template>
  <v-content>
    <siteLogo />
    <v-container>
      <v-row justify="center" v-for="(item, i) in firstItem" :key="i">
        <blogHomeMainCard :item="item" />
      </v-row>
      <v-row justify="center">
        <v-col
          sm="9"
          md="6"
          lg="4"
          xl="3"
          class="d-flex"
          v-for="(item, i) in items"
          :key="i"
        >
          <blogHomeCard :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Endpoints from "../../data/Endpoints";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  name: "blogViewHome",

  data: () => ({
    firstItem: [],
    items: [],
  }),

  components: {
    blogHomeMainCard: () => import("../cards/blogHomeMainCard"),
    blogHomeCard: () => import("../cards/blogHomeCard"),
    siteLogo: () => import("../siteLogo"),
  },

  async created() {
    let response = await this.$http.get(Endpoints.blogItemGet);
    if (response.body.length > 4) {
      this.items = response.body.slice(response.body.length - 4);
    } else {
      this.items = response.body;
    }

    this.items.forEach((element) => {
      element.newDate = element.date
        ? format(parseISO(element.date), "do MMM yyyy")
        : "";
    });

    this.firstItem.push(this.items.pop());
    this.items = this.items.reverse();
  },
};
</script>
