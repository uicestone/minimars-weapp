import { getBookings } from "../common/vmeitime-http";
import store from "../store";

export const loadBookings = async () => {
  const res = await getBookings({});
  store.state.booking.bookings = res.data;
};

export const toggleBooking = (item) => {
  if (store.state.booking.showBooking) {
    store.state.booking.showBooking = false;
    store.state.booking.curBooking = null;
  } else {
    store.state.booking.showBooking = true;
    store.state.booking.curBooking = item;
  }
};
