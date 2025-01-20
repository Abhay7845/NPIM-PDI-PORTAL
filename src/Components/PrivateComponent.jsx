import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  return (
    <div>
      {sessionStorage.getItem("store_code") ? (
        <Outlet />
      ) : (
        <Navigate to="/NpimPortal" />
      )}
    </div>
  );
};

export default PrivateComponent;
