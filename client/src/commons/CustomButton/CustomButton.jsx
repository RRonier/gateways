import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import { Button, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonDanger: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CustomButton({ color, loading, children, ...props }) {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: color === "primary",
    [classes.buttonDanger]: color === "error",
  });

  return (
    <div className={classes.wrapper}>
      <Button
        {...props}
        variant="contained"
        className={buttonClassname}
        disabled={loading}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}

CustomButton.propTypes = {
  color: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
