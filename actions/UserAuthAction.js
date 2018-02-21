import { FETCHING_USER, FETCHING_USER_SUCCESS, FETCHING_USER_FAILURE, FETCHING_CURRENT_USER_FAILURE, REGISTERING_USER_FAILURE } from '../constants'
import { api } from '../config';
import axios from 'axios';

export function fetchUserFromAPI(email, password) {
    return (dispatch) => {
        dispatch(getUser())

        let payload = {
            email: email,
            password: password
        };

        let headers = {
            'Content-Type': 'application/json',
        };

        axios.post(api.authenticateUser, payload, headers)
            .then(function (response) {
                // console.log("response", response);

                if (response.status == 200) {
                    const data = response.data;
                    if (data.roles.length === 0) {
                        dispatch(registerUserFailure('Error in fetching role!'))
                    } else {
                        localStorage.setItem('edJwtToken', data.token);
                        dispatch(getUserSuccess(data.user, data.roles[0]))
                    }
                }
                else {
                    dispatch(registerUserFailure('Internal Server Problem! Try later'));
                }
            })
            .catch(function (error) {
                console.log("error", error);
                dispatch(registerUserFailure('Wrong username/password'));
            });

        // dispatch(getUserSuccess(data));
    }
}
export function getCurrentUserFromApi() {
    return (dispatch) => {
        dispatch(getUser())

        const authStr =  'bearer ' + localStorage.getItem('edJwtToken');

        axios.get(api.currentUser, { headers: { Authorization: authStr } })
            .then(function (response) {
                // console.log("response", response);

                if (response.status == 200) {
                    const data = response.data;
                    if (data.roles.length === 0) {
                        dispatch(registerUserFailure('Error in fetching role!'))
                    } else {
                        dispatch(getUserSuccess(data.user, data.roles[0]))
                    }
                }
                else {
                    dispatch(registerUserFailure('Internal Server Problem! Try later'));
                }
            })
            .catch(function (error) {
                console.log("error", error);
                dispatch(registerUserFailure('Wrong username/password'));
            });

        // dispatch(getUserSuccess(data));
    }
}

export function forgotPassword(email) {
    return (dispatch) => {
        dispatch(getUser())
    }
}

export function getUser() {
    return {
        type: FETCHING_USER
    }
}

export function getUserSuccess(user, role) {
    return {
        type: FETCHING_USER_SUCCESS,
        user,
        role
    }
}

export function registerUserFailure() {
    return {
        type: REGISTERING_USER_FAILURE,
        message: 'Login failed!'
    }
}

export function getCurrentUserFailure(err, msg) {
    return {
        type: FETCHING_USER_FAILURE,
        message: msg
    }
}