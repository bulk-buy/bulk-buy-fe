import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [openConfirmOrder, setOpenConfirmOrder] = useState(false);

  const [v, setV] = useState(0);

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
    if (orders.find((order) => order.itemId == itemId) == undefined) {
      setOrders((orders) => [...orders, { itemId: itemId, quantity: 1 }]);
    } else {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order.itemId == itemId) {
            newOrders[index].quantity++;
          }
        });
        return newOrders;
      });
    }
  };

  const handleClickMinusItem = (itemId) => {
    if (orders.find((order) => order.itemId == itemId) == undefined) {
      return;
    } else if (orders.find((order) => order.itemId == itemId).quantity == 1) {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order.itemId == itemId) {
            newOrders.splice(index, 1);
          }
        });
        return newOrders;
      });
    } else {
      setOrders((orders) => {
        let newOrders = [...orders];
        newOrders.forEach((order, index) => {
          if (order.itemId == itemId) {
            newOrders[index].quantity--;
          }
        });
        return newOrders;
      });
    }
  };

  const getOrderCount = (item) => {
    let order = orders.find((order) => order.itemId == item._id);
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
              <Grid container item xs={3} textAlign="end" spacing={2}>
                <Grid item xs={4} textAlign="end">
                  <Typography variant="body" gutterBottom component="div">
                    {`SGD ${item.price}`}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
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
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  const handleSubmitOrders = () => {
    setOpenConfirmOrder(false);
    let orderObj = {
      listingId: listingId,
      userId: userInfo._id,
      item: [],
    };
    orders.forEach((order) => {
      order = { ...order, listingId: listingId, userId: userInfo._id, __v: v };
      orderObj.item.push({
        itemId: order.itemId,
        quantity: order.quantity,
      });
    });
    postOrder(orderObj).then((order) => {
      order.__v && setV(order.__v);
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
              Items
            </Typography>
          </Grid>
          <Grid item xs={3} textAlign="end">
            <Typography variant="h5" gutterBottom component="div">
              Price (SGD)
            </Typography>
          </Grid>
          {orders?.map((order) => (
            <Grid item container spacing={2} key={order.itemId}>
              <Grid item xs={9}>
                <Typography variant="body1" gutterBottom component="div">
                  {`${
                    items?.find((item) => item._id == order.itemId)?.title
                  } x ${order.quantity}`}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="end">
                <Typography variant="body1" gutterBottom component="div">
                  {items?.find((item) => item._id == order.itemId)?.price *
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
                  items?.find((item) => item._id == order.itemId)?.price *
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
          onClick={() => setOpenConfirmOrder(true)}
        >
          Confirm Orders
        </Button>
      </AccordionActions>
    </Accordion>
  );

  return (
    <Paper elevation={0}>
      <Dialog
        open={openConfirmOrder}
        onClose={() => setOpenConfirmOrder(false)}
        fullWidth
      >
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to confirm this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenConfirmOrder(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmitOrders()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
