import { Save } from "@mui/icons-material";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { MuiTelInput } from "mui-tel-input";
import * as Yup from "yup";

const profileValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^\S*$/, "Whitespace is not allowed"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{8}$/, "Phone number must be 8 digits"),
  streetName: Yup.string()
    .required("Street name is required")
    .matches(/^\S*$/, "Whitespace is not allowed"),
  block: Yup.string()
    .required("Block is required")
    .matches(/^\S*$/, "Whitespace is not allowed"),
  unit: Yup.string()
    .required(
      "Unit is required (For appartments without unit number, please enter 0)))"
    )
    .matches(/^\S*$/, "Whitespace is not allowed"),
  postalCode: Yup.string()
    .required("Postal code is required")
    .matches(/^[0-9]{6}$/, "Postal code must be 6 digits")
    .matches(/^\S*$/, "Whitespace is not allowed"),
});

function Profile() {
  const profileForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "+65",
      streetName: "",
      block: "",
      unit: "",
      postalCode: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: profileValidation,
  });

  return (
    <Paper elevation={0}>
      <form onSubmit={profileForm.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="First Name"
              name="firstName"
              type="text"
              onChange={profileForm.handleChange}
              value={profileForm.values.firstName}
              helperText={
                profileForm.errors.firstName && profileForm.touched.firstName
                  ? profileForm.errors.firstName
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Last Name"
              name="lastName"
              type="text"
              onChange={profileForm.handleChange}
              value={profileForm.values.lastName}
              helperText={
                profileForm.errors.lastName && profileForm.touched.lastName
                  ? profileForm.errors.lastName
                  : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MuiTelInput
              defaultCountry={"sg"}
              forceCallingCode
              disableFormatting
              disableDropdown
              fullWidth
              required
              label="Phone"
              name="phone"
              variant="outlined"
              onChange={(value) =>
                profileForm.handleChange({ target: { name: "phone", value } })
              }
              value={profileForm.values.phone}
              inputProps={{ maxLength: 8 }}
              helperText={
                profileForm.errors.phone && profileForm.touched.phone
                  ? profileForm.errors.phone
                  : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Street name"
              name="streetName"
              onChange={profileForm.handleChange}
              value={profileForm.values.streetName}
              helperText={
                profileForm.errors.streetName && profileForm.touched.streetName
                  ? profileForm.errors.streetName
                  : null
              }
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              required
              label="Block"
              name="block"
              onChange={profileForm.handleChange}
              value={profileForm.values.block}
              helperText={
                profileForm.errors.block && profileForm.touched.block
                  ? profileForm.errors.block
                  : null
              }
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Unit *"
              name="unit"
              onChange={profileForm.handleChange}
              value={profileForm.values.unit}
              helperText={
                profileForm.touched.unit ? profileForm.errors.unit : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Postal Code"
              name="postalCode"
              onChange={profileForm.handleChange}
              value={profileForm.values.postalCode}
              helperText={
                profileForm.errors.postalCode && profileForm.touched.postalCode
                  ? profileForm.errors.postalCode
                  : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="secondary"
              type="submit"
              variant="contained"
              startIcon={<Save />}
            >
              save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default Profile;
