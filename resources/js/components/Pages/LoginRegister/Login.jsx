import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import {
    connect
} from 'react-redux';
import { useForm } from '../../Utils/Utils';
import { loginUserAPI } from '../../redux/action';
function Login(props) {
    let arr = [];

    const [errorValid, setErrorValid] = useState([]);
    const { history } = props;
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    function loginUserCallback() {
        userSignIn();
    }

    const userSignIn = async () => {
        const res = await props.loginAPI(
            values
        ).catch(err => err)
        if(res.user){
            location.reload();
        }
        res ? (setErrorValid(res)) : setErrorValid([]);
    }

    
    useEffect(() => {
        const AuthProvided = () => {
            console.log(props.isLoading)
            const { prevLocation } = { prevLocation: { pathname: `/dashboard` } };
            if (prevLocation && props.isLoading) {
                history.push(prevLocation);
            }
        }
        AuthProvided();
    }, [])

    if (errorValid.errorMessage) {
        let errorMessage = errorValid.errorMessage;
        Object.values(errorMessage).forEach((value) => (
            arr.push(value)
        ));
    }

    return (
        <div className="login">
            <div className="content-login">
                <div className="title-login">
                    <h1 className="head-title-login">DESA  <br />JANGGA DOLOK</h1>
                    <p className="content-title-login">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint tenetur, tempora
                    pariatur repudiandae, ullam ipsum aspernatur culpa in consequuntur itaque quo? Mollitia
                    fugiat quidem quod corporis blanditiis. Rem, dolor quod? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint tenetur, tempora
                       pariatur repudiandae</p>
                    <Link to="/">
                        <button>BACK TO HOME</button>
                    </Link>
                </div>
                <div className="box__form">
                    <div className="form">
                        <h3>LOGIN</h3>
                        <div className="form-group-login">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="login-input-form"
                                name="email"
                                value={values.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group-login">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="login-input-form"
                                name="password"
                                value={values.password}
                                onChange={onChange}
                            />
                        </div>
                        {
                            errorValid.errorMessage ? (
                                <div className="error-message">
                                    {
                                        arr.map((error, id) => (
                                            <li key={id}>{error}</li>
                                        ))
                                    }
                                </div>
                            ) : ('')
                        }
                        {
                            errorValid.error && errorValid.errorMessage === undefined ? (
                                <div className="error-message">
                                    <li>{errorValid.error}</li>
                                </div>
                            ) : ('')
                        }
                        <button
                            className="button-login"
                            onClick={userSignIn}
                            onSubmit={onSubmit}
                        >SIGN IN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const reduxState = (state) => ({
    isLoading: state.reducers.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data)),
})

export default connect(reduxState, reduxDispatch)(withRouter(Login));

