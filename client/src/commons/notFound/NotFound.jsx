import React from "react";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // "@global": {
  //   body: {
  //     backgroundColor: "#FAFAFA",
  //   },
  // },

  error_code_container: {
    width: "600px",
    backgroundColor: theme.palette.primary.main,
  },

  error_code_code: {
    fontSize: 150,
    fontWeight: 700,
    color: theme.palette.primary.contrastText,
  },

  error_code_info: {
    fontSize: 32,
    fontWeight: 600,
    color: theme.palette.primary.main,
    padding: theme.spacing(3, 0, 0, 0),
  },

  error_code_note: {
    fontSize: "1.30375rem",
    fontWeight: 400,
    color: theme.palette.gray,
    padding: theme.spacing(4, 0, 0, 0),
  },
  component_full_width: {
    width: "100%",
  },

  component_full_height: {
    height: "100%",
  },

  subtitle_component: {
    color: theme.palette.gray,
    fontSize: 16,
  },

  link_component: {
    color: theme.palette.primary.main,
  },

  subtitle: {
    fontSize: "1.09375rem",
    fontWeight: 400,
    color: theme.palette.gray,
  },
}));

export default function NotFound() {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Grid
        className={clsx(
          classes.component_full_width,
          classes.component_full_height
        )}
        container
        direction={"column"}
        alignItems={"center"}
        justify={"center"}
      >
        <Grid
          className={clsx(classes.error_code_container)}
          item
          component={Paper}
        >
          <Typography align="center" className={classes.error_code_code}>
            404
          </Typography>
        </Grid>

        <Grid item>
          <Typography className={classes.error_code_info}>
            Page not found :(
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="outlined" onClick={goBack} color="primary">
            Go Back
          </Button>
        </Grid>

        <Grid item>
          <Typography className={clsx(classes.error_code_note)}>
            Maybe the page you are looking for has been removed, or you typed in
            the wrong URL.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
