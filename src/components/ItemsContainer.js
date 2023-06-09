import { Grid } from "@mui/material";
import React from "react";
import Item from "./Item";

function ItemsContainer({ itemIdList }) {
  return (
    <Grid container spacing={2}>
      {itemIdList.map((itemId) => (
        <Grid item xs={12} key={itemId._id}>
          <Item item={itemId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemsContainer;
