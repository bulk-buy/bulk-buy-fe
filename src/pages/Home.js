import { Grid, Paper, Typography } from "@mui/material";
import { fetchListings } from "apis/endpoints/ListingEndpoints";
import ItemCard from "components/ItemCard";
import React, { useEffect, useState } from "react";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings().then((response) => {
      setListings(response);
    });
  }, []);

  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Available listings</Typography>
        </Grid>
        <Grid item xs={12}>
          {listings.length ? (
            <Grid container spacing={2}>
              {listings.map((listing) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
                  <ItemCard itemId={listing.id} />
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

export default Home;
