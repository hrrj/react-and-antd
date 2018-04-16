import * as types from './actin-types'

const defaultState = {
    authority: true
}

export const userData = (state = defaultState, action = {}) => {
    switch(action.type){
        case types.AUTHORITY:
            return {
                ...state,
                authority: action.authority
            }
        default:
            return state
    }
}