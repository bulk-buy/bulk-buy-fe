import BulkBuyMS from "apis/BulkBuyMS";
import { ListingsTesting } from "constants/ListingsTesting";
import { OrdersTesting } from "constants/OrdersTesting";

export const getOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/orders/:orderId")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    // resolve(OrdersTesting.find((order) => order.id == orderId));
  });
};

export const getOrders = (listingId) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get(`/orders`)
      .then((response) => {
        let orders = response.data;
        resolve(orders.filter((order) => order.listingId == listingId));
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    resolve(ListingsTesting.find((listing) => listing.id == listingId).orders);
  });
};
