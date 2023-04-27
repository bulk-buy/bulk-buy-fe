import moment from "moment";
import { ListingsTesting } from "./ListingsTesting";

export const MyActiveListingsTesting = ListingsTesting.filter((listing) => {
  return (
    moment(listing.startDate).isBefore(moment(new Date())) &&
    moment(listing.endDate).isAfter(moment(new Date()))
  );
});

export const MyCompletedListingsTesting = ListingsTesting.filter((listing) => {
  return moment(listing.endDate).isBefore(moment(new Date()));
});

export const MyUpcomingListingsTesting = ListingsTesting.filter((listing) => {
  return moment(listing.startDate).isAfter(moment(new Date()));
});
