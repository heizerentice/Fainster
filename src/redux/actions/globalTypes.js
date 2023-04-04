export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: 'ALERT',
    STATUS: 'STATUS', 
    THEME: 'THEME',
    MODAL: 'MODAL'
}

export const EditData = (data, id, post) => {
    const newData = data.map(item => (
        item._id === id ? post : item
    ))
    return newData
}

export const DelData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}