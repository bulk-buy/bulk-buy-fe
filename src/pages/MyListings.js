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
  getMyActiveListings,
  getMyCompletedListings,
  getMyUpcomingListings,
} from "apis/endpoints/MyListingEndpoints";
import CreateNewListingDialog from "components/CreateNewListingDialog";
import ItemCard from "components/ItemCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function MyListings() {
  const navigate = useNavigate();

  const [myActiveListings, setMyActiveListings] = useState([]);
  const [myUpcomingListings, setMyUpcomingListings] = useState([]);
  const [myCompletedListings, setMyCompletedListings] = useState([]);
  const [openNewListingDialog, setOpenNewListingDialog] = useState(false);

  useEffect(() => {}, [
    myActiveListings,
    myUpcomingListings,
    myCompletedListings,
  ]);

  useEffect(() => {
    getMyActiveListings().then((response) => {
      setMyActiveListings(response);
    });
    getMyUpcomingListings().then((response) => {
      setMyUpcomingListings(response);
    });
    getMyCompletedListings().then((response) => {
      setMyCompletedListings(response);
    });
  }, []);

  const renderCards = (listings) => {
    return listings.map((listing) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
        <ItemCard
          listingId={listing.id}
          onClick={() => {
            navigate(`/my-listings/${listing.id}`);
          }}
        />
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
