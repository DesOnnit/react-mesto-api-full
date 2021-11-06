import { Link } from "react-router-dom";
import React from "react";


function Register({ onRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChange(e) {
        const { value } = e.target
        e.target.name === 'Email' ? setEmail(value) : setPassword(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onRegister(password, email)
    }

    return (
        <div className="sign-window">
            <form
                className="sign-window__form"
                onSubmit={handleSubmit}>
                <h2 className="sign-window__title">
                    Регистрация
                </h2>
                <label className="popup__label">
                    <input
                        type="email"
                        name="Email"
                        id="email"
                        value={email || ''}
                        className="sign-window__input"
                        minLength="6"
                        maxLength="40"
                        placeholder="Email"
                        required
                        onChange={handleChange}>
                    </input>
                    <span
                        className="popup__error"
                        id="email-error">
                    </span>
                </label>
                <label className="popup__label">
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        value={password || ''}
                        className="sign-window__input"
                        minLength="2"
                        maxLength="200"
                        placeholder="Пароль"
                        required
                        onChange={handleChange}>
                    </input>
                    <span
                        className="popup__error"
                        id="password-error">
                    </span>
                </label>
                <button className="sign-window__button transition">
                    Зарегистрироваться
                </button>
            </form>
            <div className="sign-window__segue">
                <h3 className="sign-window__link">
                    Уже зарегистрированы?
                </h3>
                <Link to="/sign-in"
                    className="sign-window__link transition-btn">
                    Войти
                </Link>
            </div>
        </div>
    )
}

export default Register