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
            <h4>REGISTER</h4>
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
            <v-text-field
              v-model="forename"
              label="Forename"
              required
            ></v-text-field>
            <v-text-field
              v-model="surname"
              label="Surname"
              required
            ></v-text-field>
            <v-checkbox
              v-model="checkbox"
              label="Do you agree to the terms and conditions?"
              required
            ></v-checkbox>

            <v-btn class="mr-4" @click.prevent="checkForm()"> submit </v-btn>
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
      checkbox: false,
      username: "",
      password: "",
      forename: "",
      surname: "",
    };
  },
  methods: {
    checkForm() {
      if (this.errors.length != 0) {
        this.errors = [];
      }
      if (
        this.username &&
        this.username.length > 10 &&
        this.password &&
        this.forename &&
        this.surname &&
        this.checkbox
      ) {
        var params = JSON.stringify({
          username: this.username,
          password: this.password,
          forename: this.forename,
          surname: this.surname,
        });
        axios
          .post("http://localhost:3000/api/client/post-client", params, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.$store.commit("SET_CLIENT", response.data);
            sessionStorage.setItem("client", JSON.stringify(response.data));
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push("/");
      }

      if (!this.username || this.username.length <= 10) {
        this.errors.push(
          "Username required or taken, or/and must be 10 characters"
        );
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
      if (!this.forename) {
        this.errors.push("Forename required.");
      }
      if (!this.surname) {
        this.errors.push("Surname required.");
      }
      if (!this.checkbox) {
        this.errors.push("Check is required.");
      }
    },
    clearall() {
      (this.username = ""),
        (this.password = ""),
        (this.forename = ""),
        (this.surname = ""),
        (this.checkbox = false);
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
  margin-top: 5vh;
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
  font-size: 70%;
}
</style>
