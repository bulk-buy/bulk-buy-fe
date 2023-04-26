import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import * as Yup from "yup";

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

  const newListingValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    // category: Yup.string().required("Category is required"),
    items: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.string()
          .required("Price is required")
          .matches(/^(\d*\.{0,1}\d{0,2}$)/, "Price must be a valid number"),
      })
    ),
  });

  const newListingForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      //   category: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      items: [
        {
          title: "",
          description: "",
          price: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: newListingValidation,
  });

  console.log(newListingForm.values);
  return (
    <Paper elevation={0}>
      <Dialog
        open={openNewListingDialog}
        maxWidth="md"
        onClose={() => setOpenNewListingDialog(false)}
      >
        <form onSubmit={newListingForm.handleSubmit}>
          <DialogTitle textAlign="center">
            <Typography variant="h4">Create New Listing</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Title"
                  name="title"
                  value={newListingForm.values.title}
                  onChange={newListingForm.handleChange}
                  helperText={
                    newListingForm.errors.title && newListingForm.touched.title
                      ? newListingForm.errors.title
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  label="Description"
                  name="description"
                  value={newListingForm.values.description}
                  onChange={newListingForm.handleChange}
                  helperText={
                    newListingForm.errors.description &&
                    newListingForm.touched.description
                      ? newListingForm.errors.description
                      : null
                  }
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Category"
                    name="category"
                    value={newListingForm.values.category}
                    onChange={newListingForm.handleChange}
                    helperText={
                    newListingForm.errors.category &&
                        newListingForm.touched.category
                        ? newListingForm.errors.category
                        : null
                    }
                />
                </Grid> */}
              <Grid item xs={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  inputFormat="MM/DD/YYYY"
                  type="date"
                  fullWidth
                  required
                  value={newListingForm.values.startDate}
                  onChange={(event) =>
                    newListingForm.handleChange(event.target.value)
                  }
                  helperText={
                    newListingForm.errors.startDate &&
                    newListingForm.touched.startDate
                      ? newListingForm.errors.startDate
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Date"
                  name="endDate"
                  inputFormat="MM/DD/YYYY"
                  type="date"
                  fullWidth
                  required
                  value={newListingForm.values.endDate}
                  onChange={newListingForm.handleChange}
                  helperText={
                    newListingForm.errors.endDate &&
                    newListingForm.touched.endDate
                      ? newListingForm.errors.endDate
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
                {newListingForm.values.items.map((item, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={10}>
                      <Typography variant="h6">Item {index + 1}</Typography>
                    </Grid>
                    <Grid item xs={2} textAlign="end">
                      <IconButton
                        onClick={() => {
                          newListingForm.values.items.splice(index, 1);
                          newListingForm.setFieldValue(
                            "items",
                            newListingForm.values.items
                          );
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Title"
                        name={`items[${index}].title`}
                        value={item.title}
                        onChange={newListingForm.handleChange}
                        helperText={
                          newListingForm.errors.items &&
                          newListingForm.errors.items[index] &&
                          newListingForm.errors.items[index].title &&
                          newListingForm.touched.items &&
                          newListingForm.touched.items[index] &&
                          newListingForm.touched.items[index].title
                            ? newListingForm.errors.items[index].title
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        multiline
                        label="Description"
                        name={`items[${index}].description`}
                        value={item.description}
                        onChange={newListingForm.handleChange}
                        helperText={
                          newListingForm.errors.items &&
                          newListingForm.errors.items[index] &&
                          newListingForm.errors.items[index].description &&
                          newListingForm.touched.items &&
                          newListingForm.touched.items[index] &&
                          newListingForm.touched.items[index].description
                            ? newListingForm.errors.items[index].description
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        type="number"
                        label="Price"
                        name={`items[${index}].price`}
                        value={item.price}
                        onChange={newListingForm.handleChange}
                        inputProps={{
                          step: "0.01",
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              SGD
                            </InputAdornment>
                          ),
                        }}
                        helperText={
                          newListingForm.errors.items &&
                          newListingForm.errors.items[index] &&
                          newListingForm.errors.items[index].price &&
                          newListingForm.touched.items &&
                          newListingForm.touched.items[index] &&
                          newListingForm.touched.items[index].price
                            ? newListingForm.errors.items[index].price
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      newListingForm.values.items.push({
                        title: "",
                        description: "",
                        price: "",
                      });
                      newListingForm.setFieldValue(
                        "items",
                        newListingForm.values.items
                      );
                    }}
                  >
                    Add New Item
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenNewListingDialog(false)}
              variant="contained"
              color="warning"
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
