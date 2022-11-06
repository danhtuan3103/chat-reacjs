import classNames from 'classnames/bind';
import styles from './ChatRoom.module.scss';
import io from 'socket.io-client';

import Sidebar from '../../component/Sidebar/Sidebar';
import ChatBox from '../../component/ChatBox/ChatBox';
import Info from '../../component/Info/Info';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStateSocket } from '../../redux/action';
const cx = classNames.bind(styles);
const socket = io(process.env.REACT_APP_BASE_URL);
function ChatRoom() {
    const dispatch = useDispatch();
    const { user, room } = useSelector((state) => state);

    useEffect(() => {
        socket.emit('new_visitor', user);
        socket.emit('join_room', room);

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('new_visitor');
            socket.off('join_room');
        };
    }, []);

    useEffect(() => {}, [room]);

    useEffect(() => {
        socket.on('visitors', (data) => {
            const users = data.filter((us) => us.email !== user.email);
            dispatch(updateStateSocket({ users: users }));
        });
        socket.on('update', (data) => {
            const users = data.filter((us) => us.email !== user.email);
            dispatch(updateStateSocket({ users: users }));
        });

        return () => {
            socket.off('visitor');
            socket.off('update');
        };
    }, [socket]);

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            {room ? <ChatBox socket={socket} /> : <div className={cx('nothing')}>Nothing</div>}
            <Info />
        </div>
    );
}

export default ChatRoom;
