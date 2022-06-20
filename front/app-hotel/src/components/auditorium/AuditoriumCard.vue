<template>
  <div>
    <v-card elevation="15">
      <div class="d-flex flex-no-wrap justify-space-between mb-3">
        <div>
          <!-- <v-card-title class="text-h5" v-text="item.title"
              >Supermodel</v-card-title
            > -->
          <v-card-title class="text-h5">Name: {{ room.name }}</v-card-title>

          <!-- <v-card-subtitle v-text="item.artist">Foster the People</v-card-subtitle>  -->

          <v-card-subtitle
            >Seats: {{ room.seats }} | Surface: {{ room.surface }} m<sup>2</sup>
            <span v-if="room.stage">| Stage</span>
            <span v-if="room.projector">| Projector</span>
            <span v-if="room.sound">| Sound</span> |
            <p :class="{ available: !room.booked }" v-if="!room.booked">
              Available
            </p>
            <p :class="{ unavailable: room.booked }" v-if="room.booked">
              Unavailable
              <span
                v-for="(reserved, index) in room.bookedAt"
                :key="reserved.id"
              >
                on {{ room.bookedAt[index]
                }}<span v-if="room.bookedAt.length > 1"> |</span>
              </span>
            </p></v-card-subtitle
          >

          <v-card-actions>
            <v-btn class="ml-8 mt-3 mr-8" fab icon height="40px" right>
              <font-awesome-icon
                v-if="room.stars > 0"
                color="teal"
                class="mr-1"
                icon="fa-solid fa-star"
              />
              <font-awesome-icon
                v-if="room.stars > 1"
                color="teal"
                class="mr-1"
                icon="fa-solid fa-star"
              />
              <font-awesome-icon
                v-if="room.stars > 2"
                color="teal"
                class="mr-1"
                icon="fa-solid fa-star"
              />
              <font-awesome-icon
                v-if="room.stars > 3"
                color="teal"
                class="mr-1"
                icon="fa-solid fa-star"
              />
              <font-awesome-icon
                v-if="room.stars > 4"
                color="teal"
                class="mr-1"
                icon="fa-solid fa-star"
              />
            </v-btn>
            <v-dialog
              v-model="reserveDialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="orange"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="getDatesBetween(room)"
                >
                  Reserve
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="orange">
                  <v-btn icon dark @click="reserveDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Overview</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="reserve()"> Reserve </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <div class="combiner">
                  <div class="pic-date">
                    <div>
                      <v-img
                        class="mr-5"
                        height="350"
                        width="350"
                        :src="roomImage"
                      ></v-img>
                    </div>
                    <div>
                      <div class="title-block">
                        <h3 class="title">Book at</h3>
                      </div>
                      <v-date-picker
                        v-model="picker1"
                        :allowed-dates="allowedDates"
                        class="mt-4 mx-2"
                        :min="new Date().toISOString().substr(0, 10)"
                        max="2023-01-01"
                        elevation="15"
                      >
                      </v-date-picker>
                    </div>
                  </div>
                  <div>
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row">Price:</th>
                          <td>{{ room.price }}$</td>
                        </tr>
                        <tr>
                          <th scope="row">Seats:</th>
                          <td>{{ room.seats }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Surface:</th>
                          <td>{{ room.surface }}m<sup>2</sup></td>
                        </tr>
                        <tr>
                          <th scope="row">Stage:</th>
                          <td v-if="room.stage">It has a stage!</td>
                          <td v-if="!room.stage">It doesn't have a stage!</td>
                        </tr>
                        <tr>
                          <th scope="row">projector:</th>
                          <td v-if="room.projector">It has a projector!</td>
                          <td v-if="!room.projector">
                            It doesn't have a projector!
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Sound:</th>
                          <td v-if="room.sound">It has sound build in!</td>
                          <td v-if="!room.sound">
                            It doesn't have sound build in!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="buttons-block">
                  <v-btn
                    color="orange"
                    @click="
                      reserve();
                      getDatesBetween(room);
                    "
                    >reserve</v-btn
                  >
                  <v-btn
                    class="ml-5"
                    color="orange"
                    @click="reserveDialog = false"
                    >close</v-btn
                  >
                </div>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog" max-width="25vw">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  v-bind="attrs"
                  v-on="on"
                  color="orange"
                  class="ml-2"
                >
                  Details
                </v-btn>
              </template>
              <v-card class="p-2">
                <v-img height="250" :src="roomImage"></v-img>
                <v-card-title class="text-h5"
                  >Name: {{ room.name }}</v-card-title
                >
                <v-card-text>
                  <v-rating
                    :value="room.stars"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  >
                  </v-rating>
                  This auditorium is priced at {{ room.price }}$ per day<span
                    v-if="room.booked"
                    >and is booked:</span
                  ><span
                    v-for="(reserved, index) in room.bookedAt"
                    :key="reserved.id"
                    >on {{ room.bookedAt[index] }} | ;</span
                  >
                  <span v-if="!room.booked"> . </span> It has
                  {{ room.seats }} seats, surface of {{ room.surface }} m<sup
                    >2</sup
                  >
                  <span v-if="room.stage || room.projector || room.sound"
                    >and</span
                  >
                  <span v-if="room.stage"> a stage</span>
                  <span v-if="room.stage && (room.projector || room.sound)"
                    >,</span
                  >
                  <span v-if="room.projector">a projector</span>
                  <span v-if="room.projector && room.sound">,</span>
                  <span v-if="room.sound">sound/audio built in.</span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer>
                    <v-btn
                      color="orange"
                      text
                      @click="
                        dialog = false;
                        reserveDialog = true;
                      "
                    >
                      Reserve
                    </v-btn>
                    <v-btn color="orange" text @click="dialog = false">
                      Close
                    </v-btn>
                  </v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div class="priced">{{ room.price }}$</div>
          </v-card-actions>
        </div>

        <v-avatar class="ma-10" size="125" tile>
          <v-img :src="roomImage"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
var el = [];
export default {
  data() {
    return {
      dialog: false,
      reserveDialog: false,
      picker1: null,
    };
  },
  props: ["room"],
  computed: {
    ...mapGetters(["get_clients"]),
    roomImage() {
      return require("../../assets/" + this.room.imgSrc);
    },
  },
  methods: {
    reserve() {
      if (!this.get_clients) {
        if (
          confirm("You must be loged in to reserve.\n Do you want to log in?")
        ) {
          this.$router.push("/login");
        } else {
          return;
        }
      }
      if (this.picker1) {
        console.log(this.get_clients[0]._id);
        var params = JSON.stringify({
          clientId: this.get_clients[0]._id,
          auditoriumId: this.room._id,
          bookedAtAudi: this.picker1,
          codexAudi: this.room.name,
          priceAudi: this.room.price,
        });
        axios
          .post(
            "http://localhost:3000/api/reservation/post-reservation/",
            params,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        var dates = JSON.stringify({
          auditorium: this.room._id,
          bookedAtAudi: this.picker1,
        });
        axios.post(
          "http://localhost:3000/api/auditorium/add-dates-auditorium",
          dates,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.reserveDialog = false;
        this.$router.go();
      } else {
        alert("You must select booking dates");
      }
    },
    getDatesBetween(room) {
      el = [];
      if (room.bookedAt.length > 0) {
        for (var i = 0; i < room.bookedAt.length; i++) {
          el.push(new Date(room.bookedAt[i]).toISOString().substr(0, 10));
        }
      }
    },
    allowedDates: (val) => el.indexOf(val) === -1,
  },
};
</script>

<style scoped>
.available {
  color: #4caf50;
  font-weight: bold;
}
.unavailable {
  color: #b71c1c;
  font-weight: bold;
}
.reserved {
  background-color: gray !important;
  cursor: not-allowed;
}
.open {
  background-color: #ff9800 !important;
}
.books {
  color: #b71c1c;
}
.pipe {
  color: black;
}
.priced {
  margin-left: 10px;
  padding: 10px;
  border-radius: 50%;
  color: white;
  background-color: #ff9800 !important;
}
.pic-date {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5vh;
}
.title-block {
  background-color: #1976d2;
  color: white;
  padding: 5px;
  border-radius: 10px;
}
.title {
  text-align: center;
}
/* .picker-block {
  margin-left: 2vw;
}
.pickers {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.combiner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
} */
.buttons-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5vh;
}
</style>
