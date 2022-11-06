import Cookies from 'universal-cookie';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ONLINE_USERS = 'ONLINE_USERS';
export const ROOM = 'ROOM';
export const CONVERSATION = 'CONVERSATION';

const cookies = new Cookies();

export const login = (payload) => {
    cookies.set('USER_INFO', {
        ...payload,
        isLogged: true,
    });
    return {
        type: 'LOGIN',
        user: {
            ...payload,
            isLogged: true,
        },
    };
};

export const logout = () => {
    cookies.remove('USER_INFO');

    return {
        type: 'LOGOUT',
        user: {
            isLogged: false,
        },
    };
};

export const updateStateSocket = (payload) => {
    return {
        type: 'ONLINE_USERS',
        onlineUsers: payload.users,
    };
};

export const selectRoom = (payload) => {
    return {
        type: 'ROOM',
        room: { target: payload },
    };
};

export const getConversation = (payload) => {
    return {
        type: 'CONVERSATION',
        conversation: payload,
    };
};
