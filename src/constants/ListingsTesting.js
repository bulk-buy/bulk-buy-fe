import moment from "moment";

export const ListingsTesting = [
  {
    id: 1,
    title: "Listing 1",
    description: "Listing 1 Description",
    category: {
      id: 1,
      name: "Category 1",
      description: "Category 1 Description",
    },
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
    minRequired: 10,
    postedBy: {
      id: 1,
      firstName: "User",
      lastName: "1",
      postalCode: "123456",
    },
    items: [
      {
        id: 1,
        title: "Listing 1 Item 1",
        description: "Listing 1 Item 1 Description",
        price: 100,
      },
      {
        id: 2,
        title: "Listing 2 Item 2",
        description: "Listing 2 Item 2 Description",
        price: 200,
      },
    ],
    orders: [{ id: 1 }, { id: 2 }],
  },
  {
    id: 4,
    title: "Listing 4",
    description: "Listing 4 Description",
    category: {
      id: 2,
      name: "Category 2",
      description: "Category 2 Description",
    },
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
    minRequired: 40,
    postedBy: {
      id: 1,
      firstName: "User",
      lastName: "1",
      postalCode: "123456",
    },
    items: [
      {
        id: 1,
        title: "Listing 4 Item 1",
        description: "Listing 1 Item 1 Description",
        price: 100,
      },
      {
        id: 2,
        title: "Listing 2 Item 2",
        description: "Listing 2 Item 2 Description",
        price: 200,
      },
    ],
    orders: [{ id: 3 }, { id: 4 }],
  },
  {
    id: 2,
    title: "Listing 2",
    description: "Listing 2 Description",
    category: {
      id: 1,
      name: "Category 1",
      description: "Category 1 Description",
    },
    startDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
    endDate: moment(new Date()).add(2, "d").format("YYYY-MM-DD"),
    minRequired: 20,
    postedBy: {
      id: 1,
      firstName: "User",
      lastName: "1",
      postalCode: "123456",
    },
    items: [
      {
        id: 1,
        title: "Listing 2 Item 1",
        description: "Listing 2 Item 1 Description",
        price: 100,
      },
      {
        id: 2,
        title: "Listing 2 Item 2",
        description: "Listing 2 Item 2 Description",
        price: 200,
      },
    ],
    orders: [],
  },
  {
    id: 3,
    title: "Listing 3",
    description: "Listing 3 Description",
    category: {
      id: 1,
      name: "Category 1",
      description: "Category 1 Description",
    },
    startDate: moment(new Date()).subtract(2, "d").format("YYYY-MM-DD"),
    endDate: moment(new Date()).subtract(1, "d").format("YYYY-MM-DD"),
    minRequired: 30,
    postedBy: {
      id: 1,
      firstName: "User",
      lastName: "1",
      postalCode: "123456",
    },
    items: [
      {
        id: 1,
        title: "Listing 3 Item 1",
        description: "Listing 3 Item 1 Description",
        price: 100,
      },
      {
        id: 2,
        title: "Listing 3 Item 2",
        description: "Listing 3 Item 2 Description",
        price: 200,
      },
    ],
    orders: [{ id: 5 }],
  },
];
