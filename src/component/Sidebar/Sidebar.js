import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { AiFillPlusCircle } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { BsSearch, BsClockHistory } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { RiContactsBookFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function Sidebar({}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('logo')}>H2O</h1>
                <AiFillPlusCircle className={cx('icon', 'plus')} />
                <HiDotsVertical className={cx('icon', 'dot-menu')} />
            </div>

            <div className={cx('search')}>
                <BsSearch className={cx('glass-btn', 'icon')} />
                <input className={cx('input')} placeholder="Search here...." />
            </div>

            <div className={cx('tools')}>
                <Link to="/messenger">
                    <BsClockHistory className={cx('icon')} />
                </Link>
                <Link to="/messenger/friends">
                    <FaUserFriends className={cx('icon')} />
                </Link>
                <Link to="/messenger/groups">
                    <RiContactsBookFill className={cx('icon')} />
                </Link>
            </div>

            <div className={cx('mes-list')}>
                {[1, 2, 3, 5].map((index) => {
                    return (
                        <div className={cx('message')} key={index}>
                            <img
                                className={cx('avatar')}
                                src="https://lh3.googleusercontent.com/ogw/AOh-ky3OZiMns8YiFwJ_1T-VTzVKcR6SmqArV6i6me4wVA=s64-c-mo"
                                alt="avatar"
                            />
                            <div className={cx('text-box')}>
                                <h4 className={cx('name')}>Danh Tuan</h4>
                                <p className={cx('content')}>
                                    Hello ! How are you Hello ! How are youHello ! How are you
                                </p>
                            </div>

                            <span className={cx('mes-count')}>3</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;
