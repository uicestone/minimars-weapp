import store from "../store";
import * as api from "../common/vmeitime-http";

export const wechatLogin = () =>
  new Promise(async (resolve, reject) => {
    const provider = "weixin";
    uni.showLoading();
    uni.login({
      provider,
      scopes: "auth_base",
      success: async (loginRes) => {
        try {
          const res = await api.wechatLogin({
            code: loginRes.code,
          });
          if (res.data) {
            storeUser(res.data);
            return resolve(res);
          } else {
            reject(new Error("数据错误"));
          }
        } catch (error) {
          reject(error);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });

export const wechatGetUserInfo = () =>
  new Promise((resolve, reject) => {
    const provider = "weixin";
    uni.showLoading();
    uni.getUserInfo({
      provider,
      lang: "zh_CN",
      success: async (userData) => {
        // console.log(userData);
        try {
          const res = await api.wechatSignup({
            session_key: store.state.auth.session_key,
            encryptedData: userData.encryptedData,
            iv: userData.iv,
          });
          storeUser(res.data);
          resolve(res);
        } catch (err) {
          uni.showToast({
            title: err.message,
            icon: "none",
          });
          reject(err);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });

export const storeUser = (data) => {
  if (!data) return;
  const { user, token, session_key } = data;

  store.state.auth.user = user;
  store.state.auth.token = token;
  store.state.auth.session_key = session_key;
  // store.state.auth.showLogin = false;
};

export const handlePayment = (paymentData) =>
  new Promise((resolve, reject) => {
    uni.showLoading();
    uni.requestPayment({
      signType: "MD5",
      ...paymentData,
      success: (res) => {
        console.log(res);
        resolve({ ...res, ...paymentData });
      },
      fail: (res) => {
        console.log(res);
        reject(res);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });

export const getPhoneNumber = async (data) => {
  const { iv, encryptedData } = data.detail;
  const {
    session_key,
    user: { openid },
  } = store.state.auth;
  const res = await api.updateMobile({ iv, encryptedData, session_key, openid });
  uni.hideLoading();
  const { user, token } = res.data;
  store.state.auth.user = user;
  store.state.auth.token = token;
  return res.data;
};
