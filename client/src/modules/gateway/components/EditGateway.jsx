import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import UnelevatedButton from "commons/CustomButton/UnelevatedButton";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { createGatewaySchema } from "modules/gateway/validations/ValidateGateway";
import { updateGateway } from "services/gateway";

const useStyles = makeStyles((theme) => ({
  formStyles: {
    "& > *": {
      marginBottom: theme.spacing(1.2),
    },
  },
}));

export default function EditGateway({ gateway, onGetGateways, firstRender }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: gateway,
    initialValues: {
      serial: gateway.serial,
      name: gateway.name,
      address: gateway.address,
    },
    onSubmit: (values, { resetForm, setErrors }) => {
      setLoading(true);
      updateGateway(gateway._id, values)
        .then(() => {
          enqueueSnackbar("Gateway was updated successfully", {
            variant: "success",
          });
          setLoading(false);
          resetForm();
          setOpen(false);
          firstRender.current = true;
          onGetGateways();
        })
        .catch((error) => {
          enqueueSnackbar("Some thing went wrong", {
            variant: "error",
          });
          setLoading(false);
        });
    },
    validationSchema: createGatewaySchema,
  });

  return (
    <>
      <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container alignItems="center">
            Edit Gateway
          </Grid>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className={classes.formStyles}
          >
            <TextField
              label="Serial*"
              name="serial"
              variant="filled"
              fullWidth
              value={formik.values.serial || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.serial && formik.errors.serial)}
              helperText={
                formik.touched.serial && formik.errors.serial
                  ? formik.errors.serial
                  : "Enter serial number"
              }
            />
            <TextField
              label="Name*"
              name="name"
              variant="filled"
              fullWidth
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.name && formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : "Enter name"
              }
            />
            <TextField
              label="IPv4 Address*"
              name="address"
              variant="filled"
              fullWidth
              value={formik.values.address || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.address && formik.errors.address)}
              helperText={
                formik.touched.address && formik.errors.address
                  ? formik.errors.address
                  : "Enter IPv4 address Eg. 192.168.2.1"
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <UnelevatedButton onClick={handleClose} color="gray">
            Close
          </UnelevatedButton>
          <UnelevatedButton
            type="button"
            color="primary"
            withProgress={loading}
            onClick={formik.submitForm}
          >
            Save
          </UnelevatedButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditGateway.propTypes = {
  gateway: PropTypes.object.isRequired,
  onGetGateways: PropTypes.func.isRequired,
};
