import OrderMS from "apis/OrderMS";
import moment from "moment";

export const getMyActiveOrders = (userIdObj) => {
  let encodedUserId = encodeURIComponent(JSON.stringify({ userId: userIdObj }));
  console.log(encodedUserId);
  return new Promise((resolve, reject) => {
    OrderMS.get(`/orders/${encodedUserId}`)
      .then((response) => {
        let orders = response.data;
        orders.forEach((order, index) => {
          if (order.userId != 1) {
            orders.splice(index, 1);
          }
        });
        orders.forEach((order, index) => {
          if (
            moment(order.startDate).isAfter(moment(new Date())) ||
            moment(order.endDate).isBefore(moment(new Date()))
          ) {
            orders.splice(index, 1);
          }
        });
        resolve(orders);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getMyCompletedOrders = (userId) => {
  let encodedUserId = encodeURIComponent(JSON.stringify({ userId: userId }));

  return new Promise((resolve, reject) => {
    OrderMS.get(`/orders/${encodedUserId}}`)
      .then((response) => {
        let orders = response.data;
        orders.forEach((order, index) => {
          if (order.userId != 1) {
            orders.splice(index, 1);
          }
        });
        orders.forEach((order, index) => {
          if (!moment(order.endDate).isBefore(moment(new Date()))) {
            orders.splice(index, 1);
          }
        });
        resolve(orders);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
