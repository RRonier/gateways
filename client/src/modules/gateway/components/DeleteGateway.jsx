import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Grid,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import WarningIcon from "@material-ui/icons/Warning";
import PropTypes from "prop-types";
import UnelevatedButton from "commons/CustomButton/UnelevatedButton";
import { useSnackbar } from "notistack";
import { deleteGateway } from "services/gateway";

export default function DeleteGateway({ gateway, onGetGateways, firstRender }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const onDelete = () => {
    setLoading(true);
    deleteGateway(gateway._id)
      .then(() => {
        enqueueSnackbar(
          `Gateway with name: ${gateway.name} and Ipv4: ${gateway.address} was deleted successfully`,
          {
            variant: "success",
          }
        );
        setLoading(false);
        setOpen(false);
        firstRender.current = true;
        onGetGateways();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      });
  };

  return (
    <>
      <IconButton aria-label="delete" color="primary" onClick={handleClickOpen}>
        <DeleteForeverIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container alignItems="center">
            <WarningIcon color="primary" /> Confirmation
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to remove the gatewat with name: ${gateway.name} and Ipv4: ${gateway.address}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <UnelevatedButton onClick={handleClose} color="gray">
            Close
          </UnelevatedButton>
          <UnelevatedButton
            type="button"
            color="error"
            withProgress={loading}
            onClick={onDelete}
          >
            Delete
          </UnelevatedButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteGateway.propTypes = {
  gateway: PropTypes.object.isRequired,
  onGetGateways: PropTypes.func.isRequired,
};
