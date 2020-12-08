import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import GatewayList from "modules/gateway/components/GatewayList";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
  },
}));

export default function GatewayContainer() {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <GatewayList />
        </Paper>
      </Grid>
    </div>
  );
}
