import {
  MyActiveListingsTesting,
  MyCompletedListingsTesting,
  MyUpcomingListingsTesting,
} from "constants/MyListingsTesting";

export const fetchMyActiveListings = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/my-listings/active")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(MyActiveListingsTesting);
  });
};

export const fetchMyUpcomingListings = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/my-listings/upcoming")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(MyUpcomingListingsTesting);
  });
};

export const fetchMyCompletedListings = () => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get("/my-listings/completed")
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    resolve(MyCompletedListingsTesting);
  });
};

export const fetchMyListingDetails = (listingId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get(`/my-listings/${listingId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let listings = [
      ...MyActiveListingsTesting,
      ...MyUpcomingListingsTesting,
      ...MyCompletedListingsTesting,
    ];
    let listing = listings.find((listing) => listing.id == listingId);

    resolve(listing);
  });
};
