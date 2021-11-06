import React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
function ProtectedRoute({component: Component, ...props}) {
    const authContext = React.useContext(AuthContext);
    if (!authContext) {
        return <Redirect to="/sign-up"></Redirect>
    }
    return <Component {...props} />
}
export default ProtectedRoute