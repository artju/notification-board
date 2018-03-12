export default function reducer(state={
    user: null,
    notifications: [],
    selectedNotification: null,
    responses: [],
    loading: false,
    error: null,
    loginError: null,
    registerFeedback: null,
}, action) {
    switch (action.type) {
        case "FETCH_NOTIFICATIONS": {
            return {...state, loading: true}
        }
        case "FETCH_NOTIFICATIONS_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "FETCH_NOTIFICATIONS_FULFILLED": {
            return {...state, notifications: action.payload, loading: false,}
        }
        case "FETCH_NOTIFICATION": {
            return {...state, loading: true}
        }
        case "FETCH_NOTIFICATION_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "FETCH_NOTIFICATION_FULFILLED": {
            return {...state, selectedNotification: action.payload, responses: action.payload.responses, loading: false,}
        }
        case "ADD_NOTIFICATION": {
            return {...state, loading: true}
        }
        case "ADD_NOTIFICATION_FULFILLED": {
            return {...state,  notifications: [...state.notifications, action.payload], loading: false}
        }
        case "ADD_NOTIFICATION_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "LOG_IN_FULFILLED": {
            return {...state, user: action.payload, loading: false}
        }
        case "LOG_IN": {
            return {...state, loading: true}
        }
        case "LOG_IN_REJECTED": {
            return {...state, loginError: action.payload, loading: false}
        }
        case "LOG_OUT": {
            return {...state, loading: true}
        }
        case "LOG_OUT_FULFILLED": {
            return {...state, user: action.payload, loading: false}
        }
        case "LOG_OUT_REJECTED": {
            return {...state, error: action.payload, loading: false}
        }
        case "LOAD_USER": {
            return {...state, loading: true}
        }
        case "LOAD_USER_FULFILLED": {
            return {...state, loading: false, user: action.payload}
        }
        case "LOAD_USER_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "ADD_RESPONSE": {
            return {...state, loading: true}
        }
        case "ADD_RESPONSE_FULFILLED": { 
            return {...state, loading: false, responses: [...state.responses, action.payload]}
        }
        case "ADD_RESPONSE_REJECTED": {
            return {...state, loading: false, error: action.payload}
        }
        case "REGISTER_FULFILLED": {
            return {...state, registerFeedback: action.payload, loading: false}
        }
        case "REGISTER": {
            return {...state, loading: true}
        }
        case "REGISTER_REJECTED": {
            return {...state, registerFeedback: action.payload, loading: false}
        }
        default: return state;
    }
}