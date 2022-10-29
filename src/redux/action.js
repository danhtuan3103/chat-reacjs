import Cookies from 'universal-cookie';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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
