import BulkBuyMS from "apis/BulkBuyMS";
import moment from "moment";

export const getMyActiveOrders = () => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/orders")
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

export const getMyCompletedOrders = () => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/orders")
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
