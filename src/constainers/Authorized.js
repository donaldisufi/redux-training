import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authorized = ({
                        children
                    }) => {
    const {
        auth: {
            index: {
                isLoggedIn
            }
        }
    } = useSelector((state) => state.app);

    if (!isLoggedIn) {
        return <Redirect to="/auth/login" />;
    }

    return children;
};

export default Authorized;
