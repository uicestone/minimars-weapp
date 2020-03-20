import * as api from "../common/vmeitime-http";
import store from "../store";

export const loadStore = async () => {
  const res = await api.getStores();
  store.state.store.stores = res.data;
  if (store.state.store.currentStore.id) {
    store.state.store.currentStore = res.data.find(i => i.id == store.state.store.currentStore.id);
  } else {
    store.state.store.currentStore = res.data[0];
  }
};
