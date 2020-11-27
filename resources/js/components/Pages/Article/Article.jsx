import { Container, makeStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React from 'react'
import './article.css';
import { useEffect } from 'react';
import {
    connect
} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getArticle } from '../../redux/action';
import { store } from '../../redux/store/store';
import Loading from '../../component/Loading/Loading';
import { useState } from 'react';
import { truncate } from '../../Utils/Utils';
import moment from 'moment';
import { setLoading } from '../../redux/reducer/LoadingReducer';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));

function Article({ isLoading, getArticles }) {
    const classes = useStyles();
    const [article, setArticle] = useState([]);

    useEffect(() => {
        async function fetchData() {
            store.dispatch(setLoading({
                isLoading: true
            }))
            const res = await getArticles().catch(err => console.log(err))
            if(res){
                setArticle(res.data)
            }
        };
        fetchData();
    }, [])

    return isLoading ? (
        <div className="article" style={{ minHeight: '300vh', marginTop: '15vh' }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Loading />
                    </Grid>
                </Grid>
            </Container>
        </div>
    ) : (
            <div className="article" style={{ minHeight: '100vh', marginTop: '15vh' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid container spacing={3} className="grid-example">
                            <Grid item xs={12}>
                                <h2>ARTIKEL</h2>
                            </Grid>
                            {article && article.map((item, key) => (
                                <Grid item xs={11} sm={3} key={key}>
                                    <Paper className={classes.paper}>
                                        <div className="body__article">
                                            <h5>{item.title}</h5>
                                            <p>{moment(item.created_at).format('MMMM Do YYYY')}</p>
                                            <p>{truncate(item.content, 120)}</p>
                                            <Link to={`/article/${item.slug}`}>Read More</Link>
                                        </div>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
    getArticles: () => dispatch(getArticle()),
})

export default connect(reduxState, reduxDispatch)(withRouter(Article));

