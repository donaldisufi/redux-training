import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withAuthorization = WrappedComponent => {
    const Auth = (props) => {
        // const { loggedIn } = useSelector((state) => state.app.auth);
        const loggedIn = false;
        return loggedIn
            ? <WrappedComponent {...props} />
            : <Redirect to="/auth/login" />;
    };
    return Auth;
};
export default withAuthorization;
