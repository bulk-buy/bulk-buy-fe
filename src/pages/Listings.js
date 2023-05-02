import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  getListings,
  getRecommendedListings,
} from "apis/endpoints/ListingEndpoints";
import { getTest } from "apis/endpoints/TestEndpoint";
import ItemCard from "components/ItemCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Listings() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [recommendedListings, setRecommendedListings] = useState([]);

  useEffect(() => {}, [listings]);

  useEffect(() => {
    getTest().then((response) => {
      console.log(response);
    });

    getRecommendedListings().then((response) => {
      setRecommendedListings(response);
    });

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
          <Typography variant="h3">Recommended listings</Typography>
        </Grid>
        <Grid item xs={12}>
          {listings.length ? (
            <Grid container spacing={2}>
              {recommendedListings?.map((listing) => (
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
