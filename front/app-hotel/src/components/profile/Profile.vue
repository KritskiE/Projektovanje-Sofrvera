<!-- 
Komponenta za prikazivanje profila korisnika zajedno sa rezervisanim sobama i/ili konferencijskim salama i ukupne cene
Ime komponente: Profile.vue
Programer: Dusan Ilic
Verzija: 1.0 (06/12/2022)
 -->
<template>
  <v-app>
    <div class="ml-5 mr-5 mt-5">
      <div v-if="this.get_reservations" class="prekrivac">
        <!-- 
          *********************************************************************
          * HTML komponenta za prikazivanje profila korisnika
          * Ime komponente: profile-card
          * Programer: Dusan Ilic
          * Verzija: 1.0 (06/12/2022)

          * 1# Funkcija: Dohvatanje korisnika iz skladista: ...mapGetters(["this_clients"])
          * Pozivanje dohvacenog korisnika u template-u: {{this.get_clients[0]}}
          * Izlaz: {
          *   username: "dusanilic99"
          *   password: "dusanilic99"
          *   forename: "Dusan"
          *   surname: "Ilic"
          *   staff: false
          * }
          * 2# Funkcija: Otvaranje dialoga za promenu podataka profila
          * Poziv funkcije: profileEditDialog = true
          *********************************************************************
         -->
        <v-card
          id="profile-card"
          class="mt-5"
          max-width="344"
          outlined
          elevation="5"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">OVERVIEW</div>
              <v-list-item-title class="text-h5 mb-1">
                User: {{ this.get_clients[0].username }}
              </v-list-item-title>
              <v-list-item-subtitle
                >Forename:
                {{ this.get_clients[0].forename }}</v-list-item-subtitle
              ><v-list-item-subtitle
                >Surname:
                {{ this.get_clients[0].surname }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <!-- DIALOG -->
          <v-card-actions>
            <v-dialog v-model="profileEditDialog" width="40%">
              <template v-slot:activator="{ on, attrs }"
                ><v-btn
                  outlined
                  rounded
                  text
                  @click="profileEditDialog = true"
                  v-bind="attrs"
                  v-on="on"
                >
                  Edit
                </v-btn>
              </template>
              <v-card class="edit-card">
                <v-card-title class="text-h5"> User editing </v-card-title>
                <form>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="password"
                    type="password"
                    required
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
                    label="Are you sure?"
                    required
                  ></v-checkbox>
                  <v-btn class="mr-4" @click.prevent="checkForm()"
                    >submit</v-btn
                  >
                  <v-btn @click.prevent="clearall()">clear</v-btn>
                  <v-btn @click.prevent="profileEditDialog = false"
                    >cancel</v-btn
                  >
                  <div class="errorWrap">
                    <div class="errors" v-for="err in errors" :key="err.id">
                      {{ err }}
                    </div>
                  </div>
                </form>
              </v-card>
            </v-dialog>
            <v-btn
              outlined
              rounded
              text
              class="ml-4"
              v-if="this.get_clients[0].staff"
            >
              <router-link to="employee" class="r-link"> Employee</router-link>
            </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Payment information</div>
              <v-list-item-title class="text-h7 mb-1">
                All payments are made at reception
              </v-list-item-title>
              <v-list-item-subtitle
                >You chose to pay with: Cash or Credit
                cards</v-list-item-subtitle
              ><v-list-item-subtitle
                >Things included: gym, olympic pool, food &
                drinks</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <div>
          <div v-if="this.get_reservations.roomRef.bookedAt.length > 0">
            <div class="table-title">Booked rooms</div>
            <v-data-table
              :headers="roomHeaders"
              :items="rooms"
              :items-per-page="4"
              class="elevation-1 ml-5"
            >
              <template slot="item.controls" slot-scope="props">
                <v-btn
                  class="mx-2"
                  fab
                  small
                  @click="deleteOneRoomRes(props.item)"
                >
                  <font-awesome-icon icon="fa-solid fa-x" />
                </v-btn>

                <v-dialog transition="dialog-bottom-transition" max-width="60%">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      small
                      @click="
                        updateDialog = true;
                        getDatesBetween(props.item);
                      "
                      v-bind="attrs"
                      v-on="on"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen" />
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card elevation="0">
                      <v-toolbar color="primary" dark
                        >Change the dates</v-toolbar
                      >
                      <v-card-text>
                        <!-- stepper -->
                        <v-stepper v-model="e1">
                          <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">
                              Name of step 1
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">
                              Name of step 2
                            </v-stepper-step>
                          </v-stepper-header>

                          <v-stepper-items>
                            <v-stepper-content step="1">
                              <v-card class="mb-12" elevation="0">
                                <div class="pickers">
                                  <div class="picker-block">
                                    <!-- SET MIN DATE-TODAY -->
                                    <div class="title-block">
                                      <h3 class="title">Book from</h3>
                                    </div>
                                    <v-date-picker
                                      v-model="pickerRoom1"
                                      :allowed-dates="allowedDates"
                                      class="mt-4 mx-2"
                                      :min="
                                        new Date().toISOString().substr(0, 10)
                                      "
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
                                      v-model="pickerRoom2"
                                      :allowed-dates="allowedDates"
                                      class="mt-4 mx-2"
                                      :min="
                                        new Date().toISOString().substr(0, 10)
                                      "
                                      max="2023-01-01"
                                      elevation="15"
                                    ></v-date-picker>
                                  </div></div
                              ></v-card>

                              <v-btn
                                color="primary"
                                @click="e1 = 2"
                                :disabled="!(pickerRoom1 && pickerRoom2)"
                              >
                                Continue
                              </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                              <v-card
                                class="mb-12 center-the-button"
                                height="200px"
                                elevation="0"
                              >
                                <!-- OVDE DIALOG CLOSE I OPALI UPDATE -->
                                <v-btn
                                  color="primary"
                                  @click="
                                    dialog.value = false;
                                    updateOneRoomRes(
                                      props.item,
                                      pickerRoom1,
                                      pickerRoom2
                                    );
                                  "
                                >
                                  Update!
                                </v-btn>
                              </v-card>
                            </v-stepper-content>
                          </v-stepper-items>
                        </v-stepper>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </template>
            </v-data-table>
          </div>
          <div
            class="mt-5"
            v-if="this.get_reservations.auditoriumRef.bookedAt.length > 0"
          >
            <div class="table-title">Booked auditoriums</div>
            <v-data-table
              :headers="audiHeaders"
              :items="auditoriums"
              :items-per-page="4"
              class="elevation-1 ml-5"
            >
              <template slot="item.controls" slot-scope="props">
                <v-btn
                  class="mx-2"
                  fab
                  small
                  @click="deleteOneAuditoriumRes(props.item)"
                >
                  <font-awesome-icon icon="fa-solid fa-x" />
                </v-btn>
                <v-dialog transition="dialog-bottom-transition" max-width="60%">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      small
                      @click="
                        audiUpdate = true;
                        getDatesBetweenAudi(props.item);
                      "
                      v-bind="attrs"
                      v-on="on"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen" />
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card elevation="0">
                      <v-toolbar color="primary" dark
                        >Change the date</v-toolbar
                      >
                      <v-card-text>
                        <!-- stepper -->
                        <v-stepper v-model="e1">
                          <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">
                              Name of step 1
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">
                              Name of step 2
                            </v-stepper-step>
                          </v-stepper-header>

                          <v-stepper-items>
                            <v-stepper-content step="1">
                              <v-card class="mb-12" elevation="0">
                                <div class="pickers">
                                  <div class="picker-block">
                                    <!-- SET MIN DATE-TODAY -->
                                    <div class="title-block">
                                      <h3 class="title">Book at</h3>
                                    </div>
                                    <v-date-picker
                                      v-model="pickerAudi1"
                                      :allowed-dates="allowedDates"
                                      class="mt-4 mx-2"
                                      :min="
                                        new Date().toISOString().substr(0, 10)
                                      "
                                      max="2023-01-01"
                                      elevation="15"
                                    ></v-date-picker>
                                  </div>
                                </div>
                              </v-card>

                              <v-btn
                                color="primary"
                                @click="e1 = 2"
                                :disabled="!pickerAudi1"
                              >
                                Continue
                              </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                              <v-card
                                class="mb-12 center-the-button"
                                height="200px"
                                elevation="0"
                              >
                                <!-- OVDE DIALOG CLOSE I OPALI UPDATE -->
                                <v-btn
                                  color="primary"
                                  @click="
                                    dialog.value = false;
                                    updateOneAudiRes(props.item, pickerAudi1);
                                  "
                                >
                                  Update!
                                </v-btn>
                              </v-card>
                            </v-stepper-content>
                          </v-stepper-items>
                        </v-stepper>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </template>
            </v-data-table>
          </div>
        </div>
        <v-card
          class="mt-5 ml-5 faded"
          max-width="344"
          outlined
          elevation="5"
          v-if="
            this.get_reservations.roomRef.bookedAt.length > 0 ||
            this.get_reservations.auditoriumRef.bookedAt.length > 0
          "
        >
          <div class="price-box">
            <h2>PRICE:</h2>
            <h2>{{ this.wholePrice }}$</h2>
          </div>

          <v-card-actions> </v-card-actions>
        </v-card>
      </div>
      <div v-if="!this.get_reservations" class="flexikana">
        <v-card class="mt-5" max-width="344" outlined elevation="5">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">OVERVIEW</div>
              <v-list-item-title class="text-h5 mb-1">
                User: {{ this.get_clients[0].username }}
              </v-list-item-title>
              <v-list-item-subtitle
                >Forename:
                {{ this.get_clients[0].forename }}</v-list-item-subtitle
              ><v-list-item-subtitle
                >Surname:
                {{ this.get_clients[0].surname }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-dialog v-model="profileEditDialog" width="40%">
              <template v-slot:activator="{ on, attrs }"
                ><v-btn
                  outlined
                  rounded
                  text
                  @click="profileEditDialog = true"
                  v-bind="attrs"
                  v-on="on"
                >
                  Edit
                </v-btn>
              </template>
              <v-card class="edit-card">
                <v-card-title class="text-h5"> User editing </v-card-title>
                <form>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="password"
                    type="password"
                    required
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
                    label="Are you sure?"
                    required
                  ></v-checkbox>
                  <v-btn class="mr-4" @click.prevent="checkForm()"
                    >submit</v-btn
                  >
                  <v-btn class="mr-4" @click.prevent="clearall()">clear</v-btn>
                  <v-btn @click.prevent="profileEditDialog = false"
                    >cancel</v-btn
                  >
                  <div class="errorWrap">
                    <div class="errors" v-for="err in errors" :key="err.id">
                      {{ err }}
                    </div>
                  </div>
                </form>
              </v-card>
            </v-dialog>
            <v-btn
              outlined
              rounded
              text
              class="ml-4"
              v-if="this.get_clients[0].staff"
            >
              <router-link to="employee" class="r-link">Employee</router-link>
            </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Payment information</div>
              <v-list-item-title class="text-h7 mb-1">
                All payments are made at reception
              </v-list-item-title>
              <v-list-item-subtitle
                >You chose to pay with: Cash or Credit
                cards</v-list-item-subtitle
              ><v-list-item-subtitle
                >Things included: gym, olympic pool, food &
                drinks</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
        
        <v-btn max-width="30%" class="mt-5">HERE WILL BOOKED ROOMS AND AUDITORIUMS SHOW</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
var el = [];
export default {
  data() {
    return {
      roomHeaders: [
        { text: "Codex", align: "start", sortable: false, value: "name" },
        { text: "Price", value: "money" },
        { text: "Booked At", value: "book_at" },
        { text: "Booked Till", value: "book_till" },
        { text: "", value: "controls", sortable: false },
      ],
      audiHeaders: [
        { text: "Codex", align: "start", sortable: false, value: "name" },
        { text: "Price", value: "money" },
        { text: "Booked On", value: "book_on" },
        { text: "", value: "controls", sortable: false },
      ],
      updateDialog: false,
      e1: 1,
      pickerRoom1: null,
      pickerRoom2: null,
      pickerAudi1: null,
      audiUpdate: false,
      profileEditDialog: false,
      errors: [],
      checkbox: false,
      username: "",
      password: "",
      forename: "",
      surname: "",
    };
  },
  computed: {
    ...mapGetters([
      "get_clients",
      "get_reservations",
      "get_rooms",
      "get_auditoriums",
    ]),
    rooms() {
      let roomArray = [];
      for (var i = 0; i < this.get_reservations.roomRef.roomId.length; i++) {
        let roomObj = {};
        roomObj.name = this.get_reservations.roomRef.codex[i];
        roomObj.money = this.get_reservations.roomRef.price[i];
        roomObj.book_at = this.get_reservations.roomRef.bookedAt[i];
        roomObj.book_till = this.get_reservations.roomRef.bookedTill[i];
        roomArray.push(roomObj);
      }
      return roomArray;
    },
    auditoriums() {
      let audiArray = [];
      for (
        var i = 0;
        i < this.get_reservations.auditoriumRef.auditoriumId.length;
        i++
      ) {
        let audiObj = {};
        audiObj.name = this.get_reservations.auditoriumRef.codex[i];
        audiObj.money = this.get_reservations.auditoriumRef.price[i];
        audiObj.book_on = this.get_reservations.auditoriumRef.bookedAt[i];
        audiArray.push(audiObj);
      }
      return audiArray;
    },
    wholePrice() {
      let sumPrice = 0;
      for (var i = 0; i < this.get_reservations.roomRef.price.length; i++) {
        sumPrice += this.get_reservations.roomRef.price[i];
      }
      for (
        var k = 0;
        k < this.get_reservations.auditoriumRef.price.length;
        k++
      ) {
        sumPrice += this.get_reservations.auditoriumRef.price[k];
      }
      return sumPrice;
    },
  },
  methods: {
    checkForm() {
      if (this.errors.length != 0) {
        this.errors = [];
      }
      if (this.checkbox) {
        var obj = {};
        console.log(obj);
        // obj.id = this.get_clients[0]._id
        if (this.username && this.username.length > 10) {
          obj.username = this.username;
          console.log(obj);
        }
        if (this.password) {
          obj.password = this.password;
          console.log(obj);
        }
        if (this.forename) {
          obj.forename = this.forename;
          console.log(obj);
        }
        if (this.surname) {
          obj.surname = this.surname;
          console.log(obj);
        }
        console.log(obj);
        let params = JSON.stringify(obj);
        console.log(params);
        axios
          .put(
            "http://localhost:3000/api/client/put-client/" +
              this.get_clients[0]._id,
            params,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (response) => {
            this.$store.commit("SET_CLIENT", response.data);
            await sessionStorage.setItem(
              "client",
              JSON.stringify(response.data)
            );
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
          });
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
        this.errors.push("Checkbox is required.");
      }
    },
    //PODESI ZA PROPS.ITEM.ROOM_ID
    getDatesBetweenAudi(props) {
      el = [];
      let indexCodex;
      let indexBookedAt;
      indexCodex = this.get_reservations.auditoriumRef.codex
        .map((elm, idx) => (elm === props.name ? idx : ""))
        .filter(String);
      indexBookedAt = this.get_reservations.auditoriumRef.bookedAt
        .map((elm, idx) => (elm === props.book_on ? idx : ""))
        .filter(String);
      const index = indexCodex.filter((el) => indexBookedAt.includes(el));
      let pointedRoom = this.get_auditoriums.find((room) => {
        return (
          room._id == this.get_reservations.auditoriumRef.auditoriumId[index]
        );
      });
      if (pointedRoom.bookedAt.length > 0) {
        for (var i = 0; i < pointedRoom.bookedAt.length; i++) {
          el.push(
            new Date(pointedRoom.bookedAt[i]).toISOString().substr(0, 10)
          );
        }
        console.log(el);
      }
    },
    getDatesBetween(props) {
      el = [];
      let indexCodex;
      let indexBookedAt;
      indexCodex = this.get_reservations.roomRef.codex
        .map((elm, idx) => (elm === props.name ? idx : ""))
        .filter(String);
      indexBookedAt = this.get_reservations.roomRef.bookedAt
        .map((elm, idx) => (elm === props.book_at ? idx : ""))
        .filter(String);
      const index = indexCodex.filter((el) => indexBookedAt.includes(el));
      //zajednicki index
      // console.log(index[0]);
      //Nadji sobu koja odgovara rezervaciji
      let pointedRoom = this.get_rooms.find((room) => {
        return room._id == this.get_reservations.roomRef.roomId[index];
      });
      // console.log(pointedRoom);
      if (pointedRoom.bookedAt.length > 0) {
        for (var i = 0; i < pointedRoom.bookedAt.length; i++) {
          const currentDate = new Date(pointedRoom.bookedAt[i]);
          const endDate = new Date(pointedRoom.bookedTill[i]);
          while (currentDate < endDate) {
            el.push(currentDate.toISOString().substr(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          el.push(endDate.toISOString().substr(0, 10));
        }
      }
    },
    allowedDates: (val) => el.indexOf(val) === -1,

    /*
     ************************************
     * Funkcija: deleteOneRoomRes(props)
     * Ulaz: props - koji predstavlja kliknuti element sa svojim atributima
     * Izlaz: Nema
     * Koriscene gotove funkcije: .map() , .filter()
     * Linkovi gotovih funkcija respektivno
     * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
     * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     */
    deleteOneRoomRes(props) {
      let indexCodex;
      let indexBookedAt;
      // Nalazenje indeksa naziva kliknutog elementa
      indexCodex = this.get_reservations.roomRef.codex //funkcija .map() izvrsena na svim rezervacijama jednog klijenta radi nalazenja indeksa naziva sobe koji se podudara sa kliknutim elementom
        .map((elm, idx) => (elm === props.name ? idx : ""))
        .filter(String);
      // Nalazenje indeksa datuma rezervacije kliknutog elementa
      indexBookedAt = this.get_reservations.roomRef.bookedAt // funkcija .map() izvrsena na svim rezervacijama jednog klijenta radi nalazenja indeksa datuma rezervacije sobe koji se podudara sa kliknutim elementom
        .map((elm, idx) => (elm === props.book_at ? idx : ""))
        .filter(String);
      const index = indexCodex.filter((el) => indexBookedAt.includes(el)); // Nalazenje zajednickog indeksa dva niza indeksa koja smo napravili u prosla dva koraka
      axios.delete(
        // http delete zahtev sa parametrima ID rezervacija i indeksa elemenata u nizovima te rezervacije
        "http://localhost:3000/api/reservation/delete-one-reservation-room/" +
          this.get_reservations._id +
          "/" +
          index[0]
      );
      // Nalazenje indeksa sobe koja je kliknuta u bazi rezervacija; Trazenje elementa koji se podudaraju u bazi Room i bazi Reservation
      let pointedRoom = this.get_rooms.find((room) => {
        return room._id == this.get_reservations.roomRef.roomId[index];
      });
      let bookedIndex = pointedRoom.bookedAt //funkcija .map() izvrsena na nadjenoj sobi, u cilju potrage indeksa datuma rezervacije koji treba da se ukloni iz baze Room
        .map((elm, idx) => (elm === props.book_at ? idx : ""))
        .filter(String);
      axios.delete(
        // http delete zahtev sa parametrima ID sobe i indeksa elemenata u nizovima te rezervacije
        "http://localhost:3000/api/room/delete-one-room-date/" +
          pointedRoom._id +
          "/" +
          bookedIndex[0]
      );

      this.$router.go();
    },
    deleteOneAuditoriumRes(props) {
      console.log(props);
      console.log(this.get_reservations.auditoriumRef);
      let indexCodex;
      let indexBookedAt;
      indexCodex = this.get_reservations.auditoriumRef.codex
        .map((elm, idx) => (elm === props.name ? idx : ""))
        .filter(String);
      console.log(indexCodex);
      indexBookedAt = this.get_reservations.auditoriumRef.bookedAt
        .map((elm, idx) => (elm === props.book_on ? idx : ""))
        .filter(String);
      console.log(indexBookedAt);
      const index = indexCodex.filter((el) => indexBookedAt.includes(el));
      console.log(index[0]);
      axios.delete(
        "http://localhost:3000/api/reservation/delete-one-reservation-auditorium/" +
          this.get_reservations._id +
          "/" +
          index[0]
      );
      // FIND BY ID and by date
      let pointedRoom = this.get_auditoriums.find((room) => {
        return (
          room._id == this.get_reservations.auditoriumRef.auditoriumId[index]
        );
      });
      console.log(pointedRoom._id);
      let bookedIndex = pointedRoom.bookedAt
        .map((elm, idx) => (elm === props.book_on ? idx : ""))
        .filter(String);
      console.log(bookedIndex[0]);
      axios.delete(
        "http://localhost:3000/api/auditorium/delete-one-auditorium-date/" +
          pointedRoom._id +
          "/" +
          bookedIndex[0]
      );

      this.$router.go();
    },
    updateOneRoomRes(props, startDate, endDate) {
      console.log(props);
      console.log(this.get_reservations._id);
      let indexCodex;
      let indexBookedAt;
      indexCodex = this.get_reservations.roomRef.codex
        .map((elm, idx) => (elm === props.name ? idx : ""))
        .filter(String);
      console.log(indexCodex);
      indexBookedAt = this.get_reservations.roomRef.bookedAt
        .map((elm, idx) => (elm === props.book_at ? idx : ""))
        .filter(String);
      console.log(indexBookedAt);
      const index = indexCodex.filter((el) => indexBookedAt.includes(el));
      console.log(index[0]);
      // FIND BY ID and by date
      let pointedRoom = this.get_rooms.find((room) => {
        return room._id == this.get_reservations.roomRef.roomId[index];
      });
      console.log(pointedRoom);
      let bookedIndex = pointedRoom.bookedAt
        .map((elm, idx) => (elm === props.book_at ? idx : ""))
        .filter(String);
      console.log(bookedIndex[0]);
      console.log(startDate);
      console.log(endDate);
      //TREBA DA PROSLEDIM DATUME
      axios.put(
        "http://localhost:3000/api/reservation/put-one-reservation-room/" +
          this.get_reservations._id +
          "/" +
          index[0] +
          "/" +
          startDate +
          "/" +
          endDate
      );
      //TREBA DA PROSLEDIM DATUME
      axios.put(
        "http://localhost:3000/api/room/put-one-room-date/" +
          pointedRoom._id +
          "/" +
          bookedIndex[0] +
          "/" +
          startDate +
          "/" +
          endDate
      );

      this.$router.go();
    },
    updateOneAudiRes(props, date) {
      // GET INDEX OF AUDITORIUM
      console.log(props);
      console.log(this.get_reservations._id);
      let indexCodex;
      let indexBookedAt;
      indexCodex = this.get_reservations.auditoriumRef.codex
        .map((elm, idx) => (elm === props.name ? idx : ""))
        .filter(String);
      console.log(indexCodex);
      indexBookedAt = this.get_reservations.auditoriumRef.bookedAt
        .map((elm, idx) => (elm === props.book_on ? idx : ""))
        .filter(String);
      console.log(indexBookedAt);
      const index = indexCodex.filter((el) => indexBookedAt.includes(el));
      console.log(index[0]);
      //GET INDEX OF DATE
      let pointedRoom = this.get_auditoriums.find((room) => {
        return (
          room._id === this.get_reservations.auditoriumRef.auditoriumId[index]
        );
      });
      console.log(pointedRoom);
      let bookedIndex = pointedRoom.bookedAt
        .map((elm, idx) => (elm === props.book_on ? idx : ""))
        .filter(String);
      console.log(bookedIndex[0]);
      console.log(date);
      axios.put(
        "http://localhost:3000/api/reservation/put-one-reservation-auditorium/" +
          this.get_reservations._id +
          "/" +
          index[0] +
          "/" +
          date
      );
      axios.put(
        "http://localhost:3000/api/auditorium/put-one-auditorium-date/" +
          pointedRoom._id +
          "/" +
          bookedIndex[0] +
          "/" +
          date
      );

      this.$router.go();
    },
  },
  async mounted() {
    await axios
      .get(
        "http://localhost:3000/api/reservation/single-reservation/" +
          this.get_clients[0]._id
      )
      .then((response) => {
        this.$store.commit("SET_RESERVATIONS", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.$store.dispatch("getRooms");
    this.$store.dispatch("getAuditoriums");
  },
};
</script>

<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
}
.prekrivac {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.flexikana{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.table-title {
  display: flex;
  justify-content: center;
  margin-left: 6%;
  background-color: #ff9800;
  color: white;
  width: 90%;
  padding: 5px;
  border-radius: 10px;
}
.yes {
  height: 5%;
  text-align: center;
}
.price-box {
  width: 20vw;
  height: 30%;
  margin-top: 30%;
  text-align: center;
}
.faded {
  background: rgb(255, 152, 0);
  background: linear-gradient(
    360deg,
    rgba(255, 152, 0, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  border: none;
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
.center-the-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-card {
  padding: 4.5rem;
}
.r-link {
  text-decoration: none;
  color: black;
}
</style>
