
export const getDataFromLocalstorage = (key) => {
    if(key){
        return localStorage.getItem(key);
    }
}

export const setDataLocalStorage = (key,value) => {
    if(value instanceof Object)
        value = JSON.stringify(value);
    localStorage.setItem(key,value);
}