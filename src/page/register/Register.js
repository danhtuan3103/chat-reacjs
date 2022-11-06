import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { signInWithGoogle, signInWithFacebook } from '../../auth/firebase';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        if (state.password === state.passwordConfirm) {
            const data = {
                name: state.username,
                email: state.email,
                password: state.password,
                avatar: 'https://geheugenvanoost.amsterdam/image/2019/3/28/custom_avatar_oost.png%28%29%28A1AA9718B0A7004BA9DA7BBE5B7A6C4C%29.jpg',
            };
            axios
                .post('http://localhost:4000/api/user/register', data)
                .then(function (response) {
                    alert(response.data.message);
                    console.log(response.data);
                    navigate('/login');
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert('Password is incorrect');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('logo')}>H2O</h2>
                    <Link to="/login">Login</Link>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>Register</h3>
                    <p className={cx('text')}>
                        By coutinuing, you agree to out <span className={cx('special-text')}>User Agreement</span> and{' '}
                        <span className={cx('special-text')}>Privacy Policy</span>
                    </p>

                    <div className={cx('btn-block')}>
                        <button className={cx('btn')} onClick={() => signInWithGoogle()}>
                            Continute with Google
                        </button>
                        <button className={cx('btn')} onClick={() => signInWithFacebook()}>
                            Continute with Facebook
                        </button>
                    </div>

                    <div className={cx('line')}>
                        <span className={cx('line-or')}></span>
                        <span className={cx('or')}>OR</span>
                        <span className={cx('line-or')}></span>
                    </div>

                    <div className={cx('form')}>
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={state.firstname}
                            onChange={handleChange}
                        />
                        <input
                            className={cx('input')}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                        />
                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Password Confirm"
                            name="passwordConfirm"
                            value={state.passwordConfirm}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className={cx('btn', 'btn-submit')} onClick={handleSubmit}>
                    Continute
                </button>
            </div>
        </div>
    );
}

export default Register;
