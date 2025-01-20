import React from "react";
import { makeStyles, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
}));

const Loading = (props) => {
  const classes = useStyles();

  return (
    <div className={props.flag ? classes.show : classes.hidden}>
      <div className={classes.root}>
        <LinearProgress color="secondary" />
      </div>
    </div>
  );
};

export default Loading;
