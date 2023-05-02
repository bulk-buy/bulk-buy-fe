import BulkBuyMS from "apis/BulkBuyMS";
import {
  MyActiveListingsTesting,
  MyCompletedListingsTesting,
  MyUpcomingListingsTesting,
} from "constants/MyListingsTesting";
import moment from "moment";

export const getMyActiveListings = () => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/listings")
      .then((response) => {
        let listings = response.data;
        listings.forEach((listing, index) => {
          if (listing.postedBy != 1) {
            listings.splice(index, 1);
          }
        });
        listings.forEach((listing, index) => {
          if (
            moment(listing.startDate).isAfter(moment(new Date())) ||
            moment(listing.endDate).isBefore(moment(new Date()))
          ) {
            listings.splice(index, 1);
          }
        });

        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getMyUpcomingListings = () => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/listings")
      .then((response) => {
        let listings = response.data;
        listings.forEach((listing, index) => {
          if (listing.postedBy != 1) {
            listings.splice(index, 1);
          }
        });
        listings.forEach((listing, index) => {
          if (!moment(listing.startDate).isAfter(moment(new Date()))) {
            listings.splice(index, 1);
          }
        });

        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getMyCompletedListings = () => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get("/listings")
      .then((response) => {
        let listings = response.data;
        listings.forEach((listing, index) => {
          if (listing.postedBy != 1) {
            listings.splice(index, 1);
          }
        });
        listings.forEach((listing, index) => {
          if (!moment(listing.endDate).isBefore(moment(new Date()))) {
            listings.splice(index, 1);
          }
        });

        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getMyListing = (listingId) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.get(`/listings/${listingId}`)
      .then((response) => {
        let listing = response.data;
        if (listing.postedBy != 1) {
          listing = null;
        }
        resolve(listing);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const patchMyListing = (listingId, listing) => {
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

export const deleteMyListing = (listingId) => {
  return new Promise((resolve, reject) => {
    BulkBuyMS.delete(`/listings/${listingId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    // resolve(MyActiveListingsTesting.find((listing) => listing.id == listingId));
  });
};
