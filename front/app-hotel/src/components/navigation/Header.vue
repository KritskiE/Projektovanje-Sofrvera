<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="bg-dark">
      <b-navbar-brand href="#">
        <!-- <font-awesome-icon icon="fa-solid fa-infinity" -->
        </b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="centar">
        <b-navbar-nav>
          <b-nav-item
            ><router-link to="/" class="route-link"
              >Home</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link to="/rooms" class="route-link"
              >Rooms</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link to="/auditoriums" class="route-link"
              >Auditoriums</router-link
            ></b-nav-item
          >
          <b-nav-item href="#" class="icon-holder"
            ><router-link to="/"
              ><img src="../../assets/resized-hotel-icon.png" /></router-link
          ></b-nav-item>
          <b-nav-item href="#"><router-link to="/about" class="route-link"
              >About</router-link
            ></b-nav-item>
          <b-nav-item href="#" v-if="!get_clients"
            ><router-link to="/register" class="route-link"
              >Register</router-link
            ></b-nav-item
          >
          <b-nav-item href="#" v-if="!get_clients"
            ><router-link to="/login" class="route-link"
              >
            <v-btn class="route-link">Login</v-btn></router-link
            ></b-nav-item
          >
          <b-nav-item v-if="get_clients">
            <router-link to="/profile" class="route-link">Profile</router-link>
          </b-nav-item>
          <b-nav-item v-if="get_clients"><router-link to="/" class="route-link">
            <v-btn class="route-link" @click="logout()">Logout</v-btn>
          </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["get_clients"]),
  },
  methods: {
    logout(){
      this.$store.dispatch("clearClient");
    }
  },
};
</script>

<style scoped>
.centar {
  justify-content: center;
}
.nav-link {
  border-radius: 10%;
  margin-right: 0.5rem;
  margin-top: 0.5vh;
  width: 7vw;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white !important;
}
.route-link {
  text-decoration: none;
  color: white;
}
.route-link-logout{
  color: white;
}
.icon-holder {
  cursor: none !important;
}
.navbar-brand {
  margin-left: 1.5rem;
}
.crno {
  color: black;
  transform: scale(1.2);
}
.navbar {
  max-height: 8vh !important;
}
</style>
