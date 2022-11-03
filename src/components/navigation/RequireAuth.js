import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { RoutesType } from "../../firebase/types";

function RequireAuth({ children }) {
  const location = useLocation();
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return (
      <Navigate
        to={`/${RoutesType.AUTHENTICATE}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;
