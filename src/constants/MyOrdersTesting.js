import moment from "moment";
import { ListingsTesting } from "./ListingsTesting";
import { OrdersTesting } from "./OrdersTesting";

export const MyActiveOrdersTesting = OrdersTesting.filter((order) => {
  let listing = ListingsTesting.find((listing) => {
    return listing.id == order.listing.id;
  });
  return (
    moment(listing.startDate).isSameOrBefore(moment(new Date())) &&
    moment(listing.endDate).isAfter(moment(new Date()))
  );
});

export const MyCompletedOrdersTesting = OrdersTesting.filter((order) => {
  let listing = ListingsTesting.find((listing) => {
    return listing.id == order.listing.id;
  });
  return moment(listing.endDate).isBefore(moment(new Date()));
});
