// import { applyMiddleware, createStore } from "redux";
// import axios from "axios";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import promise from "redux-promise-middleware";
//
// const initialState = {
//   fetching: false,
//   fetched: false,
//   users: [],
//   error: null,
// };
//
// const reducer = (state=initialState, action) => {
//   switch (action.type) {
//     case "FETCH_USERS_PENDING": {
//       return {...state, fetching: true}
//       break;
//     }
//     case "FETCH_USERS_REJECTED": {
//       return {...state, fetching: false, error: action.payload}
//       break;
//     }
//     case "FETCH_USERS_FULFILLED": {
//       return {
//         ...state,
//         fetching: false,
//         fetched: true,
//         users: action.payload,
//       }
//       break;
//     }
//   }
//   return state
// }
//
// const middleware = applyMiddleware(promise(), thunk, logger())
// const store = createStore(reducer, middleware)
//
// store.dispatch({
//   type: "FETCH_USERS",
//   payload: axios.get("http://rest.learncode.academy/api/wstern/users")
// })



// /********************** Redux Single Reducer Example *****************************/
//
// import { createStore } from 'redux';
//
// const reducer = function(state, action){
//   switch (action.type) {
//     case "INC":
//       return state+1;
//       break;
//     case "DEC":
//       return state-1;
//       break;
//     default:
//       return state;
//   }
// }
//
// const store = createStore(reducer, 0);//initial state is zero
// store.subscribe(()=>{console.log("store changed ", store.getState())});
//
// /*
// ** type is static while payload is not.
// ** standard way of doing action is instead of
// ** adding new property, just change the payload to an object
// */
// store.dispatch({type:"INC",payload:1});
// store.dispatch({type:"INC",payload:1});
// store.dispatch({type:"INC",payload:1});
// store.dispatch({type:"DEC",payload:1});
//
// /**************************************************************************/

// /******************** Redux Multiple rReducers Example **************************/
//
// import { combineReducers, createStore } from 'redux';
//
// /*
// ** reducers should return a state if not it will have an error
// */
// const userReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "CHANGE_NAME":{
//       state.name = action.payload; //bad way
//       // state = {...state, name: action.payload } //good way
//       break;
//     }
//     case "CHANGE_AGE":{
//       state.age = action.payload; //bad way
//       // state = {...state, age: action.payload } //good way
//       break;
//     }
//   }
//   return state
// }
//
// const tweetsReducer =  (state = [], action) => {
//
//   return state;
// }
//
//
// const reducers = combineReducers({
//   user: userReducer,
//   tweets: tweetsReducer
// })
//
// const store = createStore(reducers);
//
// store.subscribe(()=>{console.log("store changed ", store.getState())});
//
// /*
// ** type is static while payload is not.
// ** standard way of doing action is instead of
// ** adding new property, just change the payload to an object
// */
// store.dispatch({type:"CHANGE_NAME",payload:"Glenn"});
// store.dispatch({type:"CHANGE_AGE",payload:50});
//
// /**************************************************************************/

// /************************ Redux Logger Middleware Example ******************************/
//
// import { applyMiddleware, createStore } from 'redux';
//
// const reducer = function(state=0, action){
//   switch (action.type) {
//     case "INC":
//       return state+1;
//       break;
//     case "DEC":
//       return state-1;
//       break;
//
//   }
//   return state;
// }
//
// //1st middleware
// const logger = (store) => (next) => (action) => {
//   console.log("action fired: ",action);
//
//   /*
//   ** without next the state is not ever changing the actions
//   ** is firing but we're never calling the "next" middleware
//   ** so we're essentilly terminating every action berore anything takes
//   ** place so to call the next we simple fire 'next' and get the action
//   ** that was passed in
//   */
//   // action.type = "DEC"; //initially commented
//   next(action); //initially commented
// }
//
// const middleware = applyMiddleware(logger, error);
//
// const store = createStore(reducer, 1, middleware);
//
// store.subscribe(()=>{
//   console.log("store changed: ", store.getState());
// })
//
// store.dispatch({type:"INC"});
// store.dispatch({type:"INC"});
// store.dispatch({type:"INC"});
// store.dispatch({type:"DEC"});
//
// /**************************************************************************/


/************************ Redux Thunk,Logger Middleware Example ******************************/

import { applyMiddleware, createStore } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
import promise from "redux-promise-middleware";


const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
}
const reducer = function(state=initialState, action){
  switch (action.type) {
    case "FETCH_USERS":{
      return {...state, fetching: true}
      break;
    }
    case "FETCH_USERS_ERROR":{
      return {...state,
         fetching: false,
         error: action.payload
       }
      break;
    }
    case "RECEIVE_USERS":{
      return {...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
      break;
    }
  }
  return state;
}

/*
** If there is no thunk you cannot dispatch multiple action
*/
const middleware = applyMiddleware(promise(),thunk,logger());
const store = createStore(reducer, middleware);

// /* Dispatch in a thunk way */
// store.dispatch((dispatch) =>{
//   dispatch({type: "FETCH_USERS"});
//
//     //initially commented
//     axios.get("http://rest.learncode.academy/api/wstern/users")//try to destroy this
//     .then(response =>{
//       dispatch({type: "RECEIVE_USERS", payload: response.data });
//     }).catch((err)=>{
//       dispatch({type: "RECEIVE_USERS_ERROR", payload: err });
//     });
//
//   //do something async
//   // dispatch({type: "BAR"});
// });

// /* Dispatch in a Promse way */
// store.dispatch({
//   type: "FETCH_USERS",
//   payload: axios.get("http://rest.learncode.academy/api/wstern/users")
// });

/**************************************************************************/
