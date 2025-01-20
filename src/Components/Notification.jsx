import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Error = (title) => {
  toast.error(title, {
    position: toast.POSITION.TOP_CENTER,
    transition: Bounce,
    autoClose: 3000,
    pauseOnHover: false,
  });
};
export default Error;
