import { ListingsTesting } from "constants/ListingsTesting";

export const getListingSummary = (listingId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/listings/:listingId/summary")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    // //   });
    resolve(ListingsTesting.find((listing) => listing._id == listingId));
  });
};
