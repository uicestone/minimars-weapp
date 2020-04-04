import { getBookings } from "../common/vmeitime-http";
import store from "../store";

export const loadBookings = async () => {
  const res = await getBookings({ status: "booked" });
  store.state.booking.bookings = res.data;
};

export const toggleBooking = (item) => {
  if (store.state.booking.isShowBooking) {
    store.state.booking.isShowBooking = false;
    store.state.booking.curBooking = null;
  } else {
    store.state.booking.isShowBooking = true;
    store.state.booking.curBooking = item;
  }
};
