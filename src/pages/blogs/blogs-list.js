import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";

import BlogCard from "../../components/blogs/blog-card";

/**
 * Actions
 */
import { actions as blogActions } from '../../saga/app/blogs/index';
import { actions as blogRemoveActions, getIsLoading, getModalVisibility, getRemoveId } from '../../saga/app/blogs/remove';
import {actions as blogEditActions} from '../../saga/app/blogs/edit';

/**
 * Selectors
 */
import {getEditModalVisibility,getErrorEditing,getIsLoadingEdit} from '../../saga/app/blogs/edit';

import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import NotFound from "../../components/common/NotFound";
import {getHasMore, getPage} from "../../saga/app/blogs";

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function BlogsList(props) {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const dispatch = useDispatch();
    const { isLoading, list, error } = useSelector((state) => state.app.blogs.list);
    const removeBlogConfirmationModalVisible = useSelector(getModalVisibility);
    const removeBlogId = useSelector(getRemoveId);
    const removeInProgress = useSelector(getIsLoading);


    const page = useSelector(getPage);
    const hasMoreResults = useSelector(getHasMore);

    useEffect(() => {
        dispatch({ type: '@app/blogs/index/REQUEST' });
        //
    }, []);

    const handleDeleteButtonClick = (id) => {
        dispatch(blogRemoveActions.toggleModalVisibility());
        dispatch(blogRemoveActions.setRemoveId(id));
    }

    const handleCloseDeleteConfirmationModal = () => {
        dispatch(blogRemoveActions.toggleModalVisibility());
        dispatch(blogRemoveActions.setRemoveId(null));
    }

    const yesButtonOnClick = () => {
        dispatch(blogRemoveActions.request(removeBlogId))
    }
    const goBackButtonOnClick = () => {
        props.history.push('/')
    }

    const handleLoadMoreButtonClick = () => {
        dispatch(blogActions.requestPage(page + 1))
        // console.log(blogActions.requestPage(page + 1))
        // {type: "@app/blogs/index/REQUEST_PAGE", currentPage: 2}
    }

    const editButtonClick = id => {
        dispatch(blogEditActions.toggleModalVisibility());
        dispatch(blogEditActions.setBlogId(id));
    }
    
    return (
        <>
            <Button
                variant="contained"
                onClick={goBackButtonOnClick}
            >
                Go back
            </Button>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <b>{list.length} blogs</b>
                    {isLoading && list.length === 0 ? (
                        <CircularProgress />
                    ) : (
                            list.length > 0
                                ?
                                (list.map((blog) => (
                                    <BlogCard
                                        key={blog.id}
                                        {...blog}
                                        editButtonClick={editButtonClick}
                                        deleteButtonOnClick={handleDeleteButtonClick}
                                    />
                                ))) :
                                error ?
                                    (<p>error</p>)
                                    :
                                    (<NotFound />)
                        )}
                       
                    {hasMoreResults && <Button
                        variant="contained"
                        onClick={handleLoadMoreButtonClick}
                    >
                        Load more
                    </Button>}
                </Grid>
            </Grid>
            <Modal
                open={removeBlogConfirmationModalVisible}
                onClose={handleCloseDeleteConfirmationModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">Confirm</h2>
                        <p id="simple-modal-description">
                            Are you sure you want to delete this blog item?
                        </p>
                        <Button size="small" color="primary" onClick={handleCloseDeleteConfirmationModal}>
                            Cancel
                        </Button>
                        <Button size="small" color="secondary" onClick={yesButtonOnClick}>
                            Yes
                        </Button>
                        {removeInProgress && <b>Removing...</b>}
                    </div>
                </>
            </Modal>
            {/* <Modal
                open={removeBlogConfirmationModalVisible}
                onClose={handleCloseDeleteConfirmationModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">Confirm</h2>
                        <p id="simple-modal-description">
                            Are you sure you want to delete this blog item?
                        </p>
                        <Button size="small" color="primary" onClick={handleCloseDeleteConfirmationModal}>
                            Cancel
                        </Button>
                        <Button size="small" color="secondary" onClick={yesButtonOnClick}>
                            Yes
                        </Button>
                        {removeInProgress && <b>Removing...</b>}
                    </div>
                </>
            </Modal> */}
        </>
    )
}

export default BlogsList;