import BulkBuyMS from "apis/BulkBuyMS";
import ItemMS from "apis/ItemMS";

export const getItems = (listingId) => {
  return new Promise((resolve, reject) => {
    ItemMS.get(`/listings/${listingId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getItem = (itemId) => {
  return new Promise((resolve, reject) => {
    ItemMS.get(`/items/${itemId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getItemsByListingId = (listingId) => {
  let encodedListingId = encodeURIComponent(
    JSON.stringify({ listingId: listingId })
  );
  return new Promise((resolve, reject) => {
    ItemMS.get(`/items/${encodedListingId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const patchItem = (itemId, item) => {
  return new Promise((resolve, reject) => {
    ItemMS.patch(`/items/${itemId}`, item)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const postItem = (item) => {
  return new Promise((resolve, reject) => {
    ItemMS.post("/items", item)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const deleteItem = (itemId) => {
  return new Promise((resolve, reject) => {
    ItemMS.delete(`/items/${itemId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
