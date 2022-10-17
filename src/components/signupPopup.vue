<template>
  <div class="text-center">
    <v-dialog max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab dark small text color="green">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <v-card outlined>
        <v-toolbar dark flat>
          <v-toolbar-title>Sign Up</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="isValid">
            <v-text-field
              label="Full Name"
              name="name"
              prepend-icon="mdi-account"
              type="text"
              v-model="name"
              class="my-input"
              @paste.prevent
              :rules="[rules.required]"
            />
            <v-text-field
              label="E-mail"
              name="E-mail"
              prepend-icon="mdi-email"
              type="email"
              v-model="email"
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
              v-model="password"
              :rules="[rules.required, rules.counterMin, rules.counterMax]"
            />
            <v-text-field
              id="passwordConf"
              label="Confirm Password"
              name="passwordConf"
              prepend-icon="mdi-lock"
              type="password"
              v-model="passwordConf"
              :rules="[rules.required]"
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
            >Signup</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-alert :value="successAlert" type="success">
        {{ successMessage }}
      </v-alert>
      <v-alert :value="errorAlert" type="error">
        {{ errorMessage }}
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import Endpoints from "../data/Endpoints";
import VueRecaptcha from "vue-recaptcha";
import { errorCase, successCase } from "../data/Funcs";

export default {
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConf: "",
      recaptchaToken: "",
      errorMessage: "",
      successMessage: "",
      successAlert: false,
      errorAlert: false,
      isValid: true,
      rules: {
        required: (value) => !!value || "Required.",
        counterMax: (value) =>
          (value && value.length <= 20) || "Max 20 characters",
        counterMin: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Password should be min 8 characters and must inclune 1 capital letter, 1 number and 1 special character."
          );
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "InValid e-mail.";
        },
      },
    };
  },
  methods: {
    async submit() {
      if (this.recaptchaToken === "") {
        this.successAlert = false;
        this.errorAlert = true;
        this.errorMessage = errorCase("recaptcha");
      } else {
        const data = {
          username: this.name,
          email: this.email,
          password: this.password,
          passwordConf: this.passwordConf,
          recaptchaToken: this.recaptchaToken,
        };
        try {
          let response = await this.$http.post(Endpoints.userRegister, data);
          const successMessage = response.body.type;
          this.successMessage = successCase(successMessage);
          this.errorAlert = false;
          this.successAlert = true;
          this.$refs.form.reset();
          this.$refs.recaptcha.reset();
        } catch (err) {
          //const errorType = err.body.errors[0].type;
          this.errorMessage = errorCase("somethingWrong");
          this.successAlert = false;
          this.errorAlert = true;
          this.$refs.recaptcha.reset();
        }
      }
    },
    onVerify(response) {
      this.recaptchaToken = response;
    },
  },
};
</script>
