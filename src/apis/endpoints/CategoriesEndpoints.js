import { CategoriesTesting } from "constants/CategoriesTesting";

export const fetchCategories = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/categories")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(CategoriesTesting);
  });
};