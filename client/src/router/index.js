import Login from "@/views/Login.vue";
import PanelAdmin from "@/views/PanelAdmin.vue";
import SelectListVue from "@/views/SelectList.vue";
import logoChange from "@/views/logoChange.vue";
import AdminSupermarket from "@/components/AdminSupermarket.vue";
import TablaComboDaka from "@/components/TablaComboDaka.vue";
import { createRouter, createWebHistory } from "vue-router";
import TableDataCdd from "@/components/TableDataCdd.vue";

var token = null;

const isAuthenticate = () => {
  token = localStorage.getItem("token");
  if (token != null) {
    let { rtaRol } = JSON.parse(token);
    if (rtaRol === "ADMIN" || rtaRol === "MARKETING" || rtaRol === "CLIENT" || rtaRol === "CDD") {
      return async (to, from, next) => {
        return next();
      };
    } else {
      // console.log("NO ES ADMIN O MARKETING O CLIENT");
      router.push("/");
      return false;
    }
  } else {
    // console.log("FALLO AL AUTENTICAR");
    // console.log(token);
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
      path: "/table-data-supermarket/:list/:size/:type/:sucursal",
      name: "AdminSupermarket",
      component: AdminSupermarket,
      beforeEnter: isAuthenticate,
    },
    {
      path: "/table-data-supermarket-combo/:list/:size/:type/:sucursal",
      name: "TablaComboDaka",
      component: TablaComboDaka,
      beforeEnter: isAuthenticate,
    },
    {
      path: "/marketing/logo-change",
      name: "logoChange",
      component: logoChange,
      beforeEnter: isAuthenticate,
    },
    {
      path: "/table-data-cdd/:ra/:ga/:size",
      name: "TableDataCdd",
      component: TableDataCdd,
      beforeEnter: isAuthenticate,
    }
  ],
});

export default router;
