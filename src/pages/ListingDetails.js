import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getItemsByListingId } from "apis/endpoints/ItemsEndpoints";
import { getListing } from "apis/endpoints/ListingEndpoints";
import {
  getOrdersByListingId,
  postOrder,
} from "apis/endpoints/OrdersEndpoints";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";

function ListingDetails() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.user);

  const [listing, setListing] = useState();
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const [v, setV] = useState(0);

  console.log(items);
  useEffect(() => {
    /* Fetch listing details */
    getListing(listingId).then((listing) => {
      listing.__v && setV(listing.__v);
      setListing(listing);
    });

    /* Fetch items */
    getItemsByListingId(listingId).then((items) => {
      items.__v && setV(items.__v);
      setItems(items);
    });

    /* Fetch orders */
    getOrdersByListingId(listingId).then((orders) => {
      orders.__v && setV(orders.__v);
      setOrders(orders);
    });
  }, [listingId]);

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
    if (orders.find((order) => order._id == itemId) == undefined) {
      setOrders((orders) => [...orders, { _id: itemId, quantity: 1 }]);
    } else {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order._id == itemId) {
            newOrders[index].quantity++;
          }
        });
        return newOrders;
      });
    }
  };

  const handleClickMinusItem = (itemId) => {
    if (orders.find((order) => order._id == itemId) == undefined) {
      return;
    } else if (orders.find((order) => order._id == itemId).quantity == 1) {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order._id == itemId) {
            newOrders.splice(index, 1);
          }
        });
        return newOrders;
      });
    } else {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order._id == itemId) {
            newOrders[index].quantity--;
          }
        });
        return newOrders;
      });
    }
  };

  const getOrderCount = (item) => {
    let order = orders.find((order) => order._id == item._id);
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
            <Grid item container spacing={2} key={item._id}>
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
                    onClick={() => handleClickMinusItem(item._id)}
                  >
                    -
                  </Button>
                  <Button variant="outlined">{getOrderCount(item)}</Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickAddItem(item._id)}
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
    orders.forEach((order) => {
      order = { ...order, listingId: listingId, userId: userInfo._id, __v: v };
      postOrder(order).then((order) => {
        order.__v && setV(order.__v);
      });
    });
    navigate("/my-orders");
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
            <Grid item container spacing={2} key={order._id}>
              <Grid item xs={9}>
                <Typography variant="body1" gutterBottom component="div">
                  {`${items?.find((item) => item._id == order._id)?.title} x ${
                    order.quantity
                  }`}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="end">
                <Typography variant="body1" gutterBottom component="div">
                  {items?.find((item) => item._id == order._id)?.price *
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
                  items?.find((item) => item._id == order._id)?.price *
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
