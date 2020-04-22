import {FETCH_CURRENTUSER_PENDING, 
    FETCH_CURRENTUSER_SUCCESS, 
    FETCH_CURRENTUSER_ERROR} from '../../_actions/current-user/current-user-actions';


const initialState = {
    pending: false,
    user: null,
    error: null
}

export function currentUserReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_CURRENTUSER_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_CURRENTUSER_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.payload
            }
        case FETCH_CURRENTUSER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getCurrentUser = state => state.user;
export const getCurrentUserPending = state => state.pending;
export const getCurrentUserError = state => state.error;