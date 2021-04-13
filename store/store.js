import { make } from "vuex-pathify";

const state = {
  currentStore: {
    id: null,
    name: "",
  },
  stores: [],
  currentLocalStore: {
    id: null,
    name: "",
  },
  atStore: null,
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
};
