import { Grid, Paper, Typography } from "@mui/material";
import {
  getMyCompletedOrders,
  getMyUpcomingOrders,
} from "apis/endpoints/MyOrdersEndpoints";
import ItemCard from "components/ItemCard";
import { useEffect, useState } from "react";

function MyOrders() {
  const [myUpcomingOrders, setMyUpcomingOrders] = useState([]);
  const [myCompletedOrders, setMyCompletedOrders] = useState([]);

  useEffect(() => {}, [myUpcomingOrders, myCompletedOrders]);

  useEffect(() => {
    getMyUpcomingOrders().then((response) => {
      setMyUpcomingOrders(response);
    });
    getMyCompletedOrders().then((response) => {
      setMyCompletedOrders(response);
    });
  }, []);

  const renderCards = (orders) => {
    return orders.map((order) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
        <ItemCard listingId={order.id} />
      </Grid>
    ));
  };

  const renderUpcomingOrders = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Upcoming Orders</Typography>
      </Grid>
      <Grid item xs={12}>
        {myUpcomingOrders.length ? (
          <Grid container spacing={2}>
            {renderCards(myUpcomingOrders)}
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
          {renderUpcomingOrders()}
        </Grid>
        <Grid item xs={12}>
          {renderCompletedOrders()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MyOrders;
