import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Loader from "./Loader";

export default function AlertPopup(props) {
  const {
    status,
    mainLable,
    containLable,
    procideHandler,
    discardHandler,
    closeHandler,
  } = props;
  let open = status ? status : false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{mainLable}</DialogTitle>
        <DialogContent>
          <DialogContentText>{containLable}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {discardHandler ? (
            <Button autoFocus onClick={discardHandler} color="primary">
              Disagree
            </Button>
          ) : null}
          {procideHandler ? (
            <Button onClick={procideHandler} color="primary" autoFocus>
              Agree
            </Button>
          ) : null}
          {!procideHandler && !discardHandler ? (
            <Button autoFocus onClick={closeHandler} color="primary">
              Ok
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function ModelPopup({ open, message, option1, option2, handelClose, onyes, loading }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handelClose}
      aria-labelledby="responsive-dialog-title"
    >
      {loading && <Loader />}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={handelClose}>
          {option1}
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => onyes()}
        >
          {option2}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
