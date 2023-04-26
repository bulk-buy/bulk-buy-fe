import { Add } from "@mui/icons-material";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import CreateNewListingDialog from "components/CreateNewListingDialog";
import { useState } from "react";

function MyListings() {
  const [activeListings, setActiveListings] = useState([]);
  const [inactiveListings, setInactiveListings] = useState([]);
  const [completedListings, setCompletedListings] = useState([]);
  const [openNewListingDialog, setOpenNewListingDialog] = useState(false);

  //   useEffect(() => {
  //     fetchActiveListings();
  //     fetchInactiveListings();
  //     fetchCompletedListings();
  // }, []);

  const renderActiveListings = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Active </Typography>
      </Grid>
      <Grid item xs={12}>
        {activeListings.length ? (
          <Grid></Grid>
        ) : (
          <Typography variant="subtitle1">No active listings</Typography>
        )}
      </Grid>
    </Grid>
  );

  const renderInactiveListings = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Inactive </Typography>
      </Grid>
      <Grid item xs={12}>
        {inactiveListings.length ? (
          <Grid></Grid>
        ) : (
          <Typography variant="subtitle1">No inactive listings</Typography>
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
        {completedListings.length ? (
          <Grid></Grid>
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
        {renderInactiveListings()}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {renderCompletedListings()}
      </Grid>
    </Paper>
  );
}

export default MyListings;
