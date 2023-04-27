import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { fetchCategory } from "apis/endpoints/CategoriesEndpoints";
import { fetchListingSummary } from "apis/endpoints/ListingSummaryEndpoints";
import { useEffect, useState } from "react";

function ItemCard({ listingId, onClick }) {
  const [itemSummary, setItemSummary] = useState({});

  useEffect(() => {
    fetchListingSummary(listingId).then((response) => {
      setItemSummary(response);
      fetchCategory(response.category.id).then((response) => {
        setItemSummary((prevState) => ({
          ...prevState,
          category: response,
        }));
      });
    });
  }, [listingId]);

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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
