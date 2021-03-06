/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_USER, REMOVE_USER, UPDATE_USER } from '../ActionTypes';
import { parseRESTResponse, handleRESTErrors} from '../../Utils/RESTHelpers';
import { ServerURL } from '../../Config';

export function addUser(user) {
    return {
        type: ADD_USER,
        user: user
    }
}

export function removeUser(id) {
    return {
        type: REMOVE_USER,
        id
    }
}

export function updateUser(updatedEntity) {
    return {
        type: UPDATE_USER,
        updatedEntity
    }
}

export function createUser(user) {

    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/users`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                    dispatch(addUser(json));
                    return json;
                }
            )
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}

export function remoteGetUsers() {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/users`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState();

                for (let i = 0; i < json.length; i++) {
                    if (state[json[i].Id] === undefined)
                        dispatch(addUser(json[i]));
                    else
                        dispatch(updateUser(json[i]));
                }
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    };
}