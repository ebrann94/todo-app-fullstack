import { updateListItemsById } from './utils';

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

export default (state = devState, action) => {
    // console.log(action);
    switch (action.type) {
        case 'ADD_LIST':
            return state.concat(action.newList);
        case 'DELETE_LIST':
            return state.filter(list => list.id !== action.listId);
        case 'EDIT_LIST':
            return state.map(list => {
                if (list.id === action.listId) {
                    return {
                        name: action.name || list.name,
                        description: action.description || list.action,
                        tasks: list.tasks
                    };
                } else {
                    return list;
                }
            });
        case 'ADD_TASK_SUCCESS':    
            return updateListItemsById(state, action.listId, items => [...items, action.task]);
        case 'EDIT_TASK':
            return updateListItemsById(state, action.listId, items => {
                return items.map(task => task.id === action.task.id ? action.task : task)
            });
        case 'DELETE_TASK':
            return updateListItemsById(state, action.listId, items => {
                return items.filter(task => task._id !== action.taskId);
            });
        case 'POPULATE_LISTS':
            return [...action.lists];
        default :
            return state;
    }
}