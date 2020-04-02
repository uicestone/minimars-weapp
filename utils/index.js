export * from "./errorhandler";
import { _ } from "./lodash";

export const utils = {
  booking: {
    getTitle(item) {
      if (item.type == "event") {
        return _.get(item, "event.title");
      } else if (item.type == "gift") {
        return _.get(item, "gift.title");
      }
      return "预约";
    },
    getImage(item) {
      if (item.type == "event") {
        return _.get(item, "event.posterUrl");
      } else if (item.type == "gift") {
        return _.get(item, "gift.posterUrl");
      }
      return "/static/img/booking.png";
    }
  }
};
