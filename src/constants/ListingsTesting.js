import moment from "moment";

export const ListingsTesting = [
  {
    id: 1,
    title: "Listing 1",
    description: "Listing 1 Description",
    category: { id: 1 },
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
    minRequired: 10,
    postedBy: { id: 1 },
    items: [{ id: 1 }, { id: 2 }],
    orders: [{ id: 1 }, { id: 2 }],
  },
  {
    id: 4,
    title: "Listing 4",
    description: "Listing 4 Description",
    category: { id: 2 },
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
    minRequired: 40,
    postedBy: { id: 1 },
    items: [{ id: 3 }, { id: 4 }],
    orders: [{ id: 3 }, { id: 4 }],
  },
  {
    id: 2,
    title: "Listing 2",
    description: "Listing 2 Description",
    category: { id: 1 },
    startDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(2, "d").format("YYYY-MM-DD"),
    minRequired: 20,
    postedBy: { id: 1 },
    items: [{ id: 5 }, { id: 6 }],
    orders: [],
  },
  {
    id: 3,
    title: "Listing 3",
    description: "Listing 3 Description",
    category: { id: 1 },
    startDate: moment(new Date()).subtract(2, "d").format("YYYY-MM-DD"),
    endDate: moment(new Date()).subtract(1, "d").format("YYYY-MM-DD"),
    minRequired: 30,
    postedBy: { id: 1 },
    items: [{ id: 7 }, { id: 8 }],
    orders: [{ id: 5 }],
  },
];
