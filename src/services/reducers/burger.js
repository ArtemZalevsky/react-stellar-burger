import { ADD_BUN,ADD_MAIN } from "../actions/burger";

const burgerReducer = (state,action) => {
    switch(action.type){
case ADD_BUN:
    return [...state,action.element]
    
case ADD_MAIN:   
return [...state,action.element] 
    }
};


export default burgerReducer;