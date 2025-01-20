import { makeStyles } from "@material-ui/core";
import BackgroundAttachment from "../images/LoginBg.png";

const useStyles = makeStyles({
  root: {
    width: "100wh",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(" + BackgroundAttachment + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },

  containerStyle: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },

  submitBtn: {
    width: "100%",
    backgroundColor: "#ffd54f",
  },
});

export default useStyles;
