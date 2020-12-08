import React from "react";
import {
  Button as MuiButton,
  MuiThemeProvider as ThemeProvider,
  createMuiTheme,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import { fade, lighten } from "@material-ui/core/styles";

import * as palette from "utils/palette";

const StyledButton = withStyles((theme) => ({
  root: {
    padding: "8px 24px 8px 24px",
    "&:hover": {
      backgroundColor: lighten(theme.palette.primary.main, 0.15),
    },
  },

  containedPrimary: {
    "&:hover": {
      backgroundColor: lighten(theme.palette.primary.main, 0.15),
    },
  },

  containedSecondary: {
    "&:hover": {
      backgroundColor: lighten(theme.palette.secondary.main, 0.15),
    },
  },

  textPrimary: {
    "&:hover": {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },

  textSecondary: {
    "&:hover": {
      backgroundColor: fade(
        theme.palette.secondary.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
}))(MuiButton);

const error = createMuiTheme({
  palette: {
    primary: {
      main: palette.redPersimmon,
      contrastText: palette.white,
    },
  },
});

const gray = createMuiTheme({
  palette: {
    primary: {
      main: palette.graySilver,
      contrastText: palette.white,
    },
  },
});

export default function UnelevatedButton({
  color,
  disabled,
  children,
  withProgress,
  ...props
}) {
  return (
    <div style={{ position: "relative" }}>
      {color === "error" ? (
        <ThemeProvider theme={error}>
          <StyledButton
            {...props}
            disabled={withProgress || disabled}
            color={"primary"}
            disableElevation
          >
            {children}
          </StyledButton>
        </ThemeProvider>
      ) : color === "gray" ? (
        <ThemeProvider theme={gray}>
          <StyledButton
            {...props}
            disabled={withProgress || disabled}
            color={"primary"}
            disableElevation
          >
            {children}
          </StyledButton>
        </ThemeProvider>
      ) : (
        <StyledButton
          {...props}
          color={color}
          disabled={withProgress || disabled}
          disableElevation
        >
          {children}
        </StyledButton>
      )}
      {withProgress && (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -12,
            marginLeft: -12,
          }}
          size={24}
        />
      )}
    </div>
  );
}
