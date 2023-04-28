import { Grid } from "@mui/material";
import React from "react";
import Item from "./Item";

function ItemsContainer({ itemIdList }) {
  console.log(itemIdList);
  return (
    <Grid container spacing={2}>
      {itemIdList.map((itemId) => (
        <Grid item xs={12} key={itemId.id}>
          <Item item={itemId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemsContainer;
