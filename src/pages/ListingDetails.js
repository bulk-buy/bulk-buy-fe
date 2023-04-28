import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getItem, getItems } from "apis/endpoints/ItemsEndpoints";
import { getListing } from "apis/endpoints/ListingEndpoints";
import { getOrder, getOrders } from "apis/endpoints/OrdersEndpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ListingDetails() {
  const { listingId } = useParams();

  const [listing, setListing] = useState();
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  /* Fetch listing details */
  useEffect(() => {
    /* Fetch listing details */
    getListing(listingId).then((listing) => {
      setListing(listing);
    });
  }, [listingId]);

  /* Fetch item details */
  useEffect(() => {
    listing?.items?.forEach((item) => {
      let items = [];
      getItem(item.id).then((item) => {
        // setItems((items) => {
        //   const index = items.findIndex((i) => i.id == item.id);
        //   items[index] = item;
        //   return [...items];
        // });
        items.push(item);
      });
      setItems(items);
    });
  }, [listing?.items]);

  /* Fetch order details */
  useEffect(() => {
    listing?.orders?.forEach((order) => {
      getOrder(order.id).then((order) => {
        setOrders((orders) => {
          const index = orders.findIndex((o) => o.id == order.id);
          orders[index] = order;
          return [...orders];
        });
      });
    });
  }, [listing?.orders]);

  const renderListing = () => (
    <Grid item xs={12}>
      <Typography variant="h1" gutterBottom component="div">
        {listing?.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {listing?.description}
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
          {items?.map((item) => (
            <Grid item container spacing={2} key={item.id}>
              <Grid item xs={9}>
                <Typography variant="h5" gutterBottom component="div">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  {item.description}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="end">
                <ButtonGroup>
                  <Button variant="outlined">-</Button>
                  <Button variant="outlined">0</Button>
                  <Button variant="outlined">+</Button>
                </ButtonGroup>
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
    </Accordion>
  );

  return (
    <Paper elevation={0}>
      <Box
        component="img"
        sx={{
          height: 200,
        }}
        alt={`${listing?.category.name}`}
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

export default ListingDetails;
