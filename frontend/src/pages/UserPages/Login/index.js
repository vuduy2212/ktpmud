/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons';
import { loginUser } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validate, showValidate, hideValidate } from '~/middleware/validateForm';
import { loginFailed } from '~/redux/authSlice';
const cx = classNames.bind(styles);
function Login() {
    const user = useSelector((state) => state.auth.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.auth.login);
    useEffect(() => {
        dispatch(loginFailed(null));
        const handleBlur = function (item) {
            if (item.value.trim() !== '') {
                item.classList.add(cx('has-val'));
            } else {
                item.classList.remove(cx('has-val'));
            }
        };
        const input100 = document.getElementsByClassName(cx('input100'));
        for (let item of input100) {
            item.addEventListener('blur', () => {
                handleBlur(item);
            });
        }
        const inputList = document.querySelectorAll(`.${cx('validate-input')} .${cx('input100')}`);
        [...inputList].forEach((element) => {
            element.addEventListener('focus', () => {
                dispatch(loginFailed(null));
            });
        });
        return () => {
            for (let item of input100) {
                item.removeEventListener('blur', () => {
                    handleBlur(item);
                });
            }
        };
    }, []);
    const toggleShowPassword = () => {
        showPw ? setShowPw(false) : setShowPw(true);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let check = true;
        const inputList = document.querySelectorAll(`.${cx('validate-input')} .${cx('input100')}`);
        [...inputList].forEach((element) => {
            if (validate(element) === false) {
                showValidate(element, cx);
                check = false;
            } else {
                hideValidate(element, cx);
            }
            element.addEventListener('focus', () => {
                hideValidate(element, cx);
            });
        });
        for (let i = 0; i < inputList.length; i++) {
            inputList[i].onFocus = () => {
                hideValidate(inputList[i], cx);
            };
        }
        if (check === true) {
            const newUser = {
                email,
                password,
            };
            setLoading(true);
            await loginUser(newUser, dispatch, navigate);
            setLoading(false);
        }
    };
    return !user.currentUser ? (
        <div className={cx('login-page')}>
            <div className={cx('limiter')}>
                <div className={cx('container-login100')}>
                    <div className={cx('wrap-login100')}>
                        <form onSubmit={(e) => handleFormSubmit(e)} className={cx('login100-form', 'validate-form')}>
                            <div className={cx('logo-container')}>
                                <Link className={cx('logo')} to={'/'}>
                                    <div>
                                        <img src={images.logo} alt="BookingCare Logo"></img>
                                    </div>
                                </Link>
                            </div>
                            <span className={cx('login100-form-title', 'p-b-43')}>Đăng nhập</span>
                            <div
                                className={cx('wrap-input100', 'validate-input')}
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input
                                    className={cx('input100')}
                                    type="text"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Email</span>
                            </div>

                            <div className={cx('wrap-input100', 'validate-input')} data-validate="Password is required">
                                <input
                                    id="input-password"
                                    className={cx('input100')}
                                    type={showPw ? 'text' : 'password'}
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className={cx('focus-input100')}></span>
                                <span className={cx('label-input100')}>Password</span>
                                {password ? (
                                    showPw ? (
                                        <FaEyeSlash
                                            className={cx('show-password')}
                                            onClick={toggleShowPassword}
                                        ></FaEyeSlash>
                                    ) : (
                                        <FaEye className={cx('show-password')} onClick={toggleShowPassword}></FaEye>
                                    )
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className={cx('flex-sb-m w-full', 'p-t-3', 'p-b-32', 'wrapper-checkbox-forgot')}>
                                <div className={cx('contact100-form-checkbox')}>
                                    <input
                                        className={cx('input-checkbox100')}
                                        id="ckb1"
                                        type="checkbox"
                                        name="remember-me"
                                    />
                                    <label className={cx('label-checkbox100')} htmlFor="ckb1">
                                        Remember me
                                    </label>
                                </div>

                                <div>
                                    <a href="#" className={cx('txt1')}>
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            <span className={cx('txt1', 'messError')}>{state.messageError}</span>
                            <div className={cx('container-login100-form-btn')}>
                                <button className={cx('login100-form-btn')}>
                                    {loading ? <TailSpin /> : 'Đăng nhập'}
                                </button>
                            </div>
                            <span className={cx('login100-form-title-sub')}>
                                Bạn chưa có tài khoản?
                                <Link to={'/register'} className={cx('login100-form-btn', 'register-btn')}>
                                    Đăng ký ngay
                                </Link>
                            </span>
                        </form>
                        <div className={cx('login100-more')}></div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Navigate to={'/'} />
    );
}

export default Login;
