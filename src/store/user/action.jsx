import * as types from './actin-types'

export const changeAuthority = (authority = false) => {
    return{
        type: types.AUTHORITY,
        authority
    }
}