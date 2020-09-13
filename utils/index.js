export * from "./errorhandler";
import {
  _
} from "./lodash";

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
  html: {
    convertHtmlToText: function convertHtmlToText(inputText) {
      var returnText = "" + inputText;
      returnText = returnText.replace(/<\/div>/ig, '\r\n');
      returnText = returnText.replace(/<\/li>/ig, '\r\n');
      returnText = returnText.replace(/<li>/ig, '  *  ');
      returnText = returnText.replace(/<\/ul>/ig, '\r\n');
      //-- remove BR tags and replace them with line break
      returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

      //-- remove P and A tags but preserve what's inside of them
      returnText = returnText.replace(/<p.*?>/gi, "\r\n");
      returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

      //-- remove all inside SCRIPT and STYLE tags
      returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
      returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
      //-- remove all else
      returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

      //-- get rid of more than 2 multiple line breaks:
      returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

      //-- get rid of more than 2 spaces:
      returnText = returnText.replace(/ +(?= )/g, '');

      //-- get rid of html-encoded characters:
      returnText = returnText.replace(/&nbsp;/gi, " ");
      returnText = returnText.replace(/&amp;/gi, "&");
      returnText = returnText.replace(/&quot;/gi, '"');
      returnText = returnText.replace(/&lt;/gi, '<');
      returnText = returnText.replace(/&gt;/gi, '>');

      return returnText;
    }
  }
};