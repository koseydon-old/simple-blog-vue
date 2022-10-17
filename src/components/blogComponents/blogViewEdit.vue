<template>
  <v-content>
    <siteLogo />
    <v-container>
      <v-card>
        <v-row justify="center">
          <v-card-title>
            <h2 align>Edit blog post</h2>
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
            <v-text-field
              label="Subtitle"
              v-model="subtitle"
              prepend-icon="mdi-folder"
              :rules="inputRules"
            >
            </v-text-field>
            <v-file-input label="Image" v-model="uploadImage" accept="image/*">
            </v-file-input>
            <tiptap-vuetify
              :card-props="{ flat: true }"
              v-model="text"
              :extensions="extensions"
            />
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  @change="selectImage(category)"
                  chips
                  :items="categories"
                  label="Category"
                  prepend-icon="mdi-check"
                  v-model="category"
                  :rules="inputRules"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  @change="selectAvatar(author)"
                  chips
                  :items="authors"
                  label="Author"
                  prepend-icon="mdi-account"
                  v-model="author"
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
              >Edit blog post</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import Endpoints from "../../data/Endpoints";
import ImageLinks from "../../data/ImageLinks";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  components: {
    TiptapVuetify,
    siteLogo: () => import("../siteLogo"),
  },
  data() {
    return {
      siteLogo: ImageLinks.images.Logo,
      extensions: [
        History,
        Link,
        Underline,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      id: "",
      title: "",
      subtitle: "",
      uploadImage: "",
      defaultImage: "",
      image: "",
      text: "",
      author: "",
      avatar: "",
      category: "",
      categories: Object.keys(ImageLinks.categories),
      authors: Object.keys(ImageLinks.authors),
      toggleUserSignin: false,
      inputRules: [(v) => v.length >= 3 || "Minimum length is 3 characters"],
      loading: false,
    };
  },
  methods: {
    selectAvatar(author) {
      this.avatar = ImageLinks.authors[author];
    },
    selectImage(category) {
      this.defaultImage = ImageLinks.categories[category];
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.uploadImage === "") {
          this.image = this.defaultImage;
        } else {
          const formData = new FormData();
          formData.append("image", this.uploadImage);
          let imagePostResponse = await this.$http.post(
            Endpoints.blogImagePost,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                token: localStorage.getItem("token"),
              },
            }
          );
          this.image = imagePostResponse.body.fileUrl;
        }

        const data = {
          blogTitle: this.title,
          blogSubTitle: this.subtitle,
          blogText: this.text,
          blogCategory: this.category,
          author: this.author,
          avatar: this.avatar,
          image: this.image,
        };

        await this.$http.put(
          Endpoints.blogSingleItemPut + this.$route.params.id,
          data,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        this.loading = false;
        window.location.href = "/" + this.$route.params.id;
      }
    },
  },
  async created() {
    let response = await this.$http.get(
      Endpoints.blogSingleView + this.$route.params.id
    );
    this.title = response.body.blogTitle;
    this.subtitle = response.body.blogSubTitle;
    this.text = response.body.blogText;
    this.category = response.body.blogCategory;
    this.author = response.body.author;
    this.avatar = response.body.avatar;
    this.image = response.body.image;
    this.defaultImage = response.body.image;
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
