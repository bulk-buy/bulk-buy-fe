import BulkBuyMS from "apis/BulkBuyMS";

export const getTest = () => {
  console.log("getTest() called");
  console.log(BulkBuyMS);
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/")
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
