import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PropTypes from 'prop-types';
import BlogCard from "../components/blogs/blog-card";

const MainListItems = (props) => {
    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Blogs" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Logout" onClick={props.logoutOnClick}/>
            </ListItem>
        </div>
    )
};
MainListItems.propTypes = {
    logoutOnClick: PropTypes.func.isRequired,
}

export default MainListItems;