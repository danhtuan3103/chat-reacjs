import { LOGIN, LOGOUT } from './action';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
const user = cookie.get('USER_INFO');
const initialState = { user: user || null };

export const reducer = (state = initialState, action) => {
    console.log('action ' + action.user);

    if (action.type === LOGIN) {
        return { user: action.user };
    } else if (action.type === LOGOUT) {
        return { user: action.user };
    } else return state;
};
