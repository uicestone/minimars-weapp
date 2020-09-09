import {
  getCardType,
  getUserCards
} from "../common/vmeitime-http";
import store from "../store";

export const loadCard = async ({
  id
}) => {
  const res = await getCardType({
    include: id ? id : null
  });
  store.state.booking.cardTypes = res.data;
};

export const loadUserCard = async () => {
  const userId = store.state.auth.user.id;
  if (userId) {
    const res = await getUserCards({
      customer: userId
    });
    if (res.data) {
      store.state.auth.userCards = res.data;
    }
  }
};