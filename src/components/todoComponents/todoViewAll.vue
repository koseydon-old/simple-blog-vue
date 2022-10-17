<template>
  <v-content>
    <v-container>
      <siteLogo />
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-layout id="layout" class="mb-2">
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
              </v-row>
            </v-layout>
            <v-col
              class="pa-0"
              v-for="project in newProjects"
              :key="project.todoTitle"
            >
              <todoSingleCard :project="project" />
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-content>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import Endpoints from "../../data/Endpoints";
import ImageLinks from "../../data/ImageLinks";
import SortItems from "../../data/SortItems";
import { sortTodoKeyword } from "../../data/Funcs";

export default {
  name: "dashboard",
  components: {
    todoSingleCard: () => import("../cards/todoSingleCard"),
    siteLogo: () => import("../siteLogo"),
  },

  data() {
    return {
      sortItems: [],
      newProjects: [],
      projects: [],
      siteLogo: ImageLinks.images.Logo,
      searchToggle: true,
      snackbarEdited: false,
      postDeleted: false,
      toggleUserSignin: false,
    };
  },
  methods: {
    async deleteTodoPost(id) {
      await this.$http.delete(Endpoints.todoSingleItemDelete + id, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      location.reload();
    },
    addShow() {
      this.newProjects = this.projects.map((projects) => ({
        ...projects,
        show: false,
      }));
    },
    sort(prop) {
      let keyword = sortTodoKeyword(prop);
      if (this.searchToggle) {
        this.newProjects.sort((a, b) => (a[keyword] < b[keyword] ? -1 : 1));
        this.searchToggle = !this.searchToggle;
      } else {
        this.newProjects.sort((a, b) => (b[keyword] < a[keyword] ? -1 : 1));
        this.searchToggle = !this.searchToggle;
      }
    },
  },
  async created() {
    this.sortItems = SortItems.todo;
    let response = await this.$http.get(Endpoints.todoItemGet);
    this.projects = response.body;
    this.projects.forEach((element) => {
      element.newDate = element.due
        ? format(parseISO(element.due), "do MMM yyyy")
        : "";
    });
    this.addShow();
    let responseToken = await this.$http.get(Endpoints.validateToken, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    if (responseToken.status === 200) {
      this.toggleUserSignin = true;
    }
  },
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.complete {
  background: #3cd1c2;
}

.v-chip.ongoing {
  background: orange;
}

.v-chip.overdue {
  background: tomato;
}
@media screen and (max-width: 600px) {
  #button-col {
    display: -webkit-box !important ;
  }
  #chip-div {
    text-align: start !important;
  }
}
</style>
