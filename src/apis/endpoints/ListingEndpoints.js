import BulkBuyMS from "apis/BulkBuyMS";
import { ListingsTesting } from "constants/ListingsTesting";
import moment from "moment";

export const fetchListings = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/listings")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let listings = [];
    ListingsTesting.forEach((listing) => {
      if (
        moment(listing.startDate).isBefore(moment(new Date())) &&
        moment(listing.endDate).isAfter(moment(new Date()))
      ) {
        listings.push({
          id: listing.id,
        });
      }
    });
    resolve(listings);
  });
};
