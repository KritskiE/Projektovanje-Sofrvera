import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowDown, faStar, faX , faPen, faPlus, faImage} from "@fortawesome/free-solid-svg-icons";
import { routes } from "./router";
import { store } from "./store/store.js";

library.add(faArrowDown, faStar, faX, faPen, faPlus, faImage);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});



new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
