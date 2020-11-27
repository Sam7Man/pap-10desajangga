import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { truncate } from '../../Utils/Utils'
import './cardPost.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});



export const CardPost = ({ title, content, slug, image }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={`/uploads/${image}`}
                />
                <CardContent>
                    <Typography gutterBottom component="h5">
                        {title}
                    </Typography>
                    <Typography paragraph={true} color="textSecondary" component="p">
                        {truncate(content, 100)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to={`/article/${slug}`}>Read More</Link>
            </CardActions>
        </Card>
    )
}

export default CardPost

