import moment from "moment";

const {
  MyUpcomingOrdersTesting,
  MyCompletedOrdersTesting,
} = require("constants/MyOrdersTesting");

export const fetchMyUpcomingOrders = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/my-orders/upcoming")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let orders = [];
    MyUpcomingOrdersTesting.forEach((order) => {
      if (moment(order.startDate).isAfter(moment(new Date()))) {
        orders.push({
          id: order.id,
        });
      }
      resolve(orders);
    });
  });
};

export const fetchMyCompletedOrders = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/my-orders/completed")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let orders = [];
    MyCompletedOrdersTesting.forEach((order) => {
      if (moment(order.endDate).isBefore(moment(new Date()))) {
        orders.push({
          id: order.id,
        });
      }
      resolve(orders);
    });
  });
};
