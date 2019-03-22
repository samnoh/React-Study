export const ADDLIST = 'ADDLIST';
export const CHANGEVALUE = 'CHANGEVALUE'
export const DELETELAST = 'DELETELAST'
export const CHANGECOLOR = 'CHANGECOLOR'

export const addList = (newList) => ({
    type: ADDLIST,
    list: newList,
});

export const changeValue = (value) => ({
    type: CHANGEVALUE,
    value: value,
});

export const deleteLast = () => ({
    type: DELETELAST,
});

export const changeColor = () => ({
    type: CHANGECOLOR,
});