<template>
  <div>
    <v-card elevation="15">
      <div class="d-flex flex-no-wrap justify-space-between mb-3">
        <div>
          <!-- <v-card-title class="text-h5" v-text="item.title"
              >Supermodel</v-card-title
            > -->
          <v-card-title class="text-h5"
            >Room Codex Name: {{ room.roomId }}</v-card-title
          >

          <!-- <v-card-subtitle v-text="item.artist">Foster the People</v-card-subtitle>  -->

          <v-card-subtitle
            >Beds: {{ room.bedCount }}
            |
            <span v-if="room.terrace == true">Terrace |</span>
            {{ room.oriented }} side | Floor: {{ room.floor }} |
            <span v-if="room.internetConnection == true">Internet |</span>
            <p :class="{ available: !room.booked }" v-if="!room.booked">
              Available for all dates
            </p>
            <p :class="{ unavailable: room.booked }" v-if="room.booked">
              Unavailable
              <span
                v-for="(reserved, index) in room.bookedAt"
                :key="reserved.id"
              >
                from {{ room.bookedAt[index] }} till
                {{ room.bookedTill[index] }}
                <span v-if="room.bookedAt.length > 1"> |</span>
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
                  Book
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
                    <v-btn dark text @click="reserve()"> Book </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <div class="combiner">
                  <div>
                    <v-img
                      class="ml-2"
                      height="300"
                      width="300"
                      :src="roomImage"
                    ></v-img>
                  </div>
                  <div>
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row">Beds:</th>
                          <td>{{ room.bedCount }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Bed type:</th>
                          <td>{{ room.bedType }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Terrace:</th>
                          <td v-if="room.terrace">It has a terrace</td>
                          <td v-if="!room.terrace">
                            It doesn't have a terrace
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Oriented:</th>
                          <td>{{ room.oriented }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Floor:</th>
                          <td>{{ room.floor }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Internet connection:</th>
                          <td v-if="room.internetConnection">
                            It has internet
                          </td>
                          <td v-if="!room.internetConnection">
                            It doesn't have internet
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Wardrobes:</th>
                          <td>{{ room.wardrobes }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="pickers">
                    <div class="picker-block">
                      <!-- SET MIN DATE-TODAY -->
                      <div class="title-block">
                        <h3 class="title">Book from</h3>
                      </div>
                      <v-date-picker
                        v-model="picker1"
                        :allowed-dates="allowedDates"
                        class="mt-4 mx-2"
                        :min="new Date().toISOString().substr(0, 10)"
                        max="2023-01-01"
                        elevation="15"
                      ></v-date-picker>
                    </div>
                    <div class="picker-block">
                      <!-- SET MIN DATE-TODAY + 1 -->
                      <div class="title-block">
                        <h3 class="title">Book to</h3>
                      </div>
                      <v-date-picker
                        v-model="picker2"
                        :allowed-dates="allowedDates"
                        class="mt-4 mx-2"
                        :min="new Date().toISOString().substr(0, 10)"
                        max="2023-01-01"
                        elevation="15"
                      ></v-date-picker>
                    </div>
                  </div>
                </div>
                <div class="buttons-block">
                  <v-btn
                    color="orange"
                    @click="
                      reserve();
                      getDatesBetween(room);
                    "
                    >book</v-btn
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
                <v-card-title class="text-h5">
                  Room Codex Name: {{ room.roomId }}
                </v-card-title>
                <v-card-text>
                  <v-rating
                    :value="room.stars"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  This room is priced at {{ room.price }}$ per day<span
                    v-if="room.booked"
                    >and is booked:
                    <span
                      v-for="(reserved, index) in room.bookedAt"
                      :key="reserved.id"
                    >
                      from {{ room.bookedAt[index] }}, till
                      {{ room.bookedTill[index] }} | ;
                    </span> </span
                  ><span v-if="!room.booked">.</span> It has
                  {{ room.bedCount }} {{ room.bedType }} bed(s)
                  <span v-if="room.terrace">, a terrace</span>, and is oriented
                  {{ room.oriented }}. The room is placed on the
                  {{ room.floor }}. floor<span v-if="room.internetConnection"
                    >, has an internet connection</span
                  >, and {{ room.wardrobes }} wardrobe(s).</v-card-text
                >
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
                      Book
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
      picker2: null,
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
      if (this.picker1 && this.picker2) {
        console.log("ID from RoomCard" + this.get_clients[0]._id);
        console.log("From RoomCard: " + sessionStorage.getItem("client") || "[]");
        var params = JSON.stringify({
          clientId: this.get_clients[0]._id,
          roomId: this.room._id,
          bookedAtRoom: this.picker1,
          bookedTillRoom: this.picker2,
          codexRoom: this.room.roomId,
          priceRoom: this.room.price,
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
          room: this.room._id,
          bookedAtRoom: this.picker1,
          bookedTillRoom: this.picker2,
        });
        axios.post("http://localhost:3000/api/room/add-dates-room", dates, {
          headers: {
            "Content-Type": "application/json",
          },
        });
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
          const currentDate = new Date(room.bookedAt[i]);
          const endDate = new Date(room.bookedTill[i]);
          while (currentDate < endDate) {
            el.push(currentDate.toISOString().substr(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          el.push(endDate.toISOString().substr(0, 10));
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
.picker-block {
  margin-left: 2vw;
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
}
.buttons-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}
</style>
