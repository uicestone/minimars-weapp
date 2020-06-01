import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";

import auth from "./auth";
import booking from "./booking";
import _store from "./store";

Vue.use(Vuex);

pathify.options.mapping = "simple";

const state = {
  loading: false,
  giftCode: null,
  currentTab: "/pages/home/index",
  configs: {
    tabMap: {
      "/pages/home/index": {
        active: "/pages/home/index"
      },
      "/pages/user/index": {
        active: "/pages/user/index"
      },
      "/pages/event/index": {
        active: "/pages/event/index"
      },
      "/pages/mall/index": {
        active: "/pages/mall/index"
      },
      "/pages/food/index": {
        active: "/pages/food/index"
      }
    }
  },
  banners: []
};

const mutations = make.mutations(state);

const getters = {
  curTabConfig: state => state.configs.tabMap[state.currentTab]
};

const store = new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  getters,
  mutations,
  modules: { auth, store: _store, booking }
});

Vue.prototype.$store = store;

export default store;
