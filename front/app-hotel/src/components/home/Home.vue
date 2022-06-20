<template>
  <v-app>
    <v-img
      lazy-src="../../assets/hotels.jpg"
      max-width="100vw"
      class="jumboSlika"
      src="../../assets/hotels.jpg"
    >
      <div class="welcome">
        <v-btn elevation="2" color="yellow darken-1" class="pa-5"
          ><font-awesome-icon icon="fa-solid fa-arrow-down" />
          <h1 class="welcome-header ma-2">
            <a href="#headline" class="service-link">Services</a>
          </h1>
          <font-awesome-icon icon="fa-solid fa-arrow-down"
        /></v-btn>
      </div>
    </v-img>
    <div class="ma-10 headline" id="headline">
      <h1>Services</h1>
    </div>
    <div class="services" id="services">
      <!-- ROOMS CARD -->
      <template>
        <v-card class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" src="../../assets/hotel-room.jpg"></v-img>

          <v-card-title class="centered">Rooms</v-card-title>

          <v-card-text>
            <div>
              25 Rooms of all sizes, penthouse , masterbedrooms, pools -
              outdoors, pet friendly, supported vet needs.
            </div>
          </v-card-text>
          <v-card-actions>
            <router-link :to="{path: '/rooms', hash: '#prekrivac'}" class="mx-auto route-btn">
              <v-btn
                class="mx-auto"
                color="deep-purple lighten-2"
                text
              >
                Reserve
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </template>

      <!-- Auditoriums CARD -->
      <template>
        <v-card  class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" src="../../assets/auditorium.jpg"></v-img>

          <v-card-title class="centered">Auditoriums</v-card-title>

          <v-card-text>
            <div>
              5 Auditoriums of all sizes, stages included, souding, microphones,
              great capacitet etc.
            </div>
          </v-card-text>
          <v-card-actions>
            <router-link :to="{path: '/auditoriums', hash: '#prekrivac'}" class="mx-auto route-btn">
            <v-btn
              class="mx-auto"
              color="deep-purple lighten-2"
              text
            >
              Reserve
            </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </template>

      <!-- About CARD -->
      <template>
        <v-card  class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" src="../../assets/staff.jpg"></v-img>

          <v-card-title class="centered">About us</v-card-title>

          <v-card-text>
            <div>
              70 Employees for all needs there to help, including Vets, Medics,
              Profesional trainers, cooks, and room services.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="mx-auto"
              color="deep-purple lighten-2"
              text
            >
              Look up
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </div>
    <div class="ma-10 headline">
      <h1>Gallery</h1>
    </div>
    <!-- Gallery -->
    <div class="m-3">
      <div class="d-flex flex-row mb-3">
        <!-- up -->
        <div>
          <!-- up-left -->
          <div class="d-flex flex-row up-left-top">
            <!-- up-left-top -->
            <div>
              <!-- up-left-top-left -->
              <v-img
                :aspect-ratio="16 / 9"
                width="350"
                src="../../assets/gallery-room.jpg"
              ></v-img>
            </div>
            <div>
              <!-- up-left-top-right -->
              <v-img
                :aspect-ratio="16 / 9"
                width="350"
                src="../../assets/gallery-room-2.jpg"
              ></v-img>
            </div>
          </div>
          <div class="mt-5">
            <!-- up-left-bottom -->
            <v-img
              :aspect-ratio="16 / 9"
              width="715"
              src="../../assets/gallery-room-3.jpg"
            ></v-img>
          </div>
        </div>
        <div>
          <!-- up-right -->
          <v-img
            :aspect-ratio="16 / 11"
            width="900"
            src="../../assets/gallery-pool.jpg"
          ></v-img>
        </div>
      </div>
      <div class="d-flex flex-row">
        <!-- down -->
        <div class="d-flex flex-column mr-5">
          <!-- down-left -->
          <div>
            <!-- down-left-up -->
            <v-img
              :aspect-ratio="16 / 9"
              width="715"
              src="../../assets/gallery-lounge.jpg"
            ></v-img>
          </div>
          <div>
            <!-- down-left-down -->
            <p class="paragraph">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum,
              eius suscipit nulla mollitia tempora rem libero id ipsa modi
              inventore doloremque harum error quidem soluta dignissimos
              exercitationem natus ex sed ullam omnis aliquid! Incidunt
              explicabo at repellat harum accusantium nihil et inventore
              architecto quo, voluptate cum error ut laudantium alias similique
              eius. Soluta doloremque commodi qui, magni doloribus iusto. Illo
              in temporibus delectus maiores architecto accusantium ipsum rerum
              similique sunt.
            </p>
          </div>
        </div>
        <div class="">
          <!-- down-right -->
          <div>
            <!-- down-right-up -->
            <p class="paragraph up">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum,
              eius suscipit nulla mollitia tempora rem libero id ipsa modi
              inventore doloremque harum error quidem soluta dignissimos
              exercitationem natus ex sed ullam omnis aliquid! Incidunt
              explicabo at repellat harum accusantium nihil et inventore
              architecto quo, voluptate cum error ut laudantium alias similique
              eius. Soluta doloremque commodi qui, magni doloribus iusto. Illo
              in temporibus delectus maiores architecto accusantium ipsum rerum
              similique sunt.
            </p>
          </div>
          <div>
            <!-- down-right-down -->
            <v-img
              :aspect-ratio="16 / 7"
              width="900"
              src="../../assets/gallery-lobby.jpg"
            ></v-img>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.jumboSlika {
  max-height: calc(100vh - 8vh);
  object-fit: contain !important;
}
.service-link {
  text-decoration: none;
  color: black;
}
.welcome {
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 35vh;
}
.welcome-header {
  text-align: center;
}
.headline {
  display: flex;
  justify-content: center;
  text-decoration: underline;
}
.services {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.centered {
  justify-content: center;
}
.up-left-top > * {
  margin-right: 15px;
}
.paragraph {
  width: 715px;
}
.up {
  width: 900px;
}
.route-btn{
  text-decoration: none;
}
</style>
