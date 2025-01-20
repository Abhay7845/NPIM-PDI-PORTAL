import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    margin: "0%",
    padding: "0%",
  },
  imgShow: {
    margin: "4%",
  },
  productInfo: {
    marginTop: "3%",
    height: "64vh",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
  haddingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    letterSpacing: "2px",
  },
  innerHightCss: {
    minHeight: "80vh",
  },
  headingColor: {
    backgroundColor: "#832729",
    fontWeight: "bolder",
    color: "#ffff",
  },
  btnSub: {
    fontWeight: 500,
    fontSize: "14px",
    letterSpacing: "2px",
    padding: "5px",
    backgroundColor: "#832729",
    color: "#ffff",
  },
});

export default useStyle;
