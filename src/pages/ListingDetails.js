import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { fetchListing } from "apis/endpoints/ListingEndpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ListingDetails() {
  const { listingId } = useParams();

  const [listing, setListing] = useState();
  const [myOrders, setMyOrders] = useState();

  useEffect(() => {
    fetchListing(listingId).then((response) => {
      setListing(response);
    });
  }, [listingId]);

  return (
    <Paper elevation={0}>
      {listing && (
        <>
          <Box
            component="img"
            sx={{
              height: 200,
            }}
            alt={`${listing.category.name}`}
            src="/images/trolley512.png"
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" gutterBottom component="div">
                {listing.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {listing.description}
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
                    {listing.items.map((item) => (
                      <>
                        <Grid item xs={9} key={item.id}>
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
                        <Grid item xs={3} textAlign="end">
                          <ButtonGroup>
                            <Button variant="outlined">-</Button>
                            <Button variant="outlined">0</Button>
                            <Button variant="outlined">+</Button>
                          </ButtonGroup>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded elevation={0}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h3" gutterBottom component="div">
                    Orders Summary
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
}

export default ListingDetails;
