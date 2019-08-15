import { updateListItemsById } from './utils';

const tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.task]
        case 'EDIT_TASK':
            return state.map(task => task._id === action.task._id ? action.task : task)
        case 'DELETE_TASK':
            return state.filter(task => task._id !== action.taskId)
    }
}

const devState = [{
    id: '1234',
    name: 'Things To Do',
    description: 'Really important things to do',
    tasks : [
        {
            _id: '53242',
            text: 'Washing Up',
            completed: false
        }
    ]
}];

const defaultState = [];

const updateListTasks = (state, listId, action) => {
    return state.map(list => {
        if (list.id === listId) {
            return {
                ...list,
                tasks: tasks(list.tasks, action)
            }
        } 

        return list
    })
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return [...state, action.newList]
        case 'DELETE_LIST':
            return state.filter(list => list.id !== action.listId);
        case 'EDIT_LIST':
            return state.map(list => {
                return list.id === action.list.id ? action.list : list;
            });
        case 'REPLACE_TASKS':
            return updateListItemsById(state, action.listId, () => [...action.tasks]);
        case 'ADD_TASK_SUCCESS':    
            return updateListTasks(state, action.listId, { type:  'ADD_TASK', task: action.task })
        case 'EDIT_TASK':
            return updateListTasks(state, action.listId, { type: 'EDIT_TASK', task: action.task })
        case 'DELETE_TASK':
            return updateListTasks(state, action.listId, { type: 'DELETE_TASK', taskId: action.taskId })
        case 'POPULATE_LISTS':
            return [...action.lists];
        case 'LOGIN_SUCCESS':
            return [...action.payload.lists]
        case 'RESET_LISTS':
            return defaultState;
        default :
            return state;
    }
}