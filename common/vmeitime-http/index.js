import http from "./interface";
import store from "../../store";
import {
  config
} from "../../config";
import {
  _
} from "../../utils/lodash";

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = data => {
  /* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
  //设置请求结束后拦截器

  return http.request({
    baseUrl: "https://ls-coupon.codeispoetry.tech/wp-json/v1",
    url: "ajax/echo/text?name=uni-app",
    dataType: "text",
    data
  });
};

http.interceptor.request = config => {
  console.log("Req ==>:", config.url);
  if (!global.requestStart) global.requestStart = {};
  global.requestStart[config.requestId] = new Date();
  const token = _.get(store, "state.auth.token");
  if (token) {
    config.header = {
      Authorization: `Bearer ${token}`
    };
  }

  return config;
};

http.interceptor.response = response => {
  const duration = new Date() - global.requestStart[response.config.requestId];
  console.log(`Res <== (${duration}ms):`, response.config.url, response);
  //判断返回状态 执行相应操作
  if (!response.statusCode || response.statusCode !== 200) {
    uni.showToast({
      icon: "none",
      title: _.get(response, "data.message") || response.errMsg
    });
  }
  return response;
};

export const wechatLogin = ({
  code
}) => {
  return http.request({
    url: `/wechat/login`,
    method: "POST",
    dataType: "json",
    data: {
      code
    }
  });
};

export const wechatSignup = ({
  session_key,
  encryptedData,
  iv
}) => {
  return http.request({
    url: `/wechat/signup`,
    method: "POST",
    dataType: "json",
    data: {
      session_key,
      encryptedData,
      iv
    }
  });
};

export const wechatDecrypt = ({
  session_key,
  encryptedData,
  iv
}) => {
  return http.request({
    url: `/wechat/decrypt`,
    method: "POST",
    dataType: "json",
    data: {
      session_key,
      encryptedData,
      iv
    }
  });
};

export const updateMobile = ({
  session_key,
  encryptedData,
  iv,
  openid
}) => {
  return http.request({
    url: `/wechat/update-mobile`,
    method: "POST",
    dataType: "json",
    data: {
      session_key,
      encryptedData,
      iv,
      openid
    }
  });
};

export const updateUser = ({
  userId,
  data
}) => {
  return http.request({
    url: `/user/${userId}`,
    method: "PUT",
    dataType: "json",
    data
  });
};

export const getStores = () => {
  return http.request({
    url: `/store`,
    method: "GET",
    data: {
      limit: 10,
      skip: 0,
      order: "name"
    }
  });
};

export const createBooking = ({
  store,
  date,
  adultsCount,
  kidsCount,
  card,
  type = "play",
  paymentGateway,
  event,
  gift,
  quantity,
  useBalance = true
}) => {
  const data = _.omitBy({
    store,
    date,
    adultsCount,
    kidsCount,
    card,
    type,
    event,
    gift,
    quantity
  }, _.isNil);
  return http.request({
    url: `/booking?paymentGateway=${paymentGateway}&useBalance=${useBalance}`,
    method: "POST",
    dataType: "json",
    data
  });
};

export const getBookingPrice = ({
  store,
  date,
  adultsCount,
  kidsCount,
  card,
  type = "play",
  paymentGateway,
  event,
  gift,
  quantity
}) => {
  const data = _.omitBy({
    store,
    date,
    adultsCount,
    kidsCount,
    card,
    type,
    event,
    gift,
    quantity
  }, _.isNil);
  return http.request({
    url: `/booking-price`,
    method: "POST",
    dataType: "json",
    data
  });
};

export const userDeposit = ({
  depositLevel
}) => {
  return http.request({
    url: `/user-deposit`,
    method: "POST",
    dataType: "json",
    data: {
      depositLevel
    }
  });
};

export const getConfigs = () => {
  return http.request({
    url: `/config`,
    method: "GET",
    dataType: "json"
  });
};

export const getAvailabilityBooking = ({
  type,
  month,
  date,
  hours
}) => {
  const data = _.omitBy({
    month,
    date,
    hours
  }, _.isNil);
  return http.request({
    url: `/booking-availability/${type}`,
    method: "GET",
    dataType: "json",
    data
  });
};

export const getListData = ({
  type,
  data
} = {}) => {
  data = _.omitBy(data, _.isNil);
  return http.request({
    url: `/${type}`,
    method: "GET",
    dataType: "json",
    data
  });
};

export const getPayments = () => {
  return http.request({
    url: `/payment`,
    method: "GET",
    dataType: "json"
  });
};

export const getPayment = ({
  id
}) => {
  return http.request({
    url: `/payment/${id}`,
    method: "GET",
    dataType: "json"
  });
};

export const getBooking = ({
  id
}) => {
  return http.request({
    url: `/booking/${id}`,
    method: "GET",
    dataType: "json"
  });
};

export const cancelBooking = ({
  id,
  reason
}) => {
  return http.request({
    url: `/booking/${id}?reason=${reason}`,
    method: "PUT",
    dataType: "json",
    data: {
      status: "canceled"
    }
  });
};

export const getAuthUser = () => {
  return http.request({
    url: `/auth/user`,
    method: "GET",
    dataType: "json"
  });
};

export const postUserMembership = ({
  cardType
}) => {
  return http.request({
    url: `/user-membership`,
    method: "POST",
    dataType: "json",
    data: {
      cardType
    }
  });
};

export const getBookings = ({
  status = null,
  limit = 10,
  skip = 0
} = {}) => {
  const data = _.omitBy({
    status,
    limit,
    skip
  }, _.isNil);
  return http.request({
    url: `/booking`,
    method: "GET",
    dataType: "json",
    data
  });
};

export const getCardType = ({
  include
}) => {
  const data = _.omitBy({
    include
  }, _.isNil);
  return http.request({
    url: `/card-type`,
    method: "GET",
    data,
    dataType: "json"
  });
};

export const getUserCards = ({
  customer
}) => {
  return http.request({
    url: `/card`,
    method: "GET",
    dataType: "json",
    data: {
      customer
    }
  });
};

export const getEvents = ({
  limit = 10,
  skip = 0,
  tag,
  storeId = null
} = {}) => {
  const data = _.omitBy({
    limit,
    skip,
    tag
  }, _.isNil);
  return http.request({
    url: `/event` + (storeId ? `?store=${storeId}` : ""),
    method: "GET",
    dataType: "json",
    data
  });
};

export const getItem = ({
  id,
  type
}) => {
  return http.request({
    url: `/${type}/${id}`,
    method: "GET",
    dataType: "json"
  });
};

export const getGifts = ({
  limit = 10,
  skip = 0
} = {}) => {
  const data = _.omitBy({
    limit,
    skip
  }, _.isNil);
  return http.request({
    url: `/gift`,
    method: "GET",
    dataType: "json",
    data
  });
};

export const postCard = ({
  card,
  method = "POST"
}) => {
  return http.request({
    url: `/card`,
    method,
    dataType: "json",
    data: card
  });
};

export const postCardById = ({
  id,
  card,
  method = "POST"
}) => {
  return http.request({
    url: `/card/${id}`,
    method,
    dataType: "json",
    data: card
  });
};

export const getPost = data => {
  return http.request({
    url: `/post`,
    method: "GET",
    dataType: "json",
    data
  });
};

export const getBrand = () => {
  return http.request({
    url: `/post?tag=brand`,
    method: "GET",
    dataType: "json"
  });
};

export const getCardRule = () => {
  return http.request({
    url: `/post/card-rule`,
    method: "GET",
    dataType: "json"
  });
};