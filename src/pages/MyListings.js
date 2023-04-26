import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import {
  fetchMyActiveListings,
  fetchMyCompletedListings,
  fetchMyUpcomingListings,
} from "apis/endpoints/ListingEndpoints";
import CreateNewListingDialog from "components/CreateNewListingDialog";
import { useEffect, useState } from "react";

function MyListings() {
  const [myActiveListings, setMyActiveListings] = useState([]);
  const [myUpcomingListings, setMyUpcomingListings] = useState([]);
  const [myCompletedListings, setMyCompletedListings] = useState([]);
  const [openNewListingDialog, setOpenNewListingDialog] = useState(false);

  useEffect(() => {
    fetchMyActiveListings().then((response) => {
      setMyActiveListings(response);
    });
    fetchMyUpcomingListings().then((response) => {
      setMyUpcomingListings(response);
    });
    fetchMyCompletedListings().then((response) => {
      setMyCompletedListings(response);
    });
  }, []);

  const renderCards = (listings) => {
    return listings.map((listing) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
        <Card
          sx={{ maxWidth: 345 }}
          onClick={() => {
            console.log(listing.id);
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src="/images/trolley512.png"
              alt={listing.category.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {listing.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {listing.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  };

  const renderActiveListings = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Active </Typography>
      </Grid>
      <Grid item xs={12}>
        {myActiveListings.length ? (
          <Grid container spacing={2}>
            {renderCards(myActiveListings)}
          </Grid>
        ) : (
          <Typography variant="subtitle1">No active listings</Typography>
        )}
      </Grid>
    </Grid>
  );

  const renderUpcomingListings = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Upcoming </Typography>
      </Grid>
      <Grid item xs={12}>
        {myUpcomingListings.length ? (
          <Grid container spacing={2}>
            {renderCards(myUpcomingListings)}
          </Grid>
        ) : (
          <Typography variant="subtitle1">No upcoming listings</Typography>
        )}
      </Grid>
    </Grid>
  );

  const renderCompletedListings = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Completed </Typography>
      </Grid>
      <Grid item xs={12}>
        {myCompletedListings.length ? (
          <Grid container spacing={2}>
            {renderCards(myCompletedListings)}
          </Grid>
        ) : (
          <Typography variant="subtitle1">No completed listings</Typography>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12} textAlign="end">
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setOpenNewListingDialog(true)}
          >
            Create New Listing
          </Button>
        </Grid>
        <CreateNewListingDialog
          openNewListingDialog={openNewListingDialog}
          setOpenNewListingDialog={setOpenNewListingDialog}
        />
        {renderActiveListings()}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {renderUpcomingListings()}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {renderCompletedListings()}
      </Grid>
    </Paper>
  );
}

export default MyListings;
