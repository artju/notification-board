import axios from "axios";
import URL_DEV from "../constants"

export function fetchNotifications() {
    return (dispatch) => {
        dispatch({ type: "FETCH_NOTIFICATIONS" });
        axios.get(URL_DEV + '/notifications')
        .then((response) => {
        dispatch({type: "FETCH_NOTIFICATIONS_FULFILLED", payload: response.data})})
        .catch((err) => {
            dispatch({type: "FETCH_NOTIFICATIONS_REJECTED", payload: err})
        })
}}

export function fetchNotification(id) {
    return (dispatch) => {
        dispatch({ type: "FETCH_NOTIFICATION" });
        axios.get(URL_DEV + '/notifications/' + id)
        .then(response => {
            dispatch({ type: "FETCH_NOTIFICATION_FULFILLED", payload: response.data})})
            .catch(err => {
                dispatch({ type: "FETCH_NOTIFICATION_REJECTED", payload: err})
            })
    }
}

export function addNotification(notification) {
    return (dispatch, getState) => {
        const user = getState().user;
        notification.userId = user.id;
        notification.token = user.token;
        dispatch({ type: "ADD_NOTFICATION"});
        axios.post(URL_DEV + '/notifications', notification)
        .then(response => {
            dispatch({ type: "ADD_NOTIFICATION_FULFILLED", payload: response.data})
        }).catch(err => {
            dispatch({ type: "ADD_NOTIFICATION_REJECTED", payload: err})
        });
    }
}

export function addResponse(response) {
    return (dispatch, getState) => {
        dispatch({ type: "ADD_RESPONSE" });
        const user = getState().user;
        const notifId = getState().selectedNotification.id;
        response.userId = user.id;
        response.token = user.token;
        axios.post(URL_DEV + '/notifications/' + notifId, response).then(response => {
            dispatch({ type: "ADD_RESPONSE_FULFILLED", payload: response.data });
        }).catch(err => {
            dispatch({ type: "ADD_RESPONSE_REJECTED", payload: err});
        });
    }
}

export function logIn(user) {
    return (dispatch) => {
        dispatch({ type: "LOG_IN" });
        axios.post(URL_DEV + '/login', user)
        .then(response => {
            localStorage.setItem("user", response.data.user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            dispatch({ type: "LOG_IN_FULFILLED", payload: response.data})
        }).catch((err) => {
                dispatch({ type: "LOG_IN_REJECTED", payload: err.response.data})
        })
    }
}

export function loadUser() {
    return (dispatch) => {
        dispatch({ type: "LOAD_USER" });
        let token = localStorage.getItem("token");
        if (token) {
            axios.post(URL_DEV + '/authenticate', {token: token}).then(response => {
                let user = localStorage.getItem("user");
                let id = localStorage.getItem("id");
                let userObj = {user: user, token: token, id: id};
                dispatch({ type: "LOAD_USER_FULFILLED", payload: userObj });
            }).catch(err => {
                dispatch({ type: "LOAD_USER_REJECTED", payload: err});
            })

        }
    }
}

export function logout() {
    return (dispatch, getState) => {
        dispatch({ type: "LOG_OUT" });
        let user = getState().user;
        axios.post(URL_DEV + '/logout', user).then(response => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            dispatch({ type: "LOG_OUT_FULFILLED", payload: null});
        }).catch(err => {
            dispatch({ type: "LOG_OUT_REJECTED", payload: err});
        })
    }
}

export function register(user) {
    return (dispatch) => {
        dispatch({ type: "REGISTER" });
        axios.post(URL_DEV + '/register', user)
        .then(response => {
            dispatch({ type: "REGISTER_FULFILLED", payload: response.data})
        }).catch(err => {
            dispatch({ type: "REGISTER_REJECTED", payload: err.response.data})
        })
    }
}

