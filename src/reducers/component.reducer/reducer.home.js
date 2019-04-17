import {
    LOGIN_USER
} from '../../constants/index';

// import uniqBy from 'lodash/uniqBy';
// import union from 'lodash/union';
// import pull from 'lodash/pull';
// import findIndex from 'lodash/findIndex';

const initialState = {
    loading: false
};

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case LOGIN_USER: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return {
                ...state
            }
    }

}