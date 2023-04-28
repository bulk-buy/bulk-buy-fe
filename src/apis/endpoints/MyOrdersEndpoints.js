import {
  MyActiveOrdersTesting,
  MyCompletedOrdersTesting,
} from "constants/MyOrdersTesting";

export const getMyActiveOrders = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/my-orders/active")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let orders = [];
    MyActiveOrdersTesting.forEach((order) => {
      if (order.user.id == 1) {
        orders.push(order);
      }
      resolve(orders);
    });
  });
};

export const getMyCompletedOrders = () => {
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
      if (order.user.id == 1) {
        orders.push(order);
      }
      resolve(orders);
    });
  });
};
