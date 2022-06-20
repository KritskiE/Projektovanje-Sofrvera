<template>
  <v-app>
    <div class="ml-5 mr-5 prekrivac" id="prekrivac">
      <div class="date-filter">
        <!-- date-filter -->
        <div class="date-box">
          <div>
            <!-- date from -->
            <!-- SET MIN DATE-TODAY -->
            <h3 class="title">Date</h3>
            <v-date-picker
              v-model="picker1"
              class="mt-4 mx-2"
              :min="new Date().toISOString().substr(0, 10)"
              max="2023-01-01"
              elevation="15"
            ></v-date-picker>
          </div>
          <div>
            <v-btn color="primary" class="ml-2" @click="freeAuditoriums()">
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
          <AuditoriumCard
            v-for="room in get_auditoriums"
            :key="room.id"
            :room="room"
          />
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import AuditoriumCard from "./AuditoriumCard.vue";

export default {
  data() {
    return {
      picker1: new Date().toISOString().substr(0, 10),
      spliceFamily: [],
    };
  },
  components: {
    AuditoriumCard,
  },
  computed: {
    ...mapGetters(["get_auditoriums"]),
    filteredRooms() {
      var startPick1 = new Date(this.picker1);
      var result = this.get_auditoriums.filter((room) => {
        var roomAt = new Date(room.bookedAt);
        if (startPick1 == roomAt) {
          return false;
        } else {
          return true;
        }
      });
      return result;
    },
  },
  mounted() {
    this.$store.dispatch("getAuditoriums");
    if (sessionStorage.getItem("client")) {
      this.$store.commit("SET_CLIENT", JSON.parse(sessionStorage.getItem("client") || "[]"));
    }
  },
  methods: {
    freeAuditoriums() {
      var startPick1 = new Date(this.picker1);
      if (this.spliceFamily.length > 0) {
        for (var k = this.spliceFamily.length - 1; k >= 0; k--) {
          for (var p = this.spliceFamily[k].bookedAt.length - 1; p >= 0; p--) {
            var sliceAt = new Date(this.spliceFamily[k].bookedAt[p]);
            if (startPick1 > sliceAt || startPick1 < sliceAt) {
              if (!this.get_auditoriums.includes(this.spliceFamily[k])) {
                this.get_auditoriums.push(this.spliceFamily[k]);
                this.spliceFamily.splice(k, 1);
                console.log(this.spliceFamily)
                return
              }
            }
          }
        }
      }
      for (var i = this.get_auditoriums.length - 1; i >= 0; i--) {
        for (var j = this.get_auditoriums[i].bookedAt.length - 1; j >= 0; j--) {
          var roomAt = new Date(this.get_auditoriums[i].bookedAt[j]);
          if (startPick1 >= roomAt && startPick1 <= roomAt) {
            this.spliceFamily.push(this.get_auditoriums[i]);
            this.get_auditoriums.splice(i, 1);
          }
        }
      }
    },
  },
};
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
