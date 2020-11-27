import React, { useEffect, useState } from 'react';
import './information.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { myPost } from '../../Utils/Utils';
import { truncate } from '../../Utils/Utils';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 550,
        width: 350,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
function Information({ data, title }) {
    const classes = useStyles();
    const [postNews, setPostNews] = useState([]);

    let sliceNumber = Math.floor(Math.random() * 3)

    
    useEffect(() => {
        // async function fetchData() {
        //     await fetch('http://newsapi.org/v2/everything?q=bitcoin&from=2020-10-12&sortBy=publishedAt&apiKey=dc4f9c8746754635b86580b6f4215534')
        //         .then(res => { 
        //             return res.json();
        //         })
        //         .then(data => {
        //             setPostNews(data.articles);
        //         })
        //         .catch(err => console.log(err))
        // }

        // fetchData();
        setPostNews(myPost.articles);
    }, [])


    return (
        <>
            <Grid item xs={12} key={1}>
                <Paper className="heading-card">INFORMASI DAN BERITA</Paper>
            </Grid>
            <Grid container key={2} wrap='wrap' className={classes.root} spacing={2} style={{ marginTop: 20 }}>
                <Grid item xl={12}>
                    <Grid container wrap='wrap' justify="center" spacing={3}>
                        {postNews && postNews.slice(0, 3).map((value, index) => (
                            <Grid key={index} item>
                                <Paper className={classes.paper}>
                                    <div className="image-card">
                                        <img
                                            src={value.urlToImage ? value.urlToImage : 'https://i.postimg.cc/N0dQGq7y/Logo-White.png'}
                                            alt=''
                                        />
                                    </div>
                                    <div className="content-card image-card-content">
                                        <p className="title-text">{value.title}</p>
                                        <p className="content-text">{moment(value.publishedAt).fromNow()}<br/><br/>{truncate(value.description, 150)}</p>
                                        <Button className="button-card">
                                            Read More
                                        </Button>
                                    </div>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Information;
