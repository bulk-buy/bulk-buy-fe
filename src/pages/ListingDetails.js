import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getItem } from "apis/endpoints/ItemsEndpoints";
import { getListing } from "apis/endpoints/ListingEndpoints";
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
      getItem(item.id).then((item) => {
        setItems((items) => [...items, item]);
        // setOrders((order) => [...order, { id: item.id, quantity: 0 }]);
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

  const handleClickAddItem = (itemId) => {
    if (orders.find((order) => order.id == itemId) == undefined) {
      setOrders((orders) => [...orders, { id: itemId, quantity: 1 }]);
    } else {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order.id == itemId) {
            newOrders[index].quantity++;
          }
        });
        return newOrders;
      });
    }
  };

  const handleClickMinusItem = (itemId) => {
    if (orders.find((order) => order.id == itemId) == undefined) {
      return;
    } else if (orders.find((order) => order.id == itemId).quantity == 1) {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order.id == itemId) {
            newOrders.splice(index, 1);
          }
        });
        return newOrders;
      });
    } else {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order.id == itemId) {
            newOrders[index].quantity--;
          }
        });
        return newOrders;
      });
    }
  };

  const getOrderCount = (item) => {
    let order = orders.find((order) => order.id == item.id);
    return order?.quantity || 0;
  };

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
                  <Button
                    variant="outlined"
                    onClick={() => handleClickMinusItem(item.id)}
                  >
                    -
                  </Button>
                  <Button variant="outlined">{getOrderCount(item)}</Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickAddItem(item.id)}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  const handleSubmitOrders = () => {
    console.log(orders);
  };

  const renderOrders = () => (
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h3" gutterBottom component="div">
          Orders Summary
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
          {orders?.map((order) => (
            <Grid item container spacing={2} key={order.id}>
              <Grid item xs={9}>
                <Typography variant="body1" gutterBottom component="div">
                  {`${items?.find((item) => item.id == order.id)?.title} x ${
                    order.quantity
                  }`}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="end">
                <Typography variant="body1" gutterBottom component="div">
                  {items?.find((item) => item.id == order.id)?.price *
                    order.quantity}
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
              {orders?.reduce((total, order) => {
                return (
                  total +
                  items?.find((item) => item.id == order.id)?.price *
                    order.quantity
                );
              }, 0)}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          disabled={!orders.length}
          onClick={() => handleSubmitOrders()}
        >
          Confirm Orders
        </Button>
      </AccordionActions>
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
