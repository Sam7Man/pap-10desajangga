import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from '../../../component/Sidebar/Sidebar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { useForm } from '../../../Utils/Utils';
import { connect } from 'react-redux';
import { storeArticle } from '../../../redux/action';
import { getDataUser } from '../../../redux/reducer/loginReducer';

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
    button: {
        margin: theme.spacing(1),
    }
}));

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}

const format = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

function CreateArticle({ storeArticle }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [image, setImage] = useState();

    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        title: '',
    });

    function createPostCallback() {
        PostArticle();
    }

    const onChangeHandle = (e) => {
        setText(e);
    }
    const onChangeFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        console.log(files[0]);
        setImage(files[0])
    }

    const PostArticle = async () => {
        var formdata = new FormData();
        formdata.append('image', image);
        formdata.append('title', values.title);
        formdata.append('content', text);
        const res = await storeArticle(formdata).catch(err => err)
        if (res) {
            console.log(res)
        }
    }
    return (
        <div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className="heading-page">TAMBAH ARTIKEL</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <form onSubmit={onSubmit} encType="multipart/form-data">
                            <Paper className={classes.paper}>
                                <TextField
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    name="title"
                                    onChange={onChange}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Outlined"
                                    variant="outlined"
                                    name="image"
                                    onChange={onChange}
                                />
                                <Button
                                    style={{ marginTop: '20px' }}
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={onChangeFile}
                                        hidden
                                    />
                                </Button>
                                <ReactQuill
                                    style={{ marginTop: '20px' }}
                                    theme="snow"
                                    modules={modules}
                                    formats={format}
                                    value={text}
                                    onChange={(e) => onChangeHandle(e)}
                                />
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    onClick={PostArticle}
                                    onSubmit={onSubmit}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Tambah Article
                                </Button>
                            </Paper>
                        </form>

                        <div dangerouslySetInnerHTML={{ __html: text }} />
                    </Grid>
                </Grid>
            </main>
        </div >
    )
}
const reduxState = (state) => ({
    isLoading: state.comment.isLoading,

})

const reduxDispatch = (dispatch) => ({
    storeArticle: (data) => dispatch(storeArticle(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(CreateArticle));
