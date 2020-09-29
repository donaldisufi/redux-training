import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
// import { withRouter } from 'react-router';

import { Button } from '@material-ui/core'

function Blogs(props) {

    let history = useHistory();

    // useEffect(() => {
    //     try {
    //         fetch("/api/blogs")
    //             .then((res) => res.json())
    //             .then((json) => {
    //               console.log('json', json);
    //             })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);
    console.log("props",props);
    const blogsButtonOnClick = () => {
        history.push("/blogs");
    }
    const newBlogButtonOnClick = () => {
        props.history.push('/blogs/create');
    }
    return (
        <>
            <Button
                variant="contained"
                onClick={blogsButtonOnClick}
            >
                Blogs
            </Button>
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={newBlogButtonOnClick}
            >
                New Blog
            </Button>
        </>
    )
}

export default Blogs;