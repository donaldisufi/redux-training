import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { actions as addBlogActions } from '../../saga/app/blogs/add';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";

const schema = yup.object().shape({
    title: yup.string().max(30).required().label('Title'),
    description: yup.string().required().label('Description'),
});

function BlogCreate(props) {

    const { register, handleSubmit, errors, control, reset  } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { isSubmitting, formStatus } = useSelector((state) => state.app.blogs.add);
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(addBlogActions.request(data));
    };

    useEffect(() => {
        if (formStatus && formStatus.success) {
          reset({});
          dispatch(addBlogActions.setFormStatus(null));
          props.history.push('/blogs')
        }
    }, [formStatus])

    return (
        <>
            <h1>Blog Create</h1>
            <div>
                <Typography variant="h6" gutterBottom>
                   Create new blog
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                required
                                id="title"
                                name="title"
                                label="Blog Title"
                                fullWidth
                                inputRef={register}
                            />
                            {errors.title && errors.title.message}
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Description"
                                fullWidth
                                inputRef={register}
                            />
                            {errors.description && errors.description.message}
                            <input type="submit" disabled={isSubmitting}/>
                        </form>
                    </Grid>

                </Grid>
                <DevTool control={control} />
            </div>
        </>
    )
}

export default BlogCreate;