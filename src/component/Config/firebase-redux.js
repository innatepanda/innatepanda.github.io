import {combineReducers, createStore} from 'redux';
import firebase from 'firebase';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer=combineReducers({
    firebase:firebaseReducer
})

const initState={}
const store=createStore(rootReducer, initState)

const rrfconfig={

}
const rrfprops={
    firebase,
    config: rrfconfig,
    dispatch: store.dispatch,
}

export function getStore(){
    return store
}

export function getProps(){
    return rrfprops
}
