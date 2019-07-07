import { handleJSONResponse } from "./utils";

export const addTask = (listId, task) => {
    return {
        type: 'ADD_TASK_SUCCESS',
        listId,
        task
    }
};

export const startAddTask = (listId, text) => {
    return dispatch => {
        fetch('/api/tasks/add-task', {
            method: 'POST',
            body: JSON.stringify({ listId, text }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(handleJSONResponse)
        .then(data => {
            dispatch(addTask(listId, data))
        })
        .catch(error => {
            console.log(error);
        })
    }
};

export const editTask = (listId, task) => {
    return {
        type: 'EDIT_TASK',
        task,
        listId
    }
};

export const startEditTask = (listId, taskId, edits )=> {
    return dispatch => {
        fetch(`/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edits)
        })
            .then(handleJSONResponse)
            .then(task => {
                // console.log(task);
                dispatch(editTask(listId, task))
            })
            .catch(e => {
                console.log(e);
            })
    }
};

export const removeOne = (listId, taskId) => {
    return {
        type: 'DELETE_TASK',
        listId,
        taskId
    }
};

export const startDeleteTask = (listId, id) => {
    return dispatch => {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(handleJSONResponse)
        .then(task => {
            dispatch(removeOne(listId, task._id));
        })
        .catch(error => {
            console.log(error);
        });
    }
};