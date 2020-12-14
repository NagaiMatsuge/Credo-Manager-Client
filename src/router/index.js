import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "main",
      auth: true,
      title: "Some Title",
    },
    component: () => import("../views/pages/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/password-reset",
    name: "Password reset",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/auth/PasswordReset.vue"),
  },
  {
    path: "/password/reset/:token",
    name: "Set New Password",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/auth/SetNewPassword.vue"),
  },
  {
    path: "/users",
    name: "Users",
    meta: { layout: "main", auth: true },
    component: () => import("../views/pages/users/User.vue"),
  },
  {
    path: "/projects",
    name: "Projects",
    meta: { layout: "main", auth: true },
    component: () => import("../views/pages/Projects.vue"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    meta: { layout: "main", auth: true },
    component: () => import("../views/pages/Tasks.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    meta: { layout: "main", auth: true },
    component: () => import("../views/pages/Statistics.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let requireAuth = to.matched.some((record) => record.meta.auth);
  let token = localStorage.token;
  if (requireAuth && !token) {
    next("/login?message=login");
    localStorage.clear();
  } else {
    next();
  }
  if (!requireAuth && token) {
    next("/?message=auth-true");
  } else {
    next();
  }
});

export default router;
