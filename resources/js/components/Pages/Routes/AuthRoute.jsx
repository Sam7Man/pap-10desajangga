import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function AuthRoute({ component: Component, ...rest }) {
    const user = JSON.parse(localStorage.getItem('users'));

    return (
        <Route
            {...rest}
            render={props => user.isLoggedIn ?
                <Redirect to="/dashboard" /> : <Component {...props} />
            }
        >

        </Route>
        // <h1>ASDNAMS</h1>
    )
}

export default AuthRoute;
