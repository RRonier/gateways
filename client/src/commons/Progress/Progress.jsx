import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 5,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Progress({ loading }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LinearProgress hidden={!loading} />
    </div>
  );
}

Progress.propTypes = {
  loading: PropTypes.bool.isRequired,
};
