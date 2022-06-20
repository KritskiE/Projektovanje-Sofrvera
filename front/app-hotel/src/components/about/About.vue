<template>
  <v-app>
    <div>
      <v-img
        lazy-src="../../assets/hotels.jpg"
        max-width="100vw"
        class="jumboSlika"
        src="../../assets/naslovna-about.jpg"
      >
        <div class="welcome">
          <div class="circle">
            <a href="#about" class="service-link">
              <font-awesome-icon icon="fa-solid fa-arrow-down" size="3x"
            /></a>
          </div>
        </div>
      </v-img>
      <div class="mt-15 about-wrap">
        <div class="about">
          <div class="about-cont">
            <div class="about-text">
              <h2 id="about">About us</h2>
              <div class="first-para">
                <p>
                  Litus Oliva is the place where visitors from all over the
                  world come to relax and bathe in the Greek sun, beside the
                  pool and on the beaches located in close proximity. Great
                  lifestyle and services await you; the main building features a
                  welcoming and comfortable reception and a restaurant that
                  draws you in with the Mediterranean cuisine aromas.
                </p>
              </div>
              <div class="second-para">
                <p>
                  Every holiday visitor feels relaxed and comfortable knowing
                  that magnificent Pefkochori with clear blue sea waters was
                  awarded with blue flag label. It is pleasing to know that
                  although the Litus Oliva is situated centrally, nothing can
                  disturb the peace and quiet, the serene atmosphere of the
                  hotel.
                </p>
              </div>
            </div>
          </div>
          <div class="about-button-book">
            <router-link :to="{path: '/rooms', hash: '#prekrivac'}" class="book-link">
              <v-btn color="primary">Book Now</v-btn>
            </router-link>
          </div>
        </div>
      </div>
      <div class="about-buttons">
        <div class="about-buttons-cards">
          <v-card class="kartica" max-width="344" elevation="0">
            <v-img src="../../assets/swimmingpool.jpg" height="300px"></v-img>

            <v-card-title> Swimming Pool </v-card-title>

            <v-card-text
              >Enjoy your sunbath relaxing next to the tranquil swimming pool
              suitable for adults and children.
            </v-card-text>
          </v-card>
          <v-card class="kartica" max-width="344" elevation="0">
            <v-img src="../../assets/restaurant.jpg" height="300px"></v-img>

            <v-card-title> Restaurant </v-card-title>

            <v-card-text
              >A lovely restaurant with swimming pool and village view is the
              perfect place to start your day with coffee and breakfast.
            </v-card-text>
          </v-card>
          <v-card class="kartica" max-width="344" elevation="0">
            <v-img src="../../assets/poolbar.jpg" height="300px"></v-img>

            <v-card-title> Pool Bar </v-card-title>

            <v-card-text
              >The pool bar is one of the favorite spots of our guests. Chilling
              with friends or family for coffee or a drink with tranquil
              background.
            </v-card-text>
          </v-card>
          <v-card class="kartica" max-width="344" elevation="0">
            <v-img src="../../assets/doublerooms.jpg" height="300px"></v-img>

            <v-card-title> Double Rooms </v-card-title>

            <v-card-text
              >The Double rooms have a Double bed or Twin bed and are suitable
              for up to 2 person.
            </v-card-text>
          </v-card>
          <v-card class="kartica" max-width="344" elevation="0">
            <v-img src="../../assets/triplerooms.jpg" height="300px"></v-img>

            <v-card-title> Triple Rooms </v-card-title>

            <v-card-text
              >The Triple rooms have a Double and a Single bed and can
              accommodate up to 3 person.
            </v-card-text>
          </v-card>
          <v-card class="kartica" max-width="344" elevation="0">
            <v-img src="../../assets/familyrooms.jpg" height="300px"></v-img>

            <v-card-title> Family Rooms </v-card-title>

            <v-card-text
              >The Family rooms have a Double bed and a bunk bed. This room type
              is suitable for up to 4 person (maximum 3 adults).
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
}

.jumboSlika {
  max-height: calc(100vh - 8vh);
  object-fit: contain !important;
  opacity: 0.8;
}
.welcome {
  display: flex;
  justify-content: center;
  margin-top: 30vh;
}
.circle {
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-wrap {
  display: flex;
  justify-content: center;
  padding: 4rem;
  margin-bottom: 2rem;
}
.about {
  display: flex;
  flex-direction: row;
  width: 55vw;
  height: 15vw;
}
.about-cont {
  width: 80%;
  height: 100%;
}
.about-text {
  width: 100%;
  height: 100%;
}
h2 {
  font-size: 2.625rem;
  line-height: 1.1;
  text-transform: none;
}
.about-button-book {
  display: flex;
  justify-content: center;
  align-self: flex-end;
  margin-left: 4%;
}
.about-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
}
.about-buttons-cards {
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.kartica {
  margin: 1rem;
}
.service-link {
  text-decoration: none;
  color: black;
}
.book-link {
  text-decoration: none;
}
</style>
