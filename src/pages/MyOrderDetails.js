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
import { getItem, getItems } from "apis/endpoints/ItemsEndpoints";
import { getListing } from "apis/endpoints/ListingEndpoints";
import { getOrder } from "apis/endpoints/OrdersEndpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MyOrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState();
  const [listing, setListing] = useState();
  const [items, setItems] = useState([]);

  /* Fetch order details */
  useEffect(() => {
    getOrder(orderId).then((order) => {
      setOrder(order);
    });
  }, [orderId]);

  /* Fetch listing details */
  useEffect(() => {
    getListing(order?.listing.id).then((listing) => {
      setListing(listing);
    });
  }, [order?.listing.id]);

  /* Fetch listing items */
  useEffect(() => {
    listing?.items?.forEach((item) => {
      getItem(item.id).then((item) => {
        setItems((items) => [...items, item]);
      });
    });
  }, [listing?.items]);

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
          Orders
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography variant="h5" gutterBottom component="div">
              items
            </Typography>
          </Grid>
          <Grid item xs={3} textAlign="end">
            <Typography variant="h5" gutterBottom component="div">
              Price (SGD)
            </Typography>
          </Grid>
          {order?.items?.map((item) => (
            <Grid item container spacing={2} key={item.id}>
              <Grid item xs={9}>
                <Typography variant="body1" gutterBottom component="div">
                  {`${items.find((i) => i.id === item.id)?.title} x ${
                    item.quantity
                  }`}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="end">
                <Typography variant="body1" gutterBottom component="div">
                  {items.find((i) => i.id === item.id)?.price * item.quantity}
                </Typography>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={9}>
            <Typography variant="h5" gutterBottom component="div">
              Total
            </Typography>
          </Grid>
          <Grid item xs={3} textAlign="end">
            <Typography variant="h5" gutterBottom component="div">
              {order?.items?.reduce((total, item) => {
                return (
                  total +
                  items?.find((i) => i.id == item.id)?.price * item.quantity
                );
              }, 0)}
            </Typography>
          </Grid>
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
        alt={`${listing?.category?.name}`}
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

export default MyOrderDetails;
