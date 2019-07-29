export const getCurrentList = (lists, currentListId) => {
    return lists.find(list => list.id === currentListId);
}
