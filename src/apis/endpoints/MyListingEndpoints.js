import ListingMS from "apis/ListingMS";
import moment from "moment";

export const getMyActiveListings = (userId) => {
  let encodedUserId = encodeURIComponent(
    JSON.stringify({ postedBy: userId, deletedAt: "" })
  );

  return new Promise((resolve, reject) => {
    ListingMS.get(`/listings/${encodedUserId}}`)
      .then((response) => {
        let listings = response.data;
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

export const getMyUpcomingListings = (userId) => {
  let encodedUserId = encodeURIComponent(
    JSON.stringify({ postedBy: userId, deletedAt: "" })
  );

  return new Promise((resolve, reject) => {
    ListingMS.get(`/listings/${encodedUserId}`)
      .then((response) => {
        let listings = response.data;
        console.log(listings);
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

export const getMyCompletedListings = (userId) => {
  let encodedUserId = encodeURIComponent(
    JSON.stringify({ postedBy: userId, deletedAt: "" })
  );

  return new Promise((resolve, reject) => {
    ListingMS.get(`/listings/${encodedUserId}`)
      .then((response) => {
        let listings = response.data;
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
    ListingMS.get(`/listings/${listingId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const patchMyListing = (listingId, listing) => {
  return new Promise((resolve, reject) => {
    ListingMS.patch(`/listings/${listingId}`, listing)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const deleteMyListing = (listingId, v) => {
  return new Promise((resolve, reject) => {
    ListingMS.delete(`/listings/${listingId}`, { data: { __v: v } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
