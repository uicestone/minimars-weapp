import * as api from "../common/vmeitime-http";
import store from "../store";

export const loadStore = async () => {
  const res = await api.getStores();
  store.state.store.stores = res.data;
  const localStoreId = uni.getStorageSync("localStoreId");
  if (store.state.auth.user.store) {
    store.state.store.currentStore = res.data.find(i => i.id == store.state.auth.user.store);
  }
  if (localStoreId) {
    store.state.store.currentLocalStore = res.data.find(i => i.id == localStoreId);
  }
};

export const handleSelectStore = () =>
  new Promise((resolve, reject) => {
    const storeModule = store.state.store;
    uni.showActionSheet({
      itemList: storeModule.stores.map(i => `MINIMARS ${i.name}`),
      success: function (res) {
        const store = storeModule.stores[res.tapIndex];
        storeModule.currentStore = store;
        uni.setStorageSync("localStoreId", store.id);
        resolve();
      },
      fail: function (res) {
        console.log(res.errMsg);
        reject();
      }
    });
  });
