import * as api from "../common/vmeitime-http/index";
import store from "../store";
import { event } from "./event";

export const fetchUser = async () => {
  const res = await api.getAuthUser();
  store.state.auth.user = res.data;
  return res.data;
};

export const checkLogin = () =>
  new Promise((res, rej) => {
    if (!store.state.auth.user.name) {
      event.once("login", () => {
        res();
      });
      store.state.auth.showLogin = true;
    } else {
      res();
    }
  });
