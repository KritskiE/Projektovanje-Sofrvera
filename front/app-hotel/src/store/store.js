import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    rooms: [],
    auditoriums: [],
    reservation: null,
    clients: null,
  },
  getters: {
    get_rooms(state) {
      return state.rooms;
    },
    get_auditoriums(state) {
      return state.auditoriums;
    },
    get_clients(state) {
      return state.clients;
    },
    get_reservations(state){
      return state.reservation;
    }
  },
  mutations: {
    SET_ROOMS(state, data) {
      state.rooms = data;
    },
    SET_AUDITORIUMS(state, data) {
      state.auditoriums = data;
    },
    SET_CLIENT(state, data) {
      state.clients = data;
    },
    SET_RESERVATIONS(state, data) {
      state.reservation = data;
    },
    CLEAR_CLIENT(state, data) {
      state.clients = data;
    },
    CLEAR_RESERVATION(state, data){
      state.reservation = data;
    },
    SET_USERNAME(state,data){
      state.clients[0].username = data
    },
    SET_PASSWORD(state,data){
      state.clients[0].password = data
    },
    SET_FORENAME(state,data){
      state.clients[0].forename = data
    },
    SET_SURNAME(state,data){
      state.clients[0].surname = data
    },
  },
  actions: {
    isLoged({ state }) {
      if (state.clients !== null) {
        return true;
      } else {
        return false;
      }
    },
    isLogedStaff({state}){
      if (state.clients !== null && state.clients[0].staff) {
        return true;
      } else {
        return false;
      }
    },
    getRooms({ commit }) {
      axios.get("http://localhost:3000/api/room/all-room").then((response) => {
        commit("SET_ROOMS", response.data);
      });
    },
    getAuditoriums({ commit }) {
      axios
        .get("http://localhost:3000/api/auditorium/all-auditorium")
        .then((response) => {
          commit("SET_AUDITORIUMS", response.data);
        });
    },
    // setReservation({commit, data}){
      
    // }
    clearClient({ commit }) {
      window.localStorage.removeItem('client');
      commit("CLEAR_CLIENT", null);
      commit("CLEAR_RESERVATION", null);
    },
  },
});
