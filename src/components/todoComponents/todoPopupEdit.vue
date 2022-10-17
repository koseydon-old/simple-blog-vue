<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn fab text v-on="on" left small>
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row justify="center">
        <v-card-title>
          <h2 align>Add a new todo</h2>
        </v-card-title>
      </v-row>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          >
          </v-text-field>
          <v-textarea
            label="Information"
            v-model="text"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          >
          </v-textarea>
          <v-menu max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formatedDate"
                v-on="on"
                label="Due date"
                prepend-icon="mdi-calendar"
                :rules="inputRules"
                :placeholder="duePlaceholder"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                chips
                :items="items"
                label="Status"
                prepend-icon="mdi-check"
                v-model="status"
                :rules="inputRules"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                chips
                :items="people"
                label="Person"
                prepend-icon="mdi-account"
                v-model="person"
                :rules="inputRules"
              ></v-select>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="success mx-0 mt-3"
            @click="submit"
            :loading="loading"
            >Add todo</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ImageLinks from "../../data/ImageLinks";
import Endpoints from "../../data/Endpoints";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  props: ["inputId"],
  data() {
    return {
      title: "",
      text: "",
      person: "",
      status: "",
      due: null,
      duePlaceholder: "",
      loading: false,
      dialog: false,
      items: ["ongoing", "complete", "overdue"],
      people: Object.keys(ImageLinks.authors),
      inputRules: [(v) => v.length >= 3 || "Minimum length is 3 characters"],
    };
  },
  methods: {
    formatedDatePlaceholder(date) {
      return date ? format(parseISO(date), "do MMM yyyy") : "";
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const data = {
          todoTitle: this.title,
          todoText: this.text,
          status: this.status,
          due: this.due,
          person: this.person,
        };
        await this.$http.put(Endpoints.todoSingleItemPut + this.inputId, data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        this.loading = false;
        this.dialog = false;
        location.reload();
      }
    },
  },
  computed: {
    formatedDate() {
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    },
  },
  async created() {
    let response = await this.$http.get(
      Endpoints.todoSingleItemGet + this.inputId
    );
    this.title = response.body.todoTitle;
    this.text = response.body.todoText;
    this.status = response.body.status;
    this.duePlaceholder = this.formatedDatePlaceholder(response.body.due);
    this.person = response.body.person;
  },
};
</script>
