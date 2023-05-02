import BulkBuyMS from "apis/BulkBuyMS";
import { CategoriesTesting } from "constants/CategoriesTesting";

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/categories")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getCategory = (categoryId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get(`/categories/${categoryId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(CategoriesTesting[categoryId]);
  });
};
