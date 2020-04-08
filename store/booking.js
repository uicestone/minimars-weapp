import { make } from "vuex-pathify";

const state = {
  selectDate: new Date(),
  bookings: [],
  cardTypes: [],
  curBooking: null,
  showBooking: false
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
};
