export const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(res.statusCode);
    }
};