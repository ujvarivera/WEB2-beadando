import Auth from './Auth'

export default function Login({username, setUsername, password, setPassword, login, error}) {
    return(
        <div className="input-container">
            <h1 className="login-text">LOGIN</h1>
            <Auth username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
            <button className="login-button" onClick={login}>login</button>

            {error && <h2 className="incorrect">{error}</h2>}
        </div>
    )
}