
export const addTask = (task) => {
    return {
        type: 'ADD_TASK_SUCCESS',
        task
    }
}

export const startAddTask = (text) => {
    return dispatch => {
        fetch('/blah/tasks/add-task', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            dispatch(addTask(data))
        })
    }
}

export const completeTask = (task) => {
    return {
        type: 'COMPLETE_TASK',
        task
    }
} 

export const startCompleteTask = (id) => {
    return dispatch => {
        fetch(`/blah/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(task => {
            // console.log(task);
            dispatch(completeTask(task))
        })
    }
}

export const removeOne = (id) => {
    return {
        type: 'REMOVE_ONE',
        id
    }
}

export const startRemoveOne = (id) => {
    return dispatch => {
        fetch(`/blah/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        }).
        then(task => {
            dispatch(removeOne(task._id))
        })
    }
}

export const removeAll = () => {
    return {
        type: 'REMOVE_ALL'
    }
}

export const startRemoveAll = () => {
    return dispatch => {
        fetch('/blah/tasks', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.ok) {
                dispatch(removeAll());
            }
        })
    }
}

export const removeCompleted = (tasks) => {
    return {
        type: 'REMOVE_COMPLETED'
    }
}

export const startRemoveCompleted = () => {
    return dispatch => {
        fetch('/blah/tasks/completed', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(tasks => {
            dispatch(removeCompleted());
        })
    }
}

export const populateTasks = (tasks) => {
    return {
        type: 'POPULATE_TASKS',
        tasks
    }
}