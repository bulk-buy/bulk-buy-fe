import { ListingsTesting } from "constants/ListingsTesting";
import { OrdersTesting } from "constants/OrdersTesting";

export const fetchOrderDetails = (orderId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/orders/:orderId/details")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let orderDetails = OrdersTesting.find((order) => order.id == orderId);
    resolve({
      id: orderId,
      items: orderDetails.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    });
  });
};