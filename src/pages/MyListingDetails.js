import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { fetchMyListingDetails } from "apis/endpoints/MyListingEndpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function MyListingDetails() {
  const { listingId } = useParams();
  const [myListingDetails, setMyListingDetails] = useState();

  useEffect(() => {
    fetchMyListingDetails(listingId).then((response) => {
      setMyListingDetails(response);
    });
  }, [listingId]);

  const fetchItemTitle = (itemId) => {
    const item = myListingDetails.items.find((item) => item.id === itemId);
    return item.title;
  };

  return (
    <Paper elevation={0}>
      {myListingDetails && (
        <>
          <Box
            component="img"
            sx={{
              height: 200,
            }}
            alt={`${myListingDetails.category.name}`}
            src="/images/trolley512.png"
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" gutterBottom component="div">
                {myListingDetails.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {myListingDetails.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Accordion defaultExpanded elevation={0}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h3" gutterBottom component="div">
                    Items
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {myListingDetails.items.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <Typography variant="h5" gutterBottom component="div">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          {item.description}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded elevation={0}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h3" gutterBottom component="div">
                    Orders
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {myListingDetails.orders?.map((order) => (
                      <Grid item xs={12} key={order.id}>
                        <Typography variant="h5" gutterBottom component="div">
                          {order.user.name}
                        </Typography>
                        {order.items.map((item) => (
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                            key={item.id}
                          >
                            {`${fetchItemTitle(item.id)} x ${item.quantity}`}
                          </Typography>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
}

export default MyListingDetails;
