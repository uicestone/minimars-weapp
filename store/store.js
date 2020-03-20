import { make } from "vuex-pathify";

const state = {
  currentStore: {
    id: uni.getStorageSync("storeId"),
    name: null
  },
  stores: []
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
};
