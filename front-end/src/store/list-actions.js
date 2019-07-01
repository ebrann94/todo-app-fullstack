import { handleResponse } from './utils.js';

export const addList = (newList) => {
    return {
        type: 'ADD_LIST',
        newList: {
            ...newList,
            tasks: []
        }
    }
};

export const startAddList = () => dispatch => {
        fetch('/api/lists/add-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(handleResponse)
            .then(res => {
                dispatch(addList());
            })
            .catch(e => {

            })

};

export const deleteList = (listId) => {
    return {
        type: 'DELETE_LIST',
        listId
    }
};

export const startDeleteList = listId => dispatch => {
    fetch('/api/lists', {
        method: 'DELETE',
        headers: {

        },
        body: JSON.stringify(listId)
    })
        .then(handleResponse)
        .then(res => {
            dispatch(deleteList())
        })
        .catch(e => {

        })
};

export const editList = (listId, changes) => {
    return {
        type: 'EDIT_LIST',
        listId,
    }
};

export const startEditList = (listId, edits) => {
    const body = {};

    return dispatch => {
        fetch('/api/lists', {
            method: 'PUT',
            headers: {

            },
            body: JSON.stringify(body)
        })
            .then(handleResponse)
            .then(res => {
                dispatch(editList());
            })
            .catch(e => {

            })
    }
};

export const populateLists = lists => {
    return {
        type: 'POPULATE_LISTS',
        lists
    }
};