import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";

import BlogCard from "../../components/blogs/blog-card";

/**
 * Actions
 */
import { actions as blogActions } from '../../saga/app/blogs/index';

function BlogsList() {

    const dispatch = useDispatch();
    const { isLoading, list } = useSelector((state) => state.app.blogs);

    useEffect(() => {
        dispatch(blogActions.request());
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <b>{list.length} blogs</b>
                    {isLoading && list.length === 0 ? (
                        <CircularProgress />
                    ) : (
                        list.map((blog) => (
                            <BlogCard title={blog.title} description={blog.description} />
                        ))
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default BlogsList;