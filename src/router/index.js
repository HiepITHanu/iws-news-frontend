import Vue from "vue";
import VueRouter from "vue-router";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Home from "@/components/Home";
import DetailArticle from "@/components/DetailArticle";
import CreateArticle from "@/components/CreateArticle";
import EditArticle from "@/components/EditArticle";
import ArticleManagement from "@/components/ArticleManagement";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: '/detail-article/:id',
    name: "Detail",
    component: DetailArticle
  },
  {
    path: '/create-article',
    name: "Create article",
    component: CreateArticle,
    meta: {requiresAuth: true}
  },
  {
    path: '/edit-article/:id',
    name: "Edit article",
    component: EditArticle
  },
  {
    path: "/my-articles",
    name: "My Articles",
    component: ArticleManagement
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!localStorage.getItem("token")){
      next({
        path: "/signin",
        query: {redirect: to.fullPath}
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router;
