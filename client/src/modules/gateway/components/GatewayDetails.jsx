import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Divider,
  Fab,
  Drawer,
  IconButton,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { useParams, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import Title from "commons/Title/Title";
import Progress from "commons/Progress/Progress";
import CustomButton from "commons/CustomButton/CustomButton";
import { getGatewayById } from "services/gateway";
import { addDevice, getDevice } from "services/device";
import { useFormik } from "formik";
import { createDeviceSchema } from "modules/gateway/validations/ValidateDevice";
import DeleteDevice from "modules/gateway/components/DeleteDevice";
import UnelevatedButton from "commons/CustomButton/UnelevatedButton";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  drawer: {
    width: 290,
    padding: 10,
  },
  formStyles: {
    "& > *": {
      marginBottom: theme.spacing(1.2),
    },
  },
}));

export default function GatewayDetails() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const [loadingGateway, setLoadingGateway] = useState(false);
  const [gateway, setGateway] = useState({});
  useEffect(() => {
    setLoadingGateway(true);
    getGatewayById(params.id)
      .then((resp) => {
        setLoadingGateway(false);
        setGateway(resp.data);
      })
      .catch((error) => {
        setLoadingGateway(false);
        enqueueSnackbar("Some thing went wrong", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar, params]);

  const [devices, setDevices] = useState({});
  const [loadingD, setLoadingD] = useState(false);

  useEffect(() => {
    setLoadingD(true);
    getDevice({ idGateway: params.id })
      .then((resp) => {
        setLoadingD(false);
        setDevices(resp.data);
      })
      .catch(() => {
        setLoadingD(false);
        enqueueSnackbar("Some thing went wrong", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar, params.id]);

  const onGetDevice = () => {
    setLoadingD(true);
    getDevice({ idGateway: params.id })
      .then((resp) => {
        setLoadingD(false);
        setDevices(resp.data);
      })
      .catch(() => {
        setLoadingD(false);
        enqueueSnackbar("Some thing went wrong", {
          variant: "error",
        });
      });
  };

  const [loadingAdd, setLoadingAdd] = useState(false);
  const formik = useFormik({
    initialValues: {
      idGateway: params.id,
      uid: "",
      vendor: "",
      status: "",
    },
    onSubmit: (values, { resetForm, setErrors }) => {
      if (devices?.results?.length > 9) {
        enqueueSnackbar(`Gateway can't exeded 10 devices`, {
          variant: "error",
        });
      } else {
        setLoadingAdd(true);
        addDevice(values)
          .then(() => {
            onGetDevice();
            enqueueSnackbar("Device was created successfully", {
              variant: "success",
            });
            setLoadingAdd(false);
            resetForm();
            setOpen(false);
          })
          .catch((error) => {
            setLoadingAdd(false);
            if (+error?.response?.status === 400) {
              setErrors({ uid: error?.response?.data?.error });
            }
            enqueueSnackbar("Some thing went wrong", {
              variant: "error",
            });
          });
      }
    },
    validationSchema: createDeviceSchema,
  });

  const mapStatus = (status) => {
    let content;
    if (status === "Online") {
      content = (
        <Typography
          align="center"
          style={{
            color: "white",
            fontSize: 12,
            backgroundColor: green[500],
            borderRadius: "4px",
            padding: "8px 0 8px 0",
          }}
        >
          <b>{status}</b>
        </Typography>
      );
    } else if (status === "Offline") {
      content = (
        <Typography
          align="center"
          style={{
            color: "white",
            fontSize: 12,
            backgroundColor: grey[500],
            borderRadius: "4px",
            padding: "8px 0 8px 0",
          }}
        >
          <b>{status}</b>
        </Typography>
      );
    }
    return content;
  };

  const onBackToGateways = () => {
    history.push("/gateways");
  };

  return (
    <>
      <Progress loading={loadingGateway} />
      <Title>Gateway Details</Title>
      <Grid container direction="column">
        <Grid container item>
          <Typography component="p">
            <b>Serial:</b> {gateway?.serial}
          </Typography>
        </Grid>
        <Grid container item>
          <Typography component="p">
            <b>Name:</b> {gateway?.name}
          </Typography>
        </Grid>
        <Grid container item>
          <Typography component="p">
            <b>Address:</b> {gateway?.address}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Progress loading={loadingD} />
      <Title>Devices List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Uid</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices?.results?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.uid}</TableCell>
              <TableCell>{row.vendor}</TableCell>
              <TableCell>{mapStatus(row.status)}</TableCell>
              <TableCell align="right">
                <DeleteDevice device={row} onGetDevice={onGetDevice} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UnelevatedButton color="primary" onClick={onBackToGateways}>
        Back to gateways
      </UnelevatedButton>
      <Fab
        aria-label="add gateway"
        className={classes.fab}
        color="primary"
        onClick={toggleDrawer(true)}
      >
        <AddIcon />
      </Fab>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <Grid container justify="space-between" alignItems="center">
            <Title>Create Device</Title>
            <IconButton aria-label="close" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className={classes.formStyles}
          >
            <TextField
              label="Uid*"
              name="uid"
              type="number"
              variant="filled"
              fullWidth
              value={formik.values.uid || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.uid && formik.errors.uid)}
              helperText={
                formik.touched.uid && formik.errors.uid
                  ? formik.errors.uid
                  : "Enter uid number"
              }
            />
            <TextField
              label="Vendor*"
              name="vendor"
              variant="filled"
              fullWidth
              value={formik.values.vendor || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.vendor && formik.errors.vendor)}
              helperText={
                formik.touched.vendor && formik.errors.vendor
                  ? formik.errors.vendor
                  : "Enter vendor"
              }
            />
            <TextField
              select
              name="status"
              label="Select status*"
              variant="filled"
              fullWidth
              value={formik.values.status || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.status && formik.errors.status)}
              helperText={
                formik.touched.status && formik.errors.status
                  ? formik.errors.status
                  : "Enter status"
              }
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </TextField>
            <Grid container justify="flex-end">
              <CustomButton color="primary" loading={loadingAdd} type="submit">
                Create
              </CustomButton>
            </Grid>
          </form>
        </div>
      </Drawer>
    </>
  );
}
