export const FETCH_CURRENTUSER_PENDING = 'FETCH_CURRENTUSER_PENDING';
export const FETCH_CURRENTUSER_SUCCESS = 'FETCH_CURRENTUSER_SUCCESS';
export const FETCH_CURRENTUSER_ERROR = 'FETCH_CURRENTUSER_ERROR';

function fetchCurrentUserPending() {
    return {
        type: FETCH_CURRENTUSER_ERROR
    }
}

function fetchCurrentUserSuccess(user) {
    return {
        type: FETCH_CURRENTUSER_SUCCESS,
        user: user
    }
}

function fetchCurrentUserError(error) {
    return {
        type: FETCH_CURRENTUSER_ERROR,
        error: error
    }
}