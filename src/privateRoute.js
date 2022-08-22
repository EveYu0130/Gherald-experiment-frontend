import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useAuth} from "./auth";


const PrivateRoute = ({component: Component, ...rest}) => {
    let auth = useAuth();
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest}
            render={({ location }) => (
                auth.user ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}/>
                )
            )}
        />
    );
};

export default PrivateRoute;