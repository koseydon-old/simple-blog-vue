<template>
  <v-card flat color="rgb(255, 255, 255, 0.5)">
    <v-layout
      @click="project.show = !project.show"
      wrap
      :class="`project ${project.status}`"
    >
      <v-col cols="12" sm="12" md="3">
        <div class="caption grey--text">Project Title</div>
        <div>{{ project.todoTitle }}</div>
      </v-col>
      <v-col class="mb-n6" cols="12" sm="6" md="2">
        <div class="caption grey--text">Person</div>
        <div>{{ project.person }}</div>
      </v-col>
      <v-col class="mb-n6" cols="12" sm="6" md="3">
        <div class="caption grey--text">Due by</div>
        <div>{{ project.newDate }}</div>
      </v-col>
      <v-col class="mb-n6" cols="12" sm="3" md="2" xl="3">
        <div id="chip-div" class="text-right">
          <v-chip
            small
            :color="`${project.status}`"
            :class="`v-chip--active white--text caption my-2`"
          >
            {{ project.status }}</v-chip
          >
        </div>
      </v-col>
      <v-col
        id="button-col"
        cols="12"
        sm="9"
        md="2"
        xl="1"
        class="d-flex flex-row-reverse"
      >
        <v-speed-dial
          v-if="toggleUserSignin"
          @click.native.stop
          direction="right"
        >
          <template v-slot:activator>
            <v-btn fab text left small>
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small text>
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
          <v-btn @click="deleteTodoPost(project._id)" dark fab small text>
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </v-speed-dial>
        <todoPopupEdit v-if="toggleUserSignin" v-bind:inputId="project._id" />
      </v-col>
    </v-layout>
    <v-divider></v-divider>
    <v-slide-y-transition>
      <v-card-text v-show="project.show">
        <b>INFO: </b>
        <div class="text-lg-left">{{ project.todoTitle }}</div>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
export default {
  components: {
    todoPopupEdit: () => import("../todoComponents/todoPopupEdit"),
  },
  props: ["project"],
};
</script>
