import { Grid, Paper, Typography } from "@mui/material";
import {
  getMyActiveOrders,
  getMyCompletedOrders,
} from "apis/endpoints/MyOrdersEndpoints";
import ItemCard from "components/ItemCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.user);

  const [myActiveOrders, setMyActiveOrders] = useState([]);
  const [myCompletedOrders, setMyCompletedOrders] = useState([]);

  useEffect(() => {
    getMyActiveOrders(userInfo._id).then((response) => {
      setMyActiveOrders(response);
    });
    getMyCompletedOrders(userInfo._id).then((response) => {
      setMyCompletedOrders(response);
    });
  }, [userInfo._id]);

  const renderCards = (orders) => {
    return orders.map((order) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
        <ItemCard
          listingId={order.listingId}
          onClick={() => {
            navigate(`/my-orders/${order._id}`);
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
