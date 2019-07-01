export const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(res.statusCode);
    }
};

export const updateListItemsById = (lists, current, cb) => {
    return lists.map(list => {
        if (list.id === current) {
            return {
                ...list,
                tasks: cb(list.tasks)
            }
        }
        return list
    })
};