import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getItem } from "apis/endpoints/ItemsEndpoints";
import { getMyListing } from "apis/endpoints/MyListingEndpoints";
import { getOrder } from "apis/endpoints/OrdersEndpoints";
import { getUser } from "apis/endpoints/UserEndpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function NameContainer({ userId }) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser(userId).then((user) => {
      setUser(user);
    });
  }, [userId]);

  return (
    <Typography variant="h5" gutterBottom component="div">
      {user?.firstName} {user?.lastName}
    </Typography>
  );
}

function MyListingDetails({ editable }) {
  const { listingId } = useParams();

  const [myListing, setMyListing] = useState();
  const [myListingItems, setMyListingItems] = useState([]);
  const [myListingOrders, setMyListingOrders] = useState([]);

  /* Fetch my listing details */
  useEffect(() => {
    getMyListing(listingId).then((listing) => {
      setMyListing(listing);
    });
  }, [listingId]);

  /* Fetch my listing items */
  useEffect(() => {
    myListing?.items?.forEach((item) => {
      getItem(item.id).then((item) => {
        setMyListingItems((items) => [...items, item]);
      });
    });
  }, [myListing?.items]);

  /* Fetch my listing orders */
  useEffect(() => {
    myListing?.orders?.forEach((order) => {
      getOrder(order.id).then((order) => {
        setMyListingOrders((orders) => [...orders, order]);
      });
    });
  }, [myListing?.orders]);

  const renderListing = () => (
    <Grid item xs={12}>
      <Typography variant="h1" gutterBottom component="div">
        {myListing?.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {myListing?.description}
      </Typography>
    </Grid>
  );

  const renderItems = () => (
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h3" gutterBottom component="div">
          Items
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {myListingItems?.map((item) => (
            <Grid item container spacing={2} key={item.id}>
              <Grid item xs={9}>
                <Typography variant="h5" gutterBottom component="div">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  const renderOrders = () => (
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h3" gutterBottom component="div">
          Orders Summary
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {myListingOrders?.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Typography variant="h5" gutterBottom component="div">
                <NameContainer userId={order.user.id} />
              </Typography>
              {order.items.map((item) => (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  key={item.id}
                >
                  {myListingItems?.find((i) => i.id == item.id)?.title} x{" "}
                  {item.quantity}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Paper elevation={0}>
      <Box
        component="img"
        sx={{
          height: 200,
        }}
        alt={`${myListing?.category.name}`}
        src="/images/trolley512.png"
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderListing()}
        </Grid>
        <Grid item xs={12}>
          {renderItems()}
        </Grid>
        <Grid item xs={12}>
          {renderOrders()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MyListingDetails;
