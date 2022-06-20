<template>
  <div class="wrapp">
    <v-app>
      <v-img
        lazy-src="../../assets/hotels.jpg"
        max-width="100vw"
        class="jumboSlika"
        src="../../assets/hotels.jpg"
      >
        <div class="welcome">
          <form class="register-block">
            <h4>LOGIN</h4>
            <v-text-field
              v-model="username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              required
              type="password"
            ></v-text-field>
            <div class="mb-5">
              <router-link to="/register">Don't have an account?</router-link>
            </div>
            <v-btn class="mr-4" @click.prevent="checkForm()"> login </v-btn>
            <v-btn @click.prevent="clearall()"> clear </v-btn>
            <div class="errorWrap">
              <div class="errors" v-for="err in errors" :key="err.id">
                {{ err }}
              </div>
            </div>
          </form>
        </div>
      </v-img>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      errors: [],
      username: "",
      password: "",
    };
  },
  methods: {
/* 
********************************************
* Asinhrona metoda checkForm() provera da li su uneti podaci validni, i u uspensnom slucaju ih cuva u Vuex store
* Programer: Lazar Janicijevic
<--- Verzija 1 --->
* Problem: Nakon sto se stranica osvezi, svi podaci u Vuex se vracaju na pocetnu vrednost, time i informacija da je korisnik prijavljen
* Testiranje obavljeno na "zivo"
<--- Verzija 2 --->
* Resenje: Da bi podaci ostali i nakon osvezene stranice iskoristili smo sessionStorage.setItem() da postavimo podatak prijavljenog korisnika u sesiju
*          i sessionStorage.getItem() da je prihvatimo nakon osvezenja;
********************************************
*/
    async checkForm() {
      var client;
      if (this.errors.length != 0) {
        this.errors = [];
      }
      if (this.username && this.password) {
        await axios
          .get(
            "http://localhost:3000/api/client/one-client/" +
              this.username +
              "/" +
              this.password
          )
          .then((response) => {
            client = response.data;
            console.log(client);
          })
          .catch((err) => {
            console.log(err);
          });
        if (client.length > 0) {
          this.$store.commit("SET_CLIENT", client); // posalji podatke na Vuex store
          sessionStorage.setItem("client", JSON.stringify(client)); // postavi parametar "client" u sesiju
          this.$router.push("/"); // vrati se na Home stranicu
        } else {
          this.errors.push("Incorrect password or/and username");
        }
      }
      if (this.username.length < 10) {
        this.errors.push("Username must be at least 10 characters");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
    },
    clearall() {
      (this.username = ""), (this.password = "");
    },
  },
};
</script>
<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
}
.jumboSlika {
  max-height: calc(100vh - 8vh);
  object-fit: contain !important;
}
.welcome {
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 17vh;
}
.welcome-header {
  text-align: center;
}
.register-block {
  padding: 6vw;
  padding-bottom: 1vw;
  padding-left: 12vh;
  padding-right: 12vh;
  background-color: white;
  border-radius: 1vw;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.errorWrap {
  margin-top: 1rem;
}
.errors {
  width: 100%;
  height: 2rem;
  border: 1px solid red;
  border-radius: 10px;
  text-align: center;
  margin-top: 5px;
  font-size: 0.8rem;
}
</style>
