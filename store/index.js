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
  currentTab: "/pages/home/index",
  configs: {
    tabMap: {
      "/pages/home/index": {
        active: "/pages/home/index"
      },
      "/pages/user/booking": {
        active: "/pages/user/index"
      },
      "/pages/user/index": {
        active: "/pages/user/index"
      },
      "/pages/user/giftlist": {
        active: "/pages/user/index"
      },
      // "/pages/user/costRecord": {
      //   active: "/pages/user/index"
      // },
      // "/pages/store/detail": {
      //   active: "/pages/home/index"
      // },
      // "/pages/booking/create": {
      //   active: "/pages/home/index"
      // },
      "/pages/event/index": {
        active: "/pages/event/index"
      },
      // "/pages/event/success": {
      //   active: "/pages/event/index"
      // },
      // "/pages/user/giftSuccess": {
      //   active: "/pages/user/index"
      // },
      "/pages/food/index": {
        active: "/pages/food/index"
      }
    }
  }
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
