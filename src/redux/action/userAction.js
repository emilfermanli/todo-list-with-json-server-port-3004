import * as actionTypes from "./actionTypes"
import data from "../../axios/data"

export const lastData = (data) => {
    return{
        type: actionTypes.GET_LAST_DATA,
        payload: data
    }
}

export function getLastData(){
    return function(dispatch){
        return data.get("/lists")
        .then(res => res.data)
        .then(res => dispatch(lastData(res)))
        .catch(err => console.log(err))    
    }
}

export const lastWorkData = (data) => {
    return{
        type: actionTypes.GET_WORK_LAST_DATA,
        payload: data
    }
}

export function getLastWorkData(){
    return function(dispatch){
        return data.get("/works")
        .then(res => res.data)
        .then(res => dispatch(lastWorkData(res)))
        .catch(err => console.log(err))    
    }
}

export const newData = (data) => {
    return{
        type: actionTypes.NEW_LIST_DATA,
        payload: data
    }
}

export const newWorkData = (data) => {
    return{
        type: actionTypes.NEW_WORK_LIST_DATA,
        payload: data
    }
}

export const deleteData = (data) => {
    return{
        type: actionTypes.DELETE_DATA,
        payload: data
    }
}

export const deleteWorkData = (data) => {
    return{
        type: actionTypes.DELETE_WORK_DATA,
        payload: data
    }
}

export const editData = (data) => {
    return{
        type: actionTypes.EDIT_DATA,
        payload: data
    }
}

export const editWorkData = (data) => {
    return{
        type: actionTypes.EDIT_WORK_DATA,
        payload: data
    }
}