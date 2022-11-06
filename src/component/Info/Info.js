import classNames from 'classnames/bind';
import styles from './Info.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/action';

import { RiCloseFill } from 'react-icons/ri';
import { GoMail } from 'react-icons/go';
import { BsHouse, BsPhone } from 'react-icons/bs';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);
function Info() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef();
    const [open, setOpen] = useState(true);
    const user = useSelector((state) => state.user);
    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login';
    };
    const INFO = [
        { icon: BsHouse, text: 'Bu Dang, Binh Phuoc' },
        { icon: BsPhone, text: '999-9999-999' },
        { icon: GoMail, text: user.email },
    ];

    const handleClickClose = () => {
        setOpen(false);
    };
    return (
        <div className={cx('wrapper', open ? '' : 'close')} onMouseEnter={() => setOpen(true)}>
            <div className={cx('header')}>
                <RiCloseFill className={cx('icon', 'close-btn')} onClick={handleClickClose} />
            </div>
            <div className={cx('user')}>
                <img className={cx('avatar')} src={user.avatar} alt="avatar" />
                <h4 className={cx('name')}>{user.name}</h4>
                <p className={cx('description')}>If you try to do everything, You don't anything</p>
            </div>

            <div className={cx('info')}>
                {INFO.map((info, index) => {
                    let Icon = info.icon;
                    return (
                        <span className={cx('info-contains')} key={index}>
                            <Icon className={cx('icon')} />
                            <p className={cx('text')}>{info.text}</p>
                        </span>
                    );
                })}
            </div>

            <div className={cx('suggest')}>
                <h3>Suggestions </h3>
                <div className={cx('suggest-accounts')}>
                    {[1, 9, 4, 2].map((index) => (
                        <img
                            className={cx('account')}
                            key={index}
                            src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/52590187_571635660019619_7263446728748040192_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mSbZzWyk--MAX-lnFCz&_nc_ht=scontent-ssn1-1.xx&oh=00_AT_C581tZxiNFZ7ETFeDLBV0df4oEizcqcL3AYMz5IQlFQ&oe=637F244D"
                        />
                    ))}
                </div>
            </div>

            <button className={cx('logout')} onClick={() => handleLogout()}>
                Logout
            </button>
        </div>
    );
}

export default Info;
