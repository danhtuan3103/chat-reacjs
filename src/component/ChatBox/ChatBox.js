import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { BsFillTelephoneFill, BsFillCameraVideoFill } from 'react-icons/bs';
import { FiSmile } from 'react-icons/fi';
import { ImAttachment } from 'react-icons/im';
import { FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
const cx = classNames.bind(styles);
const avatar =
    'https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/281723778_1738067096540255_1829283551838044847_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S0jiRdRstioAX8ebZz7&_nc_ht=scontent-ssn1-1.xx&oh=00_AfAQGWMwhMZJ9TwCZF8HmNYxSFZjslV700KnrylQIrqWzw&oe=63628AFC';
function ChatBox({ socket }) {
    const { user, conversation, room } = useSelector((state) => state);
    const [input, setInput] = useState('');
    const refInput = useRef();
    const refScroll = useRef();
    const [messages, setMessages] = useState(() => {
        if (conversation && conversation.message) {
            return conversation.message;
        } else {
            return [];
        }
    });
    useEffect(() => {
        if (refScroll.current) {
            refScroll.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
            });
        }
    }, [messages]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    useEffect(() => {
        setMessages(conversation.message);
    }, [conversation]);
    const handleSubmit = async (e) => {
        if (input !== '') {
            if (room) {
                await socket.emit('send_message', {
                    room: room.target.id,
                    content: input,
                    sender: user.email,
                });
            } else {
                alert('Select room');
                return;
            }
            setInput('');
            setMessages((prev) => [...prev, { sender: user.email, content: input, time: new Date() }]);
            await axios
                .post(`${process.env.REACT_APP_BASE_URL}/api/conversation/send`, {
                    room: conversation.id,
                    content: input,
                    sender: user.email,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (searchValue.startsWith(' ')) {
            return;
        } else {
            setInput(e.target.value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span className={cx('dot')}></span>
                <h2 className={cx('name')}>{room.target.name || ''}</h2>
                <span className={cx('icon-box')}>
                    <BsFillTelephoneFill className={cx('icon', 'phone')} />
                </span>
                <span className={cx('icon-box')}>
                    <BsFillCameraVideoFill className={cx('icon')} />
                </span>
            </div>
            <div className={cx('messages')}>
                {messages.map((mes, key) => {
                    return (
                        <div key={key} className={cx(mes.sender === user.email ? 'own-mes' : 'other-mes', 'mes')}>
                            <div>
                                <img
                                    className={cx('avatar')}
                                    src={mes.sender === user.email ? user.avatar : room.target.avatar}
                                    alt="own"
                                />
                                <p className={cx('time')}>{moment(mes.time).format('hh:mm:ss')}</p>
                            </div>
                            <p className={cx('text')}>{mes.content}</p>
                        </div>
                    );
                })}
                <div className={cx('scroll')} ref={refScroll}></div>
            </div>

            <div className={cx('footer')}>
                <input
                    ref={refInput}
                    type="text"
                    className={cx('input')}
                    placeholder="Type your message here..."
                    value={input}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
                <span className={cx('box-icon')}>
                    <FiSmile className={cx('icon')} />
                </span>
                <span className={cx('box-icon')}>
                    <ImAttachment className={cx('icon')} />
                </span>
                <span className={cx('icon-box')}>
                    <FiSend className={cx('icon')} onClick={handleSubmit} />
                </span>
            </div>
        </div>
    );
}

export default ChatBox;
