import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AuthGuardedRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);

    useEffect(() => {
        isAuthenticated === false && navigate("/login");
    }, [isAuthenticated]);

    return isAuthenticated === false ? <Outlet /> : <Element {...rest} />;
};

export default AuthGuardedRoute;
