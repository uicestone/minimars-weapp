import { getBookings } from "../common/vmeitime-http";
import store from "../store";

export const loadBookings = async () => {
  const res = await getBookings({ status: "booked" });
  store.state.booking.bookings = res.data;
};
