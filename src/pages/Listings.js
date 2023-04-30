import { Box, Grid, Paper, Typography } from "@mui/material";
import { getListings } from "apis/endpoints/ListingEndpoints";
import ItemCard from "components/ItemCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Listings() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.user);

  const [listings, setListings] = useState([]);
  const [receommendedListings, setRecommendedListings] = useState([]);

  useEffect(() => {}, [listings]);

  useEffect(() => {
    getListings().then((response) => {
      setListings(response);
    });
  }, []);

  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" textAlign="center">
            Welcome to BulkBuy Purchase
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="BulkBuy"
            src="/images/bulk-buy-ad.gif"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Available listings</Typography>
        </Grid>
        <Grid item xs={12}>
          {listings.length ? (
            <Grid container spacing={2}>
              {listings?.map((listing) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
                  <ItemCard
                    listingId={listing.id}
                    onClick={() => {
                      navigate(`/listings/${listing.id}`);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="subtitle1">No listings available</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Listings;
