import OrderMS from "apis/OrderMS";
import { ListingsTesting } from "constants/ListingsTesting";

export const getOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    OrderMS.get(`/orders/${orderId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getOrders = (listingId) => {
  return new Promise((resolve, reject) => {
    OrderMS.get(`/orders`)
      .then((response) => {
        let orders = response.data;
        resolve(orders.filter((order) => order.listingId == listingId));
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    resolve(ListingsTesting.find((listing) => listing._id == listingId).orders);
  });
};

export const getOrdersByListingId = (listingId) => {
  let encodedListingId = encodeURIComponent(
    JSON.stringify({ listingId: listingId, deletedAt: "" })
  );

  return new Promise((resolve, reject) => {
    OrderMS.get(`/orders/${encodedListingId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const postOrder = (order) => {
  return new Promise((resolve, reject) => {
    OrderMS.post("/orders", order)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
