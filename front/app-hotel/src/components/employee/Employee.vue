<template>
  <v-app>
    <div>
      <div class="prekrivac">
        <v-card
          class="mt-5"
          max-width="350px"
          max-height="450px"
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

          <v-card-actions>
            <v-btn outlined rounded text> <router-link to="/profile" class="router-linkic">back</router-link> </v-btn>
            <!-- POCETAK -->
            <v-dialog v-model="dialogAddRoom" max-width="65%" :retain-focus="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  rounded
                  text
                  class="ml-2"
                  color="green"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    dialogAddRoom = true;
                    checkFile();
                    checkError();
                  "
                >
                  add room
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Create Room</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Room name*"
                          v-model="roomName"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Price*"
                          v-model="roomPrice"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <input
                          type="file"
                          ref="file"
                          @change="selectFile"
                          id="file"
                          accept="image/*"
                          required
                        />
                        <label class="upload" for="file"
                          ><font-awesome-icon icon="fa-solid fa-image" />
                          Uplaod a Picture
                        </label>
                      </v-col>
                      <!-- column two -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Bed count*"
                          v-model="bedCount"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Bed type*"
                          v-model="bedType"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox
                          label="Terrace*"
                          v-model="terrace"
                        ></v-checkbox>
                      </v-col>
                      <!-- ENd of column two -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Oriented*"
                          v-model="oriented"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Floor*"
                          type="number"
                          v-model="floor"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox
                          label="Internet connection*"
                          v-model="internetConnection"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Wardrobes*"
                          v-model="wardrobes"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Stars*"
                          type="number"
                          v-model="roomStars"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                  <div class="error" v-if="roomErr.length > 0">
                    {{ roomErr }}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="dialogAddRoom = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="createRoom()"
                  >
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- KRAJ -->
            <!-- <v-btn outlined rounded text color="green"> add auditorium </v-btn> -->
            <v-dialog v-model="dialogAddAuditorium" max-width="50%" :retain-focus="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  rounded
                  text
                  color="green"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    dialogAddAuditorium = true;
                    checkFile();
                    checkError();
                  "
                >
                  add auditorium
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Create Auditorium</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Auditorium ID"
                          v-model="audiId"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Auditorium name"
                          v-model="audiName"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Price"
                          v-model="audiPrice"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <input
                          type="file"
                          ref="file"
                          @change="selectFile"
                          id="file"
                          accept="image/*"
                          required
                        />
                        <label class="upload" for="file"
                          ><font-awesome-icon icon="fa-solid fa-image" />
                          Uplaod a Picture
                        </label>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Seats"
                          v-model="audiSeats"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Surface"
                          v-model="audiSurface"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox label="Stage*" v-model="stage"></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox
                          label="Projector*"
                          v-model="projector"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox label="Sound*" v-model="sound"></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Stars*"
                          type="number"
                          v-model="audiStars"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                  <div class="error" v-if="roomErr.length > 0">
                    {{ roomErr }}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="dialogAddAuditorium = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click.prevent="createAuditorium()"
                  >
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
        <!-- <div class="add">
          <v-btn text width="50%">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </v-btn>
        </div> -->
        <div class="tables">
          <div>
            <div class="table-title mt-3">Rooms</div>
            <v-data-table
              :headers="roomHeaders"
              :items="rooms"
              :items-per-page="5"
              class="elevation-1 m-3"
            >
              <template slot="item.image" slot-scope="imgs">
                <v-img
                  :src="require('../../assets/' + imgs.item.image)"
                  height="70px"
                  width="200px"
                ></v-img>
              </template>
              <template slot="item.controls" slot-scope="props">
                <v-btn
                  class="mx-2"
                  fab
                  small
                  @click="deleteOneRoom(props.item)"
                >
                  <font-awesome-icon icon="fa-solid fa-x" />
                </v-btn>
                <v-dialog v-model="dialogEditRoom" max-width="50%" :retain-focus="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="checkProps(props.item);checkError()"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen" />
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5"> Edit Room </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Codex*"
                              v-model="editRoomCodex"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Price*"
                              type="number"
                              v-model="editRoomPrice"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Beds*"
                              type="number"
                              v-model="editRoomBeds"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Wardrobes*"
                              type="number"
                              v-model="editRoomWardrobes"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                      <div class="error" v-if="roomErr.length > 0">
                        {{ roomErr }}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="dialogEditRoom = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="editRoom()"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-data-table>
          </div>
          <div>
            <div class="table-title mt-3">Auditoriums</div>
            <v-data-table
              :headers="audiHeaders"
              :items="auditoriums"
              :items-per-page="5"
              class="elevation-1 m-3"
            >
              <template slot="item.image" slot-scope="imgs">
                <v-img
                  :src="require('../../assets/' + imgs.item.image)"
                  height="70px"
                  width="200px"
                ></v-img>
              </template>
              <template slot="item.controls" slot-scope="props">
                <v-btn
                  class="mx-2"
                  fab
                  small
                  @click="deleteOneAuditorium(props.item)"
                >
                  <font-awesome-icon icon="fa-solid fa-x" />
                </v-btn>
                <v-dialog v-model="dialogEditAuditorium" max-width="50%" :retain-focus="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="checkProps(props.item);checkError()"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen" />
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5"> Edit Auditorium </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Codex*"
                              v-model="editAudiCodex"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Price*"
                              type="number"
                              v-model="editAudiPrice"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Seats*"
                              type="number"
                              v-model="editAudiSeats"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-checkbox
                              label="Stage*"
                              v-model="editAudiStage"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-checkbox
                              label="Projector*"
                              v-model="editAudiProjector"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                      <div class="error" v-if="roomErr.length > 0">
                        {{ roomErr }}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="dialogEditAuditorium = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="editAuditorium()"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      roomHeaders: [
        { text: "Image", value: "image", sortable: false, width: "70px" },
        { text: "Codex", align: "start", value: "name" },
        { text: "Price", value: "money" },
        { text: "Beds", value: "beds" },
        { text: "Bed type", value: "bed_type" },
        { text: "Wardrobes", value: "wardrobes" },
        { text: "", value: "controls", sortable: false },
      ],
      audiHeaders: [
        { text: "Image", value: "image", sortable: false, width: "70px" },
        { text: "Codex", align: "start", value: "name" },
        { text: "Price", value: "money" },
        { text: "Seats", value: "seats" },
        { text: "Stage", value: "stage" },
        { text: "Projector", value: "projector" },
        { text: "", value: "controls", sortable: false },
      ],
      dialogAddRoom: false,
      roomName: "",
      roomPrice: 0,
      bedCount: 0,
      bedType: "",
      terrace: false,
      oriented: "",
      floor: 0,
      internetConnection: false,
      wardrobes: 0,
      roomStars: 0,
      file: "",
      roomErr: "",
      dialogAddAuditorium: false,
      audiId: "",
      audiName: "",
      audiPrice: "",
      audiSeats: 0,
      audiSurface: 0,
      stage: false,
      projector: false,
      sound: false,
      audiStars: 0,
      // editRoom
      dialogEditRoom: false,
      editRoomCodex: "",
      editRoomPrice: 0,
      editRoomBeds: 0,
      editRoomWardrobes: 0,
      // editAudi
      editAudiCodex: "",
      editAudiPrice: 0,
      editAudiSeats: 0,
      editAudiStage: false,
      editAudiProjector: false,
      dialogEditAuditorium: false,
      editProp: null,
    };
  },
  computed: {
    ...mapGetters(["get_rooms", "get_auditoriums", "get_clients"]),
    rooms() {
      let roomArray = [];
      for (var i = 0; i < this.get_rooms.length; i++) {
        let roomObj = {};
        roomObj.image = this.get_rooms[i].imgSrc;
        roomObj.name = this.get_rooms[i].roomId;
        roomObj.money = this.get_rooms[i].price + "$";
        roomObj.beds = this.get_rooms[i].bedCount;
        roomObj.bed_type = this.get_rooms[i].bedType;
        roomObj.wardrobes = this.get_rooms[i].wardrobes;
        roomArray.push(roomObj);
      }
      return roomArray;
    },
    auditoriums() {
      let audiArray = [];
      for (var i = 0; i < this.get_auditoriums.length; i++) {
        let audiObj = {};
        audiObj.image = this.get_auditoriums[i].imgSrc;
        audiObj.name = this.get_auditoriums[i].name;
        audiObj.money = this.get_auditoriums[i].price + "$";
        audiObj.seats = this.get_auditoriums[i].seats;
        let stageVar;
        if (this.get_auditoriums[i].stage == true) {
          stageVar = "It has";
        } else {
          stageVar = "Doesn't have";
        }
        audiObj.stage = stageVar;
        let projectorVar;
        if (this.get_auditoriums[i].projector == true) {
          projectorVar = "It has";
        } else {
          projectorVar = "Doesn't have";
        }
        audiObj.projector = projectorVar;
        audiArray.push(audiObj);
      }
      return audiArray;
    },
  },
  methods: {
    checkFile() {
      if (this.file !== "") {
        this.file = "";
      }
    },
    checkError() {
      if (this.roomErr !== "") {
        this.roomErr = "";
      }
    },
    checkProps(props){
      this.editProp = props
    },
    async createRoom() {
      if (
        this.roomName &&
        this.roomPrice &&
        this.bedCount &&
        this.bedType &&
        this.oriented &&
        this.floor &&
        this.wardrobes &&
        this.roomStars &&
        this.file
      ) {
        const formData = new FormData();
        formData.append("productImage", this.file);
        console.log("doslo je do requesta");
        await axios
          .post(
            "http://localhost:3000/api/room/post-room/" +
              this.roomName +
              "/" +
              this.roomPrice +
              "/" +
              this.bedCount +
              "/" +
              this.bedType +
              "/" +
              this.terrace +
              "/" +
              this.oriented +
              "/" +
              this.floor +
              "/" +
              this.internetConnection +
              "/" +
              this.wardrobes +
              "/" +
              this.roomStars,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(formData);
            console.log(err);
          });
        this.dialogAddRoom = false;
        this.$router.go();
      } else {
        this.roomErr = "You must fill all fields!";
      }
    },
    async createAuditorium() {
      if (
        this.audiId &&
        this.audiName &&
        this.audiPrice &&
        this.audiSeats &&
        this.audiSurface &&
        this.audiStars &&
        this.file
      ) {
        const formData = new FormData();
        formData.append("productImage", this.file);
        console.log("doslo je do requesta");
        await axios
          .post(
            "http://localhost:3000/api/auditorium/post-auditorium/" +
              this.audiId +
              "/" +
              this.audiName +
              "/" +
              this.audiPrice +
              "/" +
              this.audiSeats +
              "/" +
              this.audiSurface +
              "/" +
              this.stage +
              "/" +
              this.projector +
              "/" +
              this.sound +
              "/" +
              this.audiStars,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(formData);
            console.log(err);
          });
        this.dialogAddAuditorium = false;
        this.$router.go();
      } else {
        this.roomErr = "You must fill all fields!";
      }
    },
    async deleteOneRoom(props) {
      console.log(props);
      let indexCodex;
      indexCodex = this.get_rooms.find((room) => {
        return room.roomId === props.name;
      });
      console.log(indexCodex);
      await axios.delete(
        "http://localhost:3000/api/room/delete-room/" + indexCodex._id
      );
      this.$router.go();
    },
    async deleteOneAuditorium(props) {
      console.log(props);
      let indexCodex;
      indexCodex = this.get_auditoriums.find((room) => {
        return room.name === props.name;
      });
      console.log(indexCodex);
      await axios.delete(
        "http://localhost:3000/api/auditorium/delete-auditorium/" +
          indexCodex._id
      );
      this.$router.go();
    },
    async editRoom() {
      let indexCodex;
      indexCodex = this.get_rooms.find((room) => {
        return room.roomId === this.editProp.name;
      });
      if (
        this.editRoomCodex &&
        this.editRoomPrice &&
        this.editRoomBeds &&
        this.editRoomWardrobes
      ) {
        await axios.put(
          "http://localhost:3000/api/room/edit-one-room/" +
            indexCodex._id +
            "/" +
            this.editRoomCodex +
            "/" +
            this.editRoomPrice +
            "/" +
            this.editRoomBeds +
            "/" +
            this.editRoomWardrobes
        );

        this.dialogEditRoom = false;
        this.$router.go();
      } else {
        this.roomErr = "You must fill all fields!";
      }
    },
    async editAuditorium() {
      let indexCodex;
      indexCodex = this.get_auditoriums.find((room) => {
        return room.name == this.editProp.name;
      });
      console.log(indexCodex);
      if (
        this.editAudiCodex &&
        this.editAudiPrice &&
        this.editAudiSeats 
      ) {
        await axios.put(
          
          "http://localhost:3000/api/auditorium/edit-one-auditorium/" +
            indexCodex._id +
            "/" +
            this.editAudiCodex +
            "/" +
            this.editAudiPrice +
            "/" +
            this.editAudiSeats +
            "/" +
            this.editAudiStage +
            "/" +
            this.editAudiProjector
        );

        this.dialogEditAuditorium = false;
        this.$router.go();
      } else {
        this.roomErr = "You must fill all fields!";
      }
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
  },
  mounted() {
    this.$store.dispatch("getRooms");
    this.$store.dispatch("getAuditoriums");
  },
};
</script>
<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
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

.prekrivac {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.spajalica {
  display: flex;
  flex-direction: row;
}
.add {
  display: flex;
  width: 2rem;
  height: 100%;
  background-color: #4caf50;
  justify-content: center;
  align-items: center;
  min-height: inherit;
  height: inherit;
  border-radius: 50px;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 0px;
  min-height: 100%;
  border-radius: 50px;
}
.room-table {
  width: 95%;
  flex-shrink: 0;
}
.tables {
  display: flex;
  flex-direction: column;
}
.prekrivac.v-sheet.v-card {
  border-radius: 4px;
  max-height: 25rem;
}
.v-sheet.v-card[data-v-1de909af] {
  border-radius: 4px;
  max-height: fit-content;
}
.error {
  background-color: red;
  color: white;
  text-align: center;
}
.router-linkic{
  text-decoration: none;
  color: black
}
</style>
