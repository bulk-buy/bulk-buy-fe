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

const returnRandom5Listings = (listings) => {
  let random5Listings = [];
  let random5ListingIds = [];
  if (listings.length <= 5) {
    return listings;
  }

  while (random5Listings.length < 5) {
    let randomIndex = Math.floor(Math.random() * listings.length);
    if (!random5ListingIds.includes(listings[randomIndex]._id)) {
      random5ListingIds.push(listings[randomIndex]._id);
      random5Listings.push(listings[randomIndex]);
    }
  }
  return random5Listings;
};

export const getRecommendedListings = () => {
  return new Promise((resolve, reject) => {
    ListingMS.get("/listings")
      .then((response) => {
        resolve(returnRandom5Listings(response.data));
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
