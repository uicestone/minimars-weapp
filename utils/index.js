export * from "./errorhandler";
import { _ } from "./lodash";

export const utils = {
  booking: {
    getTitle(booking) {
      let title;

      if (booking.type === "gift") {
        title = `${booking.gift.title} ${booking.quantity}份 ${booking.store?.name || ""} `;
      } else if (booking.type === "event") {
        title = `${booking.event.title} ${booking.kidsCount}人 ${booking.store.name} `;
      } else if (booking.type === "food") {
        title = `餐饮消费`;
      } else {
        title = `${booking.store.name} ${booking.adultsCount}大${booking.kidsCount}小 ${booking.date.substr(5)} ${booking.checkInAt.substr(0, 5)}前入场`;
      }

      return title;
    },
    getImage(item) {
      if (item.type == "event") {
        return _.get(item, "event.posterUrl");
      } else if (item.type == "gift") {
        return _.get(item, "gift.posterUrl");
      }
      return "/static/img/booking.png";
    },
  },
};
