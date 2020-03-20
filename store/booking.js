import { make } from "vuex-pathify";

const state = {
  selectDate: new Date(),
  bookings: [],
  cards: []
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
};
