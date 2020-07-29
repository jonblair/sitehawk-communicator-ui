import {fetchCurrentUserPending, 
    fetchCurrentUserSuccess, 
    fetchCurrentUserError } from '../_redux/_actions/current-user/current-user-actions';
    
export default class UserService {

    getCurrentUser(userId) {
        await fetch(`/api/v1/User/${userId}`, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        });
    }


}