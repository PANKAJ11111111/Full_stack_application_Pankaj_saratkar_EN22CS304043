
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function addData(key, item) {
    const data = getData(key);
    data.push(item);
    setData(key, data);
}


function clearData(key) {
    localStorage.removeItem(key);
}


function generateId() {
    return Date.now().toString();
}


