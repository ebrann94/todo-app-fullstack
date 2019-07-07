import { handleJSONResponse } from './utils.js';

export const addList = (newList) => {
    return {
        type: 'ADD_LIST',
        newList: {
            ...newList,
            tasks: []
        }
    }
};

export const startAddList = (listName) => dispatch => {
        fetch('/api/lists/add-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name: listName })
        })
            .then(handleJSONResponse)
            .then(res => {
                console.log(res);
                dispatch(addList(res));
            })
            .catch(e => {
                console.log(e);
            })

};

export const deleteList = (listId) => {
    return {
        type: 'DELETE_LIST',
        listId
    }
};

export const startDeleteList = listId => dispatch => {
    fetch(`/api/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
        .then(handleJSONResponse)
        .then(res => {
            console.log(res);
            dispatch(deleteList(listId))
        })
        .catch(e => {

        })
};

export const editList = (list) => {
    return {
        type: 'EDIT_LIST',
        list,
    }
};

export const replaceTasks = (listId, tasks) => {
    return {
        type: 'REPLACE_TASKS',
        listId,
        tasks
    }
};

export const startEditList = (listId, edits) => {
    const body = {
        ...edits,
        tasks: edits.tasks.map(task => task._id)
    };

    return dispatch => {
        fetch(`/api/lists/${listId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
            .then(handleJSONResponse)
            .then(res => {
                // console.log(res);
                dispatch(editList(res));
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