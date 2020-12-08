import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import GatewayDetails from "modules/gateway/components/GatewayDetails";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
  },
}));

export default function GatewayDetailsContainer() {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <GatewayDetails />
        </Paper>
      </Grid>
    </div>
  );
}
