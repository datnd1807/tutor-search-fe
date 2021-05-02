import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import ArgonDashboard from "./plugins/argon-dashboard";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import store from "./store";
import Quasar from "quasar";
import firebase from "firebase/app";
import "firebase/messaging";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;
navigator.serviceWorker
  .register("firebase-messaging-sw.js", {
    scope: "firebase-cloud-messaging-push-scope",
  })
  .then((registration) => {
    const messaging = firebase.messaging();
    messaging.getToken({
      serviceWorkerRegistration: registration,
      vapidKey:
        "BCXYYH2iQxobPAYSowWFlyAO55bCRCcD83Q7Sal-hJ4nLfpAkJxUlVWHN7NMbBa8ddkfIjvUPs-CC2EMjhKtCpw",
    });
  })
  .catch((err) => {
    console.log(err);
  });
Vue.use(ArgonDashboard).use(ElementUI, { locale });
Vue.use(VueCookies);
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") == null) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (localStorage.getItem("user") != null) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresFail)) {
    next();
  }
});

new Vue({
  router,
  store,
  Quasar,
  render: (h) => h(App),
}).$mount("#app");
