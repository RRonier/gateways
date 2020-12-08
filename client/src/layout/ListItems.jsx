import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";

const menu = [
  {
    name: "Gateways",
    id: "gateways",
    icon: <SettingsRemoteIcon />,
    path: "/gateways",
  },
];

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
}));

export default function ListItems() {
  const classes = useStyles();

  return (
    <>
      {menu.map((item, index) => (
        <Tooltip
          key={`${index}:${item.name}:${item.path}`}
          title={item.name}
          placement={"right"}
        >
          <ListItem
            button
            component={NavLink}
            to={item.path}
            activeClassName={classes.selected}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </Tooltip>
      ))}
    </>
  );
}
