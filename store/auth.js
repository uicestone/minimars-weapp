import { make } from "vuex-pathify";

const state = {
  showLogin: false,
  showGetPhone: false,
  token: uni.getStorageSync("token") || "",
  session_key: "",
  user: {
    name: "",
    avatarUrl: "",
    openid: "",
    customer: null,
  },
  userCards: [],
};

const mutations = make.mutations(state);

const getters = {};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
};
