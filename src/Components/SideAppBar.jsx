import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import ReportIcon from "@material-ui/icons/Report";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FeedbackIcon from "@material-ui/icons/Feedback";
import StarsIcon from "@material-ui/icons/Stars";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {
  makeStyles,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    width: 220,
  },
  divider: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  active: {
    color: "red",
  },
});
const SideAppBar = (props) => {
  const classes = useStyle();
  const iconFinder = (icon) => {
    if (icon === "EqualizerIcon") {
      return <EqualizerIcon />;
    } else if (icon === "EditIcon") {
      return <EditIcon />;
    } else if (icon === "ReportIcon") {
      return <ReportIcon />;
    } else if (icon === "FeedbackIcon") {
      return <FeedbackIcon />;
    } else if (icon === "StarsIcon") {
      return <StarsIcon />;
    } else if (icon === "HomeIcon") {
      return <HomeIcon />;
    } else if (icon === "SendIcon") {
      return <SendIcon />;
    } else if (icon === "CheckList") {
      return <ChecklistIcon />;
    }
  };
  return (
    <List className={classes.root}>
      {props.navBarList.map((navBar) => (
        <div key={navBar.id}>
          <ListItem button={true}>
            <ListItemText
              primary={
                <NavLink
                  activeclassname={classes.active}
                  exact="true"
                  to={navBar.link}
                  onClick={() => sessionStorage.removeItem("catPbRow")}
                >
                  <Typography variant="body1">
                    {iconFinder(navBar.icon)}
                    &nbsp; {navBar.name}
                  </Typography>
                </NavLink>
              }
            />
          </ListItem>
          <Divider className={classes.divider} />
        </div>
      ))}

      {props.pageName ? (
        ""
      ) : (
        <ListItem button onClick={props.statusOpener}>
          <ListItemIcon>
            <Typography variant="body1" color="primary">
              <EqualizerIcon /> &nbsp; Status
            </Typography>
          </ListItemIcon>
        </ListItem>
      )}
    </List>
  );
};
export default SideAppBar;
