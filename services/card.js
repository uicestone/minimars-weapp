import { getCardType } from "../common/vmeitime-http";
import store from "../store";

export const loadCard = async () => {
  const res = await getCardType();
  store.state.booking.cards = res.data;
};
