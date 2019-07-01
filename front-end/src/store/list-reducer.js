import { updateListItemsById } from './utils';

const devState = [{
    id: '1234',
    name: 'Things ToDo',
    description: 'Really important things to do',
    tasks : [
        {
            id: '53242',
            text: 'Washing Up',
            completed: false
        }
    ]
}];

export default (state = [], action) => {
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
        case 'COMPLETE_TASK':
            return updateListItemsById(state, action.listId, items => {
                return items.map(task => task._id === action._id ? action.task : task)
            });
        case 'DELETE_TASK':
            return updateListItemsById(state, action.listId, items => {
                return items.filter(task => task._id !== action.taskId);
            });
        // case 'REMOVE_COMPLETED':
        //     return state.filter(task => !task.completed);
        // case 'REMOVE_ALL':
        //     return [];
        case 'POPULATE_LISTS':
            return [...action.lists];
        default :
            return state;
    }
}