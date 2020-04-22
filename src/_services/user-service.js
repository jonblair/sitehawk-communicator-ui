import {fetchCurrentUserPending, 
    fetchCurrentUserSuccess, 
    fetchCurrentUserError } from '../_redux/_actions/current-user/current-user-actions';

export default class UserService {
    getCurrentUser() {
        return dispatch => {
            dispatch(fetchCurrentUserPending());
            await fetch(`/api/v1/User/${userId}`, {
                method: 'GET',
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                dispatch(fetchCurrentUserSuccess(data));

                return data;
            })
            .catch(error => {
                dispatch(fetchCurrentUserError(error));
            })
        }
    }
}