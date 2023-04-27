import moment from "moment";
import { ListingsTesting } from "./ListingsTesting";

export const MyUpcomingOrdersTesting = ListingsTesting.filter((listing) => {
  return moment(listing.startDate).isAfter(moment(new Date()));
});

export const MyCompletedOrdersTesting = ListingsTesting.filter((listing) => {
  return moment(listing.endDate).isBefore(moment(new Date()));
});
