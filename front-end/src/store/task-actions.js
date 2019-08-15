import { handleJSONResponse } from "./utils";
import * as API from '../api/api';

export const addTask = (listId, task) => {
    return {
        type: 'ADD_TASK_SUCCESS',
        listId,
        task
    }
};

export const startAddTask = (listId, text) => {
    return async dispatch => {
        try {
            const newTask = await API.createNewTask(listId, text)
            dispatch(addTask(listId, newTask))
        } catch (e) {

        }
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
    return async dispatch => {
        try {
            const editedTask = await API.editTask(taskId, edits)
            dispatch(editTask(listId, editedTask))
        } catch (e) {

        }
    }
};

export const removeOne = (listId, taskId) => {
    return {
        type: 'DELETE_TASK',
        listId,
        taskId
    }
};

export const startDeleteTask = (listId, taskId) => {
    return async dispatch => {
        try {
            const deletedTask = await API.deleteTask(taskId)
            dispatch(removeOne(listId, deletedTask._id))
        } catch (e) {

        }
    }
};