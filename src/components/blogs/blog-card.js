import React from "react";
import PropTypes from 'prop-types';

/*
    UI COMPONENTS
 */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
    },
});

function BlogCard(props) {
    const classes = useStyles();
    const { id, title, description,editButtonClick } = props;
    return (
        <>
            <Paper className={classes.paper}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => editButtonClick({id})}>
                            Edit
                        </Button>
                        <Button size="small" color="primary" onClick={() => { props.deleteButtonOnClick(id); }}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
            <br />
        </>
    )
}

BlogCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deleteButtonOnClick: PropTypes.func.isRequired,
    editButtonClick:PropTypes.func.isRequired
}

export default BlogCard;