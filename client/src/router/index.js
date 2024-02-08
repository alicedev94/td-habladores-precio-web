import Login from "@/views/Login.vue";
import PanelAdmin from "@/views/PanelAdmin.vue";
import SelectListVue from "@/views/SelectList.vue";
import logoChange from "@/views/logoChange.vue";
import { createRouter, createWebHistory } from "vue-router";

const token = localStorage.getItem("token");

const isAuthenticate = () => {
  if (token !== null) {
    let { rtaEmail, rtaRol } = JSON.parse(token);
    if(rtaRol === "ADMIN") {
      return async (to, from, next) => {
        return next();
      };
    } else {
      router.push("/");
      return false;
    }
  } else {
    router.push("/");
    return false;
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/select-list",
      name: "SelectListVue",
      component: SelectListVue,
      beforeEnter: isAuthenticate,
    },
    {
      path: "/table-data/:list/:type/:sucursal",
      name: "PanelAdmin",
      component: PanelAdmin,
      beforeEnter: isAuthenticate,
    },
    {
      path: "/marketing/logo-change",
      name: "logoChange",
      component: logoChange,
      beforeEnter: isAuthenticate,
    }
  ],
});

export default router;
