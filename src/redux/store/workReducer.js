import * as actionTypes from "../action/actionTypes"
const listData = []


const workReducer = (state = listData,action) => {
 
    
    switch (action.type) {
        case actionTypes.GET_WORK_LAST_DATA:
            return action.payload;
        case actionTypes.NEW_WORK_LIST_DATA:
            return state = [...state,action.payload];
        case actionTypes.DELETE_WORK_DATA:
            return state = state.filter(index => index.id !== action.payload)
        case actionTypes.EDIT_WORK_DATA:
                {
                    var indexOfData = state.findIndex(i => i.id === action.payload.id);
                    state.splice(indexOfData,1,action.payload) 
                    console.log(state)  
                    return state
                }
        default:
            return state
           
    }
}

export default workReducer