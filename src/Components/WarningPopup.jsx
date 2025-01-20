import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function WarningPopup(props) {
  const { flag, reportLink, headerSms, subSms } = props;
  const navigate = useNavigate();
  const handleClose = () => navigate("/");
  const goHandler = () => navigate(reportLink);

  return (
    <Dialog
      open={flag}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{headerSms}</DialogTitle>
      {subSms && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {subSms}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Go to login
        </Button>
        <Button onClick={goHandler} color="primary" autoFocus>
          Go TO Report
        </Button>
      </DialogActions>
    </Dialog>
  );
}
