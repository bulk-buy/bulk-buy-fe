import { Grid, Paper, Typography } from "@mui/material";
import {
  getMyActiveOrders,
  getMyCompletedOrders,
  getMyUpcomingOrders,
} from "apis/endpoints/MyOrdersEndpoints";
import ItemCard from "components/ItemCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();

  const [myActiveOrders, setMyActiveOrders] = useState([]);
  const [myCompletedOrders, setMyCompletedOrders] = useState([]);

  useEffect(() => {
    getMyActiveOrders().then((response) => {
      setMyActiveOrders(response);
    });
    getMyCompletedOrders().then((response) => {
      setMyCompletedOrders(response);
    });
  }, []);

  const renderCards = (orders) => {
    return orders.map((order) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
        <ItemCard
          listingId={order.listing.id}
          onClick={() => {
            navigate(`/my-orders/${order.id}`);
          }}
        />
      </Grid>
    ));
  };

  const renderActiveOrders = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Active Orders</Typography>
      </Grid>
      <Grid item xs={12}>
        {myActiveOrders.length ? (
          <Grid container spacing={2}>
            {renderCards(myActiveOrders)}
          </Grid>
        ) : (
          <Typography variant="subtitle1">No active orders</Typography>
        )}
      </Grid>
    </Grid>
  );

  const renderCompletedOrders = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Completed Orders</Typography>
      </Grid>
      <Grid item xs={12}>
        {myCompletedOrders.length ? (
          <Grid container spacing={2}>
            {renderCards(myCompletedOrders)}
          </Grid>
        ) : (
          <Typography variant="subtitle1">No completed orders</Typography>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderActiveOrders()}
        </Grid>
        <Grid item xs={12}>
          {renderCompletedOrders()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MyOrders;
