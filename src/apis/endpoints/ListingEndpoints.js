import ListingMS from "apis/ListingMS";
import moment from "moment";

export const getListings = () => {
  return new Promise((resolve, reject) => {
    ListingMS.get("/listings")
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

export const getRecommendedListings = () => {
  return new Promise((resolve, reject) => {
    ListingMS.get("/listings")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const patchListing = (listingId, listing) => {
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

export const postListing = (listing) => {
  return new Promise((resolve, reject) => {
    ListingMS.post("/listings", listing)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
