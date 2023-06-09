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
import { getCategory } from "apis/endpoints/CategoriesEndpoints";
import { getListing } from "apis/endpoints/ListingEndpoints";
import {
  getOrder,
  getOrders,
  getOrdersByListingId,
} from "apis/endpoints/OrdersEndpoints";
import { getUser } from "apis/endpoints/UserEndpoints";
import moment from "moment";
import { useEffect, useState } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode == "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode == "light" ? "#1a90ff" : "#308fe8",
  },
}));

function ItemCard({ listingId, onClick }) {
  const [itemSummary, setItemSummary] = useState();
  const [category, setCategory] = useState();
  const [postedBy, setPostedBy] = useState();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getListing(listingId).then((listing) => {
      setItemSummary(listing);
    });
    getOrdersByListingId(listingId).then((orders) => {
      setOrders(orders);
    });
  }, [listingId]);

  useEffect(() => {
    if (itemSummary) {
      getCategory(itemSummary.categoryId).then((category) => {
        setCategory(category);
      });
      getUser(itemSummary.postedBy).then((user) => {
        setPostedBy(user);
      });
    }
  }, [itemSummary]);

  const calculatePercentage = (numerator, denominator) => {
    if (denominator <= 0) {
      return 100;
    } else {
      return (numerator / denominator) * 100 >= 100
        ? 100
        : (numerator / denominator) * 100;
    }
  };

  const getOrderCount = () => {
    let count = 0;
    orders?.forEach((order) => {
      order.items?.forEach((item) => {
        count += item?.quantity ? item?.quantity : 0;
      });
    });
    return count;
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src="/images/trolley512.png"
          alt={category?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemSummary?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {itemSummary?.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Start date: ${moment(itemSummary?.startDate).format(
              "DD/MM/YYYY"
            )}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`End date: ${moment(itemSummary?.endDate).format("DD/MM/YYYY")}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Posted by ${postedBy?.firstName} ${postedBy?.lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Minimum orders required: ${itemSummary?.minRequired}`}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <BorderLinearProgress
                variant="determinate"
                value={calculatePercentage(
                  getOrderCount(),
                  itemSummary?.minRequired
                )}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.floor(
                calculatePercentage(getOrderCount(), itemSummary?.minRequired)
              )}%`}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
