const getAuthHeader = () => ({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
const contentJSON = { 'Content-type': 'application/json' }

export const login = async (userInfo) => {
    const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            ...contentJSON
        },
        body: JSON.stringify(userInfo)
    })
    const json = await handleJSONResponse(res)

    localStorage.setItem('token', json.token)
    
    return json
}

export const createAccount = async (data) => {
    const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
            ...contentJSON
        },
        body: JSON.stringify(data)
    })

    const json = await handleJSONResponse(res)
    localStorage.setItem('token', json.token)
    return json
}

export const getUserData = async () => {
    const res = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
            ...getAuthHeader()
        }
    })

    const json = await handleJSONResponse(res)
    return json
}

export const logout = async () => {
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            ...getAuthHeader()
        }
    })

    if (res.ok) {
        localStorage.removeItem('token');
        return;
    } else {
        throw new Error('Failed to Logout')
    }
}

export const logoutAll = async () => {
    const res = await fetch('/api/users/logout-all', {
        method: 'POST',
        headers: {
            ...getAuthHeader()
        }
    })

    if (res.ok) {
        return localStorage.removeItem('token');
    } 

    throw new Error('Unable to Logout')
}

export const createNewList = async (listName) => {
    const res = await fetch('/api/lists/add-list', {
        method: 'POST',
        headers: {
            ...contentJSON,
            ...getAuthHeader()
        },
        body: JSON.stringify({ name: listName })
    })

    const json = await handleJSONResponse(res)

    return json
}

export const deleteList = async (listId) => {
    const res =  await fetch(`/api/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            ...getAuthHeader()
        },
    })

    const json = handleJSONResponse(res)
    return json
}

export const editList = async (listId, edits) => {
    const body = {
        ...edits,
        tasks: edits.tasks.map(task => task._id)
    };

    const res = await fetch(`/api/lists/${listId}`, {
        method: 'PATCH',
        headers: {
            ...contentJSON,
            ...getAuthHeader()
        },
        body: JSON.stringify(body)
    })

    const json = handleJSONResponse(res)
    return json
}

export const createNewTask =  async (listId, text) => {
    const res = await fetch('/api/tasks/add-task', {
        method: 'POST',
        body: JSON.stringify({ listId, text }),
        headers: {
            ...contentJSON,
            ...getAuthHeader()
        }
    })

    const json = await handleJSONResponse(res)
    return json
}

export const editTask = async (taskId, edits) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            ...contentJSON,
            ...getAuthHeader()
        },
        body: JSON.stringify(edits)
    })

    const json = await handleJSONResponse(res)
    return json
}

export const deleteTask = async (taskId) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            ...getAuthHeader()
        }
    })

    const json = await handleJSONResponse(res)
    return json
}

const handleJSONResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(res.statusCode);
    }
};