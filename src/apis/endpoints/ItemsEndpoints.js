import BulkBuyMS from "apis/BulkBuyMS";

export const getItems = (listingId) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get(`/listings/${listingId}`)
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
    BulkBuyMS.get(`/items/${itemId}`)
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
    BulkBuyMS.patch(`/items/${itemId}`, item)
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
    BulkBuyMS.post("/items", item)
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
    BulkBuyMS.delete(`/items/${itemId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
