import { useSelector, useDispatch } from 'react-redux';
import { selectRoom, getConversation } from '../../../redux/action';
import styles from './Friends.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Friends() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.onlineUsers) || [];
    const handleClick = (target) => {
        axios
            .post(`http://localhost:4000/api/conversation`, {
                self: user.email,
                target: target.email,
            })
            .then((res) => {
                dispatch(selectRoom(target));
                console.log('conversa', res.data);
                dispatch(getConversation(res.data.data));
                // navigate(`/messenger/${target.id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('mes-list')}>
            {users.map((user, index) => {
                return (
                    <div className={cx('message')} key={index} onClick={() => handleClick(user)}>
                        <img className={cx('avatar')} src={user.avatar} alt="avatar" />
                        <div className={cx('text-box')}>
                            <h4 className={cx('name')}>{user.name}</h4>
                            <p className={cx('content')}>online</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Friends;
