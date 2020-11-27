import axios from 'axios';
import {
    setArticle,
    setLoading
} from '../reducer/articleReducer';
import {
    setComment,
} from '../reducer/commentReducer';
import {
    getDataUser,
    setUser
} from '../reducer/loginReducer';

import { setLoading as Loading } from '../reducer/LoadingReducer';


export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.post("/api/v1/auth/login", data).then(response => {
            return response;
        }).then(json => {
            if (json.data) {
                let appState = {
                    isLoggedIn: true,
                    user: json.data.user,
                    expires_token: json.data.expires_at,
                    access_token: json.data.access_token,
                    token_type: json.data.token_type
                };
                dispatch(setUser({
                    user: appState
                }))
                dispatch({
                    type: 'CHANGE_LOADING',
                    value: true
                })
                localStorage.setItem('users', JSON.stringify(appState));
                resolve(appState);
            } else {
                alert(`Our System Failed To Register Your Account!`);
            }
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            } else if (error.request) {
                let err = error.request;
                const errors = {
                    error: err,
                    formSubmitting: false
                }
                reject(errors);
            } else {
                let err = error.message;
                const errors = {
                    error: err,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}

export const getArticle = () => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.get("/api/v1/auth/article").then(response => {
            return response;
        }).then(json => {
            dispatch(setArticle({
                article: {
                    data: json.data
                }
            }))
            dispatch(Loading({
                isLoading: false
            }))
            resolve(json);
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}

export const getSingleArticle = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.get(`/api/v1/auth/article/${data}`).then(response => {
            return response;
        }).then(json => {
            dispatch(setArticle({
                article: {
                    data: json.data
                }
            }))
            dispatch(Loading({
                isLoading: false
            }))
            resolve(json);
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}

export const postComment = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.post(`/api/v1/auth/comment`, data).then(response => {
            return response;
        }).then(json => {
            dispatch(setComment({
                comment: {
                    data: json.data
                }
            }))
            dispatch(setLoading({
                isLoading: false
            }))
            resolve(json);
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}


export const searchArticle = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.post("/api/v1/admin/searcharticle", {
            'search' : data.search
        }, {
            headers: {
                'Authorization': `Bearer ${data.authorization}`
            }
        }).then(response => {
            return response;
        }).then(json => {
            if (json.data) {
                dispatch(setArticle({
                    article: {
                        data: json.data
                    }
                }))
                dispatch(Loading({
                    isLoading : false
                }))
                resolve(json.data);
            }
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}
export const storeArticle = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        const users = dispatch(getDataUser());
        axios.post("/api/v1/admin/article/store", data, {
            headers: {
                'Authorization': `Bearer ${users.access_token}`,
                'Content-Type': 'multipart/form-data' 
            }
        }).then(response => {
            return response;
        }).then(json => {
            if (json.data) {
                // dispatch(setArticle({
                //     article: {
                //         data: json.data
                //     }
                // }))
                dispatch(Loading({
                    isLoading : false
                }))
                resolve(json.data);
            }
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}
