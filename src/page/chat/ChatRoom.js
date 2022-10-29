import classNames from 'classnames/bind';
import styles from './ChatRoom.module.scss';
import io from 'socket.io-client';

import Sidebar from '../../component/Sidebar/Sidebar';
import ChatBox from '../../component/ChatBox/ChatBox';
import Info from '../../component/Info/Info';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const socket = io.connect('https://realtime-chatapp-nodejs-01.herokuapp.com/');
const cx = classNames.bind(styles);
const room = 'chat1';
function ChatRoom() {
    const user = useSelector((state) => state.user);
    socket.emit('join_room', room);

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <ChatBox socket={socket} room={room} />
            <Info />
        </div>
    );
}

export default ChatRoom;
