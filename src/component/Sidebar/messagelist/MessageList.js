import styles from './MessageList.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function MessageList() {
    const user = useSelector((state) => state.user);
    const [list, setList] = useState([]);
    console.log(list);
    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/api/conversation/all`, { email: user.email })
            .then((res) => {
                setList(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className={cx('mes-list')}>
            {list.map((chat, index) => {
                return (
                    <div className={cx('message')} key={index}>
                        <img className={cx('avatar')} src={user.avatar} alt="avatar" />
                        <div className={cx('text-box')}>
                            <h4 className={cx('name')}>Danh Tuan</h4>
                            <p className={cx('content')}>Hello ! How are you Hello ! How are youHello ! How are you</p>
                        </div>

                        <span className={cx('mes-count')}>3</span>
                    </div>
                );
            })}
        </div>
    );
}

export default MessageList;
