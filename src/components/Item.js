import { Grid, Typography } from "@mui/material";
import React from "react";

function Item({ itemId }) {
  return (
    <Grid item xs={12} key={itemId.id}>
      <Typography variant="h5" gutterBottom component="div">
        {itemId.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {itemId.description}
      </Typography>
    </Grid>
  );
}

export default Item;
