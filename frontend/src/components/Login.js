import React from "react";

function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChange(e) {
        const { value } = e.target
        e.target.name === 'Email' ? setEmail(value) : setPassword(value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(password,email);
    }

    return (
        <div className="sign-window">
            <form
                className="sign-window__form"
                onSubmit={handleSubmit}>
                <h2 className="sign-window__title">
                    Вход
                </h2>
                <label className="popup__label">
                    <input
                        type="email"
                        name="Email"
                        id="login-email"
                        value={email || ''}
                        className="sign-window__input"
                        minLength="2"
                        maxLength="200"
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
                        id="login-password"
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
                    Войти
                </button>
            </form>
        </div>
    )
}

export default Login