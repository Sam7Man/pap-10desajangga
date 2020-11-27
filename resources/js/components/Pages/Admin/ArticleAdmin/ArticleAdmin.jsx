import { Fab, Grid, Paper, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react'
import Sidebar from '../../../component/Sidebar/Sidebar'
import './articleAdmin.css'
import Search from '../../../component/Search/Search';
import AddIcon from '@material-ui/icons/Add';
import { connect, useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/reducer/LoadingReducer';
import { getArticle } from '../../../redux/action';
import CardPost from '../../../component/CardPost/CardPost';
import Loading from '../../../component/Loading/Loading';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Poppins',
        fontWeight: theme.typography.fontWeightBold
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        fontFamily: 'Poppins',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        fontFamily: 'Poppins',
        position: 'relative',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
    grid: {
        flexGrow: 1,
        marginTop: '50px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function ArticleAdmin({ loading, getArticles, article }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            dispatch(setLoading({
                isLoading: true
            }))
            console.log(loading);
            const res = await getArticles().catch(err => console.log(err))
            if (res) {
                console.log(res.data)
            }
        };
        fetchData();
    }, [])

    return (
        <div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className="heading-page">DAFTAR ARTIKEL</h1>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Search />
                    </Grid>
                </Grid>
                <div className={classes.grid}>
                    {
                        loading ? (
                            <Loading />
                        ) : (
                                <Grid container spacing={3}>
                                    {
                                        article && article.data.map((item, key) => (
                                            <Grid item xs={3} key={key}>
                                                <CardPost title={item.title} content={item.content} slug={item.slug} image={item.image} />
                                            </Grid>
                                        ))
                                    }
                                    {
                                        article && article.data.map((item, key) => (
                                            <Grid item xs={3} key={key}>
                                                <CardPost title={item.title} content={item.content} slug={item.slug} image={item.image} />
                                            </Grid>
                                        ))
                                    }
                                    {
                                        article && article.data.map((item, key) => (
                                            <Grid item xs={3} key={key}>
                                                <CardPost title={item.title} content={item.content} slug={item.slug} image={item.image} />
                                            </Grid>
                                        ))
                                    }


                                </Grid>
                            )
                    }
                </div>
            </main>
            <Link to='/dashboard/create'>
                <Tooltip title="Tambah Artikel" aria-label="add">
                    <Fab color="primary" aria-label="add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Link>
        </div >
    )
}

const reduxState = (state) => ({
    loading: state.loading.isLoading,
    article: state.article.article
})

const reduxDispatch = (dispatch) => ({
    getArticles: () => dispatch(getArticle())
})

export default connect(reduxState, reduxDispatch)(ArticleAdmin);
