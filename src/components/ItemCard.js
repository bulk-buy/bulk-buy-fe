import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import { fetchCategory } from "apis/endpoints/CategoriesEndpoints";
import { fetchListingSummary } from "apis/endpoints/ListingSummaryEndpoints";
import { fetchOrderDetails } from "apis/endpoints/OrdersEndpoints";
import { fetchUser } from "apis/endpoints/UserEndpoints";
import { useEffect, useState } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function ItemCard({ listingId, onClick }) {
  const [itemSummary, setItemSummary] = useState({});
  const [postedBy, setPostedBy] = useState({});

  useEffect(() => {
    fetchListingSummary(listingId).then((response) => {
      setItemSummary(response);
      fetchCategory(response.category.id).then((response) => {
        setItemSummary((prevState) => ({
          ...prevState,
          category: response,
        }));
      });
      fetchUser(response.postedBy.id).then((response) => {
        setPostedBy(response);
      });
      response.orders.forEach((order) => {
        fetchOrderDetails(order.id).then((response) => {
          setItemSummary((prevState) => ({
            ...prevState,
            orders: prevState.orders
              ? [...prevState.orders, response]
              : [response],
          }));
        });
      });
    });
  }, [listingId]);

  const calculatePercentage = (numerator, denominator) => {
    return (numerator / denominator) * 100;
  };

  const getOrderCount = () => {
    let orderCount = 0;
    if (itemSummary.orders) {
      itemSummary.orders.forEach((order) => {
        order.items?.forEach((item) => {
          orderCount += item.quantity;
        });
      });
    }
    return orderCount;
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia component="img" height="140" src="/images/trolley512.png" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemSummary.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {itemSummary.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Posted by ${postedBy.firstName} ${postedBy.lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Minimum orders required: ${itemSummary.minRequired}`}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <BorderLinearProgress
                variant="determinate"
                value={calculatePercentage(
                  getOrderCount(),
                  itemSummary.minRequired
                )}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.floor(
                calculatePercentage(getOrderCount(), itemSummary.minRequired)
              )}%`}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
