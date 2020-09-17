import React, { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
    },
});

function Blogs() {

    useEffect(() => {
        try {
            fetch("/api/blogs")
                .then((res) => res.json())
                .then((json) => {
                  console.log('json', json);
                })
        } catch (e) {
            console.log(e);
        }
    }, []);

    const classes = useStyles();
    return (
        <>
            <h1>Blogs</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={classes.paper}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                                <Button size="small" color="primary">
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                        <br />
                    <Paper className={classes.paper}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                                <Button size="small" color="primary">
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>

                </Grid>
            </Grid>
        </>
    )
}

export default Blogs;