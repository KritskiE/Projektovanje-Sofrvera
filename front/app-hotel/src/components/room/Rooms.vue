<template>
  <v-app>
    <div class="ml-5 mr-5 prekrivac" id="prekrivac">
      <div class="date-filter">
        <!-- date-filter -->
        <div class="date-box">
          <div>
            <!-- date from -->
            <!-- SET MIN DATE-TODAY -->
            <h3 class="title">Start date</h3>
            <v-date-picker
              v-model="picker1"
              class="mt-4 mx-2"
              :min="new Date().toISOString().substr(0, 10)"
              max="2023-01-01"
              elevation="15"
            ></v-date-picker>
          </div>
          <div>
            <!-- date to -->
            <!-- SET MIN DATE-TODAY + 1 -->
            <h3 class="title">End date</h3>
            <v-date-picker
              v-model="picker2"
              class="mt-4 mx-2"
              :min="new Date().toISOString().substr(0, 10)"
              max="2023-01-01"
              elevation="15"
            ></v-date-picker>
          </div>
          <div>
            <v-btn color="primary" class="ml-2" @click="freeRooms()">
              search
            </v-btn>
          </div>
        </div>
      </div>
      <div class="search-rooms">
        <!-- Search + rooms -->
        <div>
          <!-- Search -->
        </div>
        <div class="room-cards">
          <!-- rooms -->
          <RoomCard v-for="room in get_rooms" :key="room.id" :room="room" />
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import RoomCard from "./RoomCard.vue";
// var el = ['2022-06-10', "2022-07-10"]
export default {
  data() {
    return {
      picker1: new Date().toISOString().substr(0, 10),
      picker2: new Date().toISOString().substr(0, 10),
      spliceFamily: [],
    };
  },
  components: {
    RoomCard,
  },
  computed: {
    ...mapGetters(["get_rooms"]),
  },
  mounted() {
    this.$store.dispatch("getRooms");
    if (sessionStorage.getItem("client")) {
      this.$store.commit(
        "SET_CLIENT",
        JSON.parse(sessionStorage.getItem("client") || "[]")
      );
    }
  },
  methods: {
    /* 
********************************************
* Metoda freeRooms() za zadate granicne datume prikazuje slobodne sobe 
* Programer: Dusan Ilic
<--- Verzija 1 --->
* Problem: Array.filter() funckija nije uspela iz razloga niza u nizu( pomesaju se indeksi )
* Testiranje obavljeno na "zivo"
<--- Verzija 2 --->
* Resenje: Sa znanjem da ne mozemo da iskoristimo Array.filter() Helper funkciju, presli smo na klasicne for petlje. Za sve elemente koji ne ispunjavaju
*          uslove datuma, uklanjamo ih.
* Problem: Nemamo ponovni pristup uklonjenim elementima, koji su zahtevani
<--- Verzija 3 --->
* Resenje: Sledeci korak je bio da cuvamo bas te elemente koji ne ispunjavaju uslove u slucaju da nam ponovo trebaju, i po potrebi vratimo nazad u niz koji prikazujemo
********************************************
*/
    freeRooms() {
      var startPick1 = new Date(this.picker1);
      var startPick2 = new Date(this.picker2);

      if (this.spliceFamily.length > 0) {
        for (var k = 0; k< this.spliceFamily.length; k++) {
          for (var p = 0; p < this.spliceFamily[k].bookedAt.length; p++) {
            var sliceAt = new Date(this.spliceFamily[k].bookedAt[p]);
            var sliceTill = new Date(this.spliceFamily[k].bookedTill[p]);
            if (
              (startPick1 >= sliceAt && startPick2 <= sliceTill) ||
              (startPick1 > sliceAt &&
                startPick1 < sliceTill &&
                startPick2 > sliceTill) ||
              (startPick1 < sliceAt &&
                startPick2 < sliceTill &&
                startPick2 > sliceAt) ||
              (startPick1 < sliceAt && startPick2 > sliceTill)
            ) {
              return;
            } else {
              if (!this.get_rooms.includes(this.spliceFamily[k])) {
                // proveravamo da li vec postoji u element u prikazanom nizu
                this.get_rooms.push(this.spliceFamily[k]); // dodajemo u slucaju da ne postoji
                this.spliceFamily.splice(k, 1); // uklanjamo iz element iz niza ne prihvacenih elemenata
              }
            }
          }
        }
      }
      for (var i = 0; i < this.get_rooms.length; i++) {
        for (var j = 0; j < this.get_rooms[i].bookedAt.length; j++) {
          var roomAt = new Date(this.get_rooms[i].bookedAt[j]);
          var roomTill = new Date(this.get_rooms[i].bookedTill[j]);
          if (
            (startPick1 >= roomAt &&
              startPick1 < roomTill &&
              startPick2 > roomAt &&
              startPick2 <= roomTill) ||
            (startPick1 < roomAt &&
              startPick2 > roomAt &&
              startPick2 <= roomTill) ||
            (startPick1 >= roomAt &&
              startPick1 < roomTill &&
              startPick2 >= roomTill) ||
            (startPick1 < roomAt && startPick2 > roomTill)
          ) {
            this.spliceFamily.push(this.get_rooms[i]);
            this.get_rooms.splice(i, 1);
          }
        }
      }
    },
  },
};

// for (var i = this.get_rooms.length - 1; i >= 0; i--) {
//   for (var j = this.get_rooms[i].bookedAt.length - 1; j >= 0; j--) {
//     var roomAt = new Date(this.get_rooms[i].bookedAt[j]);
//     var roomTill = new Date(this.get_rooms[i].bookedTill[j]);
//     if (
//       (startPick1 >= roomAt &&
//         startPick1 < roomTill &&
//         startPick2 > roomAt &&
//         startPick2 <= roomTill) ||
//       (startPick1 < roomAt &&
//         startPick2 > roomAt &&
//         startPick2 <= roomTill) ||
//       (startPick1 >= roomAt &&
//         startPick1 < roomTill &&
//         startPick2 >= roomTill) ||
//       (startPick1 < roomAt && startPick2 > roomTill)
//     ) {
//       this.spliceFamily.push(this.get_rooms[i]);
//       this.get_rooms.splice(i, 1);
//     }
//   }
// }
</script>

<style scoped>
.prekrivac {
  display: flex;
  flex-direction: row;
}
.date-filter {
  width: 20vw !important;
}
.date_picker {
  justify-content: center;
}
.date-box {
  width: 100%;
  padding: 15px;
  border: 1px solid black;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
.date-box > * {
  padding-top: 10px;
}
.title {
  text-align: center;
}
.search-rooms {
  width: 70vw;
  margin: 15px;
}
.room-cards {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
