import Home from "./components/home/Home.vue";
import Room from "./components/room/Rooms.vue";
import Auditoriums from "./components/auditorium/Auditoriums.vue";
import Register from "./components/auth/Register.vue";
import Login from "./components/auth/Login.vue";
import Profile from "./components/profile/Profile.vue";
import About from './components/about/About.vue'
import Employee from './components/employee/Employee.vue'
import { store } from "./store/store";

export const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: (to, from, next) => {
      amILoged(to, from, next);
    },
  },
  {
    path: "/auditoriums",
    component: Auditoriums,
    beforeEnter: (to, from, next) => {
      amILoged(to, from, next);
    },
  },
  {
    path: "/rooms",
    component: Room,
    beforeEnter: (to, from, next) => {
      amILoged(to, from, next);
    },
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      amILoged(to, from, next);
    },
  },
  {
    path: "/about",
    component: About,
    beforeEnter: (to, from, next) => {
      amILoged(to, from, next);
    },
  },
  {
    path: "/employee",
    component: Employee,
    beforeEnter: (to, from, next) => {
      amIStaff(to, from, next);
    },
  },
];

async function amILoged(to, from, next) {
  if (sessionStorage.getItem("client")) {
    store.commit("SET_CLIENT", JSON.parse(sessionStorage.getItem("client") || "[]"));
  }
  const user = await store.dispatch("isLoged");
  if (user) {
    next();
  } else {
    next("/login");
  }
}
async function amIStaff(to,from,next){
  if (sessionStorage.getItem("client")) {
    store.commit("SET_CLIENT", JSON.parse(sessionStorage.getItem("client") || "[]"));
  }
  const staff = await store.dispatch("isLogedStaff");
  const user = await store.dispatch("isLoged");
  if (staff) {
    next();
  } else {
    if(user){
      next("/")
    }else{
      next('/login')
    }
  }
}
//za sve rute mora login

// async function logedCheck(to, from, next) {
//   const user = await store.dispatch("isLoged");
//   if (user) {
//     next();
//   } else {
//     await store.dispatch("clearClient");
//   }
// }
