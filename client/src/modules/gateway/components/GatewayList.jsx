import React, { useState, useEffect, useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  Drawer,
  Grid,
  IconButton,
  TextField,
  TablePagination,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Title from "commons/Title/Title";
import Progress from "commons/Progress/Progress";
import CustomButton from "commons/CustomButton/CustomButton";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { createGatewaySchema } from "modules/gateway/validations/ValidateGateway";

import { getGateways, addGateway } from "services/gateway";
import DeleteGateway from "./DeleteGateway";
import EditGateway from "./EditGateway";
import { Link } from "react-router-dom";

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

export default function GatewayList() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

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

  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const [loading, setLoading] = useState(false);
  const [gatewaysData, setGatewaysData] = useState({});

  const firstRender = useRef(true);

  const onGetGateways = useCallback(() => {
    if (firstRender.current) {
      setLoading(true);
      getGateways(params)
        .then((resp) => {
          setLoading(false);
          setGatewaysData(resp.data);
          firstRender.current = false;
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [params]);

  useEffect(() => {
    onGetGateways();
  }, [onGetGateways]);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const formik = useFormik({
    initialValues: {
      serial: "",
      name: "",
      address: "",
    },
    onSubmit: (values, { resetForm, setErrors }) => {
      setLoadingAdd(true);
      addGateway(values)
        .then(() => {
          enqueueSnackbar("Gateway was created successfully", {
            variant: "success",
          });
          setLoadingAdd(false);
          resetForm();
          setOpen(false);
          firstRender.current = true;
          onGetGateways();
        })
        .catch((error) => {
          if (+error?.response?.status === 400) {
            setErrors({ serial: error?.response?.data?.error });
          }
          enqueueSnackbar("Some thing went wrong", {
            variant: "error",
          });
          setLoadingAdd(false);
        });
    },
    validationSchema: createGatewaySchema,
  });

  const handlePageChange = (event, newPage) => {
    setParams((oldParams) => ({ ...oldParams, page: newPage + 1 }));
    params.page = newPage + 1;
    firstRender.current = true;
    onGetGateways();
  };

  const timeoutId = useRef();

  const handleSearch = (event) => {
    event.persist();
    clearTimeout(timeoutId.current);
    setParams((oldParams) => ({ ...oldParams, search: event.target.value }));
    params.search = event.target.value;
    timeoutId.current = setTimeout(() => {
      firstRender.current = true;
      onGetGateways();
    }, 1000);
  };

  return (
    <>
      <Progress loading={loading} />
      <Title>Gateway List</Title>
      <Grid container justify="flex-end">
        <TextField
          label="Search"
          variant="filled"
          onChange={handleSearch}
          size="small"
        />
      </Grid>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gatewaysData?.results?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.serial}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="details"
                  component={Link}
                  to={`/gateways/${row._id}`}
                >
                  <VisibilityIcon color="primary" />
                </IconButton>
                <EditGateway
                  gateway={row}
                  onGetGateways={onGetGateways}
                  firstRender={firstRender}
                />
                <DeleteGateway
                  gateway={row}
                  onGetGateways={onGetGateways}
                  firstRender={firstRender}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage={""}
        component={"div"}
        rowsPerPageOptions={[5]}
        page={gatewaysData?.total === 0 ? 0 : params.page - 1}
        count={gatewaysData?.total || 0}
        rowsPerPage={5}
        onChangePage={handlePageChange}
      />
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
            <Title>Create Gateway</Title>
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
