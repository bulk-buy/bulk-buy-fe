import { ItemsTesting } from "constants/ItemsTesting";
import { ListingsTesting } from "constants/ListingsTesting";

export const getItems = (listingId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get(`/listings/${listingId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(ItemsTesting.filter((item) => item.listing.id == listingId));
  });
};

export const getItem = (itemId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get(`/items/${itemId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(ItemsTesting.find((item) => item.id == itemId));
  });
};

export const deleteItem = (itemId) => {
  console.log("deleteItem" + itemId);
  return new Promise((resolve, reject) => {
    // BulkBuyMS.delete(`/items/${itemId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(ItemsTesting.find((item) => item.id == itemId));
  });
};
