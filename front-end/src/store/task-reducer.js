

export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK_SUCCESS':    
            return [...state, action.task];
        case 'COMPLETE_TASK':
            return state.map(task => {
                if (task._id === action.task._id) {
                    return action.task;
                } else {
                    return task;
                }   
            });
        case 'REMOVE_ONE':
            return state.filter(task => {
                return task._id !== action.id;
            });
        case 'REMOVE_COMPLETED':
            return state.filter(task => !task.completed);
        case 'REMOVE_ALL':
            return [];
        case 'POPULATE_TASKS':
            return [...action.tasks]
        default :
            return state;
    }
}