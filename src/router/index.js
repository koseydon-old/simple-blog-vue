import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blog from "../views/Blog.vue";
import Todo from "../views/Todo.vue";
import SingleBlog from "../views/SingleBlog.vue";
import AddBlog from "../views/AddBlog";
import EditBlog from "../views/EditBlog";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/addblog",
    name: "AddBlog",
    component: AddBlog,
    // beforeEnter: (next) => {
    //   const loggedIn = localStorage.getItem('token')
    //   console.log('The token is:', loggedIn)
    //   if (!loggedIn) {
    //     next(window.location.href = '/')
    //   }
    // }
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
  },
  {
    path: "/editblog/:id",
    name: "EditBlog",
    component: EditBlog,
  },
  {
    path: "/:id",
    name: "SingleBlog",
    component: SingleBlog,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
