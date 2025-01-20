import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  drop_multi: {
    width: "100%",
    minWidth: "100%",
    marginTop: "7px",
  },
  inputField: {
    width: "100%",
    marginTop: "5px",
    outline: "none",
    padding: "5px",
    marginLeft: "-6%"
  },
  inputArea: {
    display: "none",
  },
  formControl: {
    minWidth: "100%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #484850",
      borderRadius: "5px 5px 0 0",
    },
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
    width: "100%",
    margin: "1px",
    marginLeft: "20px",
  },
  showDropdown: {
    display: "block",
  },
  header: {
    backgroundColor: "red",
  },
  report: {
    width: "100%",
    margin: "0%",
    padding: "0%",
  },
  haddingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
  hadding: {
    fontWeight: 500,
    fontSize: "18px",
    fontStretch: "normal",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "1px",
    textAlign: "left",
  },
  rowData: {
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "left",
  },
});

export default useStyles;
