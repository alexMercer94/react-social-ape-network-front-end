import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Don't let user access if User's token hasn't expired
 * @param {*} param0
 */
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={props => (authenticated === true ? <Redirect to="/" /> : <Component {...props} />)} />
);

export default AuthRoute;
