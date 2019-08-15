import { batch } from 'react-redux';
import { handleJSONResponse } from './utils.js';
import { setCurrentList } from './user-actions';
import * as API from '../api/api';

export const addList = (newList) => {
    return {
        type: 'ADD_LIST',
        newList: {
            ...newList,
            tasks: []
        }
    }
};

export const startAddList = (listName) => 
    async dispatch => {
        // fetch('/api/lists/add-list', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     },
        //     body: JSON.stringify({ name: listName })
        // })
        //     .then(handleJSONResponse)
        //     .then(res => {
        //         batch(() => {
        //             dispatch(addList(res));
        //             dispatch(setCurrentList(res.id))
        //         })
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     })
        
        try {
            const newList = await API.createNewList(listName)
            batch(() => {
                dispatch(addList(newList));
                dispatch(setCurrentList(newList.id))
            })
        } catch (e) {

        }

};

export const deleteList = listId => {
    return {
        type: 'DELETE_LIST',
        listId
    }
};

export const startDeleteList = listId => 
    async (dispatch, getState) => {
        // fetch(`/api/lists/${listId}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     },
        // })
        //     .then(handleJSONResponse)
        //     .then(res => {
        //         const lists = getState().lists;
        //         let idToSet = '';
        //         if (lists.length > 1) {
        //             let index = lists.findIndex(list => listId === list.id)
        //             lists.splice(index, 1);
        //             if (index >= lists.length) {
        //                 index--
        //             }
        //             idToSet = lists[index].id
        //         } 

        //         batch(() => {
        //             dispatch(setCurrentList(idToSet))
        //             dispatch(deleteList(listId));
        //         })
        //     })
        //     .catch(e => {

        //     })

        try {
            await API.deleteList(listId)

            const lists = getState().lists;
            let idToSet = '';
            if (lists.length > 1) {
                let index = lists.findIndex(list => listId === list.id)
                lists.splice(index, 1);
                if (index >= lists.length) {
                    index--
                }
                idToSet = lists[index].id
            } 

            batch(() => {
                dispatch(setCurrentList(idToSet))
                dispatch(deleteList(listId));
            })
        } catch (e) {

        }
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
    // const body = {
    //     ...edits,
    //     tasks: edits.tasks.map(task => task._id)
    // };

    return async dispatch => {
        // fetch(`/api/lists/${listId}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     },
        //     body: JSON.stringify(body)
        // })
        //     .then(handleJSONResponse)
        //     .then(res => {
        //         // console.log(res);
        //         dispatch(editList(res));
        //     })
        //     .catch(e => {

        //     })

        try {
            const editedList = API.editList(listId, edits)
            dispatch(editList(editedList))
        } catch (e) {

        }
    }
};

export const populateLists = lists => {
    return {
        type: 'POPULATE_LISTS',
        lists
    }
};