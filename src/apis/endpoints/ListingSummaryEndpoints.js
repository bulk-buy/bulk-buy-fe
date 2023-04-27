import { ListingsTesting } from "constants/ListingsTesting";

export const fetchListingSummary = (listingId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/listings/:listingId/summary")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    // //   });
    let listingSummary = ListingsTesting.find(
      (listing) => listing.id.toString() === listingId.toString()
    );

    resolve({
      id: listingId,
      title: listingSummary.title,
      description: listingSummary.description,
      category: { id: listingSummary.category.id },
      startDate: listingSummary.startDate,
      endDate: listingSummary.endDate,
    });
  });
};
