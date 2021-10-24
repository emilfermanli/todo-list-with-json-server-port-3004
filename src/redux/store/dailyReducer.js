import * as actionTypes from "../action/actionTypes"
const listData = []


const dailyReducer = (state = listData,action) => {
  
    switch (action.type) {
        case actionTypes.GET_LAST_DATA:
            return action.payload;
        case actionTypes.NEW_LIST_DATA:
            return state = [...state,action.payload];
        case actionTypes.DELETE_DATA:
            return state = state.filter(index => index.id !== action.payload)
        case actionTypes.EDIT_DATA:
                {
                    var indexOfData = state.findIndex(i => i.id === action.payload.id);
                    state.splice(indexOfData,1,action.payload)   
                    return state
                }
        default:
            return state
           
    }
}

export default dailyReducer