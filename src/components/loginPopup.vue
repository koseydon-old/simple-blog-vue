<template>
  <div class="text-center">
    <v-dialog max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab dark small text color="blue">
          <v-icon>mdi-account-arrow-left</v-icon>
        </v-btn>
      </template>
      <v-card outlined>
        <v-toolbar dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="isValid">
            <v-text-field
              label="E-mail"
              name="E-mail"
              prepend-icon="mdi-email"
              type="text"
              v-model="logemail"
              class="my-input"
              @keydown.space.prevent
              @paste.prevent
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="logpassword"
              :rules="[rules.required, rules.counterMin, rules.counterMax]"
            />
            <v-row justify="end" class="me-4 pb-5">
              <vue-recaptcha
                ref="recaptcha"
                @verify="onVerify"
                sitekey="6Leuj-UUAAAAAPZEKLg-T8SJ4Pa28GbCySOQc45-"
                :loadRecaptchaScript="true"
              >
              </vue-recaptcha>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="!isValid" @click="submit" color="primary"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-alert :value="errorAlert" type="error">
        {{ errorMessage }}
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import Endpoints from "../data/Endpoints";
import { errorCase } from "../data/Funcs";

export default {
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      logemail: "",
      logpassword: "",
      recaptchaToken: "",
      errorMessage: "",
      successAlert: false,
      errorAlert: false,
      isValid: true,
      rules: {
        required: (value) => !!value || "Required.",
        counterMin: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Password should be min 8 characters and must inclune 1 capital letter, 1 number and 1 special character."
          );
        },
        counterMax: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "InValid e-mail.";
        },
      },
    };
  },
  methods: {
    onVerify(response) {
      this.recaptchaToken = response;
    },
    async submit() {
      if (this.recaptchaToken === "") {
        this.errorMessage = errorCase("recaptcha");
        this.successAlert = false;
        this.errorAlert = true;
      } else {
        const data = {
          logemail: this.logemail,
          logpassword: this.logpassword,
          recaptchaToken: this.recaptchaToken,
        };
        try {
          let response = await this.$http.post(Endpoints.userLogin, data);
          localStorage.setItem("token", response.body.token);
          window.location.href = "/";
        } catch (err) {
          //const errorType = err.body.errors[0].type;
          this.errorMessage = errorCase("somethingWrong");
          this.successAlert = false;
          this.errorAlert = true;
          this.$refs.recaptcha.reset();
        }
      }
    },
  },
};
</script>
