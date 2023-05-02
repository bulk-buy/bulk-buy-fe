import BulkBuyMS from "apis/BulkBuyMS";
import { ListingsTesting } from "constants/ListingsTesting";
import moment from "moment";

export const getListings = () => {
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
        moment(listing.startDate).isSameOrBefore(moment(new Date())) &&
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

export const getListing = (listingId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get(`/listings/${listingId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(ListingsTesting.find((listing) => listing.id == listingId));
  });
};

export const getRecommendedListings = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/listings/recommended")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let listings = [];
    listings.push(ListingsTesting[3]);
    resolve(listings);
  });
};
