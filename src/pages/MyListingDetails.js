import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getItem, getItemsByListingId } from "apis/endpoints/ItemsEndpoints";
import {
  deleteMyListing,
  getMyListing,
} from "apis/endpoints/MyListingEndpoints";
import { getOrdersByListingId } from "apis/endpoints/OrdersEndpoints";
import { getUser } from "apis/endpoints/UserEndpoints";
import ListingDialog from "components/ListingDialog";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function NameContainer({ userId }) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser(userId).then((user) => {
      setUser(user);
    });
  }, [userId]);

  return (
    <Typography variant="h5" gutterBottom component="div">
      {user?.firstName} {user?.lastName}
    </Typography>
  );
}

function MyListingDetails() {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [myListing, setMyListing] = useState();
  const [myListingItems, setMyListingItems] = useState([]);
  const [myListingOrders, setMyListingOrders] = useState([]);
  const [editable, setEditable] = useState(false);
  const [openEditListingDialog, setOpenEditListingDialog] = useState(false);
  const [openDeleteListingDialog, setOpenDeleteListingDialog] = useState(false);

  const [v, setV] = useState(0);

  useEffect(() => {
    /* Fetch my listing details */
    getMyListing(listingId).then((listing) => {
      listing.__v && setV(listing.__v);
      setMyListing(listing);
      setEditable(moment().isBefore(listing?.startDate));
    });

    /* Fetch my listing items */
    getItemsByListingId(listingId).then((items) => {
      items.__v && setV(items.__v);
      items.forEach((item, index) => {
        getItem(item._id).then((item) => {
          item.__v && setV(item.__v);
          item[index] = item;
        });
      });
      setMyListingItems(items);
    });

    /* Fetch my listing orders */
    getOrdersByListingId(listingId).then((orders) => {
      setMyListingOrders(orders);
    });
  }, [listingId]);

  const renderListing = () => (
    <Grid item xs={12}>
      <Typography variant="h1" gutterBottom component="div">
        {myListing?.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {myListing?.description}
      </Typography>
    </Grid>
  );

  const renderItems = () => (
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h3" gutterBottom component="div">
          Items
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {myListingItems?.map((item) => (
            <Grid item container spacing={2} key={item._id}>
              <Grid item xs={9}>
                <Typography variant="h5" gutterBottom component="div">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  const renderOrders = () => (
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h3" gutterBottom component="div">
          Orders Summary
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {myListingOrders.map((order) => (
            <Grid container item xs={12} key={order._id}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom component="div">
                  <NameContainer userId={order.userId} />
                </Typography>
              </Grid>
              {order.item.map((orderItem) => (
                <Grid container item xs={12} key={orderItem._id}>
                  <Grid item xs={9}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      {
                        myListingItems?.find((i) => i._id == orderItem.itemId)
                          ?.title
                      }{" "}
                      x {orderItem.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="end">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      {`SGD ${
                        myListingItems?.find((i) => i._id == orderItem.itemId)
                          ?.price * orderItem.quantity
                      }`}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  textAlign="end"
                >
                  Total: SGD{" "}
                  {order?.item?.reduce((total, item) => {
                    return (
                      total +
                      myListingItems?.find((i) => i._id === item.itemId)
                        ?.price *
                        item.quantity
                    );
                  }, 0)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  const handleEditListing = () => {
    setOpenEditListingDialog(true);
  };

  const handleDeleteListing = () => {
    setOpenDeleteListingDialog(true);
  };

  const handleConfirmDeleteListing = () => {
    deleteMyListing(listingId, v).then((response) => {
      v = response.__v;
    });
    navigate("/my-listings");
  };

  return (
    <Paper elevation={0}>
      {editable && (
        <ListingDialog
          listingId={listingId}
          openNewListingDialog={openEditListingDialog}
          setOpenNewListingDialog={setOpenEditListingDialog}
        />
      )}
      <Dialog open={openDeleteListingDialog}>
        <DialogTitle>Are you sure you want to delete this listing?</DialogTitle>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setOpenDeleteListingDialog(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleConfirmDeleteListing}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Box
        component="img"
        sx={{
          height: 200,
        }}
        src="/images/trolley512.png"
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderListing()}
        </Grid>
        <Grid item xs={12}>
          {renderItems()}
        </Grid>
        <Grid item xs={12}>
          {renderOrders()}
        </Grid>
        {editable && (
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={handleEditListing}
              >
                Edit Listing
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleDeleteListing}
              >
                Delete Listing
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default MyListingDetails;
