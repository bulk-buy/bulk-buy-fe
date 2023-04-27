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

export const fetchListing = (listingId) => {
  return new Promise((resolve, reject) => {
    // BulkBuyMS.get(`/listings/${listingId}`)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     reject(error);
    //   });
    let listing = ListingsTesting.find(
      (listing) => listing.id.toString() === listingId.toString()
    );
    resolve({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      category: {
        id: listing.category.id,
      },
      startDate: listing.startDate,
      endDate: listing.endDate,
      items: listing.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
      })),
    });
  });
};
