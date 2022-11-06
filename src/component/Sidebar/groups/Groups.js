import styles from './Groups.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Groups() {
    console.log('Groups');
    return (
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
                            <h4 className={cx('name')}>Groups learn .....</h4>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Groups;
