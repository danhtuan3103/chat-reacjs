import { LOGIN, LOGOUT, ONLINE_USERS, ROOM, CONVERSATION } from './action';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
const user = cookie.get('USER_INFO');
const initialState = { user: user || null, onlineUsers: null, room: null, conversation: null };

export const reducer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        return { user: action.user };
    } else if (action.type === LOGOUT) {
        return { user: action.user };
    } else if (action.type === ONLINE_USERS) {
        return { ...state, onlineUsers: action.onlineUsers };
    } else if (action.type === ROOM) {
        return { ...state, room: action.room };
    } else if (action.type === CONVERSATION) {
        return { ...state, conversation: action.conversation };
    } else return state;
};
