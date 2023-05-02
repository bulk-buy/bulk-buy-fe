import BulkBuyMS from "apis/BulkBuyMS";

export const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get(`/users/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
