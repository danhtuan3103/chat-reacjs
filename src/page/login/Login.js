import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import axios from 'axios';
import { signInWithGoogle, signInWithFacebook } from '../../auth/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action';
// Import the functions you need from the SDKs you need
const cx = classNames.bind(styles);
function Login() {
    const [searchParams] = useSearchParams();
    const path = searchParams.get('continute');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        const data = {
            email: state.email,
            password: state.password,
        };
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, data)
            .then((response) => {
                dispatch(login(response.data));
                path ? navigate(path) : navigate('/messenger');
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('logo')}>H2O</h2>
                    <Link to="/register">Register</Link>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>Login</h3>
                    <p className={cx('text')}>
                        By coutinuing, you agree to out <span className={cx('special-text')}>User Agreement</span> and{' '}
                        <span className={cx('special-text')}>Privacy Policy</span>
                    </p>

                    <div className={cx('btn-block')}>
                        <button className={cx('btn')} onClick={() => signInWithGoogle(path)}>
                            Continute with Google
                        </button>
                        <button className={cx('btn')} onClick={() => signInWithFacebook(path)}>
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
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={state.username}
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
                    </div>

                    <a className={cx('forget')}>Forget password?</a>
                </div>
                <button className={cx('btn', 'btn-submit')} onClick={handleSubmit}>
                    Continute
                </button>
            </div>
        </div>
    );
}

export default Login;
