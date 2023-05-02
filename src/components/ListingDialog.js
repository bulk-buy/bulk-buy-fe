import { Delete } from "@mui/icons-material";
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
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getItems, deleteItem } from "apis/endpoints/ItemsEndpoints";
import { getListing } from "apis/endpoints/ListingEndpoints";
import { CategoriesTesting } from "constants/CategoriesTesting";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import * as Yup from "yup";

function ListingDialog({
  openNewListingDialog,
  setOpenNewListingDialog,
  listingId,
}) {
  const [listing, setListing] = useState({
    title: "",
    description: "",
    category: "",
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
    minRequired: 0,
    items: [
      {
        title: "",
        description: "",
        price: "",
      },
    ],
  });

  useEffect(() => {
    if (listingId) {
      getListing(listingId).then((listing) => {
        console.log(listing);
        setListing(listing);
        getItems(listingId).then((items) => {
          setListing({ ...listing, items: items });
        });
      });
    }
  }, [listingId]);

  const newListingValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required"),
    minRequired: Yup.number().required("Minimum Required is required"),
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

  const listingForm = useFormik({
    initialValues: listing,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: newListingValidation,
    enableReinitialize: true,
  });

  return (
    <Dialog
      open={openNewListingDialog}
      maxWidth="md"
      onClose={() => setOpenNewListingDialog(false)}
    >
      <form onSubmit={listingForm.handleSubmit}>
        <DialogTitle textAlign="center">
          {listingId ? "Update Listing" : "Create New Listing"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Title"
                name="title"
                value={listingForm.values.title}
                onChange={listingForm.handleChange}
                helperText={
                  listingForm.errors.title && listingForm.touched.title
                    ? listingForm.errors.title
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
                value={listingForm.values.description}
                onChange={listingForm.handleChange}
                helperText={
                  listingForm.errors.description &&
                  listingForm.touched.description
                    ? listingForm.errors.description
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                select
                label="Category"
                name="category"
                value={listingForm.values.category}
                onChange={listingForm.handleChange}
                helperText={
                  listingForm.errors.category && listingForm.touched.category
                    ? listingForm.errors.category
                    : null
                }
              >
                {CategoriesTesting.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                fullWidth
                required
                value={listingForm.values.startDate}
                onChange={listingForm.handleChange}
                helperText={
                  listingForm.errors.startDate && listingForm.touched.startDate
                    ? listingForm.errors.startDate
                    : null
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                fullWidth
                required
                value={listingForm.values.endDate}
                onChange={listingForm.handleChange}
                helperText={
                  listingForm.errors.endDate && listingForm.touched.endDate
                    ? listingForm.errors.endDate
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Minimum Required"
                name="minRequired"
                type="number"
                value={listingForm.values.minRequired}
                onChange={listingForm.handleChange}
                helperText={
                  listingForm.errors.minRequired &&
                  listingForm.touched.minRequired
                    ? listingForm.errors.minRequired
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              {listingForm.values.items.map((item, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={10}>
                    <Typography variant="h6">Item {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="end">
                    <IconButton
                      onClick={() => {
                        listingForm.values.items.splice(index, 1);
                        listingForm.setFieldValue(
                          "items",
                          listingForm.values.items
                        );
                        if (item.id) {
                          deleteItem(item.id);
                        }
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
                      onChange={listingForm.handleChange}
                      helperText={
                        listingForm.errors.items &&
                        listingForm.errors.items[index] &&
                        listingForm.errors.items[index].title &&
                        listingForm.touched.items &&
                        listingForm.touched.items[index] &&
                        listingForm.touched.items[index].title
                          ? listingForm.errors.items[index].title
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
                      onChange={listingForm.handleChange}
                      helperText={
                        listingForm.errors.items &&
                        listingForm.errors.items[index] &&
                        listingForm.errors.items[index].description &&
                        listingForm.touched.items &&
                        listingForm.touched.items[index] &&
                        listingForm.touched.items[index].description
                          ? listingForm.errors.items[index].description
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
                      onChange={listingForm.handleChange}
                      inputProps={{}}
                      InputProps={{
                        step: "0.01",

                        startAdornment: (
                          <InputAdornment position="start">SGD</InputAdornment>
                        ),
                      }}
                      helperText={
                        listingForm.errors.items &&
                        listingForm.errors.items[index] &&
                        listingForm.errors.items[index].price &&
                        listingForm.touched.items &&
                        listingForm.touched.items[index] &&
                        listingForm.touched.items[index].price
                          ? listingForm.errors.items[index].price
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
                    listingForm.values.items.push({
                      title: "",
                      description: "",
                      price: "",
                    });
                    listingForm.setFieldValue(
                      "items",
                      listingForm.values.items
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
            {listingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ListingDialog;
