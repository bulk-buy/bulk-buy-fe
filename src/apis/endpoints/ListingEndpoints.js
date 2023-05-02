import BulkBuyMS from "apis/BulkBuyMS";
import { ListingsTesting } from "constants/ListingsTesting";
import moment from "moment";

export const getListings = () => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/listings")
      .then((response) => {
        let listings = response.data;
        resolve(
          listings.filter((listing) =>
            moment(listing.endDate).isSameOrAfter(moment())
          )
        );
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getListing = (listingId) => {
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

export const patchListing = (listingId, listing) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.patch(`/listings/${listingId}`, listing)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const postListing = (listing) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.post("/listings", listing)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
