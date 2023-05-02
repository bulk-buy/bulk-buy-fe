import BulkBuyMS from "apis/BulkBuyMS";

export const getTest = () => {
  console.log("getTest() called");
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
