import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { AiFillPlusCircle } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { BsSearch, BsClockHistory } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { RiContactsBookFill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';
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
                <NavLink to="/messenger" className={({ isActive }) => (isActive ? cx('active') : cx(''))} end>
                    <BsClockHistory className={cx('icon')} />
                </NavLink>
                <NavLink to="/messenger/friends" className={({ isActive }) => (isActive ? cx('active') : cx(''))}>
                    <FaUserFriends className={cx('icon')} />
                </NavLink>
                <NavLink to="/messenger/groups" className={({ isActive }) => (isActive ? cx('active') : cx(''))}>
                    <RiContactsBookFill className={cx('icon')} />
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
}

export default Sidebar;
