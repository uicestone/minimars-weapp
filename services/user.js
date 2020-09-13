import * as api from "../common/vmeitime-http/index";
import store from "../store";
import { event } from "./event";
import { wechatLogin } from "../services";

export const fetchUser = async () => {
  const res = await api.getAuthUser();
  store.state.auth.user = res.data;
  return res.data;
};

export const checkLogin = async () => {
  if (!store.state.auth.token) {
    await wechatLogin();
  }
};

export const checkUserInfo = () =>
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

export const checkMobile = () =>
  new Promise((res, rej) => {
    if (!store.state.auth.user.mobile) {
      event.once("mobile", () => {
        res();
      });
      store.state.auth.showGetPhone = true;
    } else {
      res();
    }
  });
