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
      title: "Сводная информация",
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
    meta: {
      layout: "main",
      auth: true,
      title: "Команда",
    },
    component: () => import("../views/pages/users/Users.vue"),
  },
  {
    path: "/user-add",
    name: "User Add",
    meta: {
      layout: "main",
      auth: true,
      title: "Добавить сотрудника",
      breadcrumb: {
        parent: {
          title: "Команда",
          path: "/user",
        },
        child: "Добавить сотрудника",
      },
    },
    component: () => import("../views/pages/users/UserAdd"),
  },
  {
    path: "/user-edit/:id",
    name: "User edit",
    meta: {
      layout: "main",
      auth: true,
      title: "Редактирование пользователя",
      breadcrumb: {
        parent: {
          title: "Команда",
          path: "/users"
        },
        child: "Редактирование пользователя"
      }
    },
    component: () => import("../views/pages/users/UserEdit"),
  },
  {
    path: "/user-settings",
    name: "User Setting",
    meta: { layout: "main", auth: true, title: "Настройки" },
    component: () => import("../views/pages/users/UserSettings"),
  },
  {
    path: "/projects",
    name: "Projects",
    meta: { layout: "main", auth: true, title: "Проекты" },
    component: () => import("../views/pages/projects/Projects.vue"),
  },
  {
    path: "/add-projects",
    name: "Add Projects",
    meta: {
      layout: "main",
      auth: true,
      title: "Создание проекта",
      breadcrumb: {
        parent: {
          title: "Проекты",
          path: "/projects"
        },
        child: "Создание проекта"
      }
    },
    component: () => import("../views/pages/projects/AddProject.vue"),
  },
  {
    path: "/put-projects/:id",
    name: "Put Projects",
    meta: {
      layout: "main",
      auth: true,
      title: "Редактирование проекта",
      breadcrumb: {
        parent: {
          title: "Проекты",
          path: "/projects"
        },
        child: "Редактирование проекта"
      }
    },
    component: () => import("../views/pages/projects/PutProject.vue"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    meta: { layout: "main", auth: true, title: "Задачи"
    },
    component: () => import("../views/pages/task/Tasks.vue"),
  },
  {
    path: "/add-task",
    name: "Add Tasks",
    meta: { layout: "main", auth: true, title: "Создание задачи",
      breadcrumb: {
        parent: {
          title: "Задачи",
          path: "/tasks"
        },
        child: "Создание задачи"
      } },
    component: () => import("../views/pages/task/AddTask"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    meta: { layout: "main", auth: true, title: "Статистика" },
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
