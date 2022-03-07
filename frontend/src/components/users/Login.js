import Auth from './Auth'
import { NavLink } from "react-router-dom"

export default function Login({username, setUsername, password, setPassword, login, error}) {
    return(
        <div className="input-container">
            <h1 className="login-text">LOGIN</h1>
            <h2><NavLink to="/register">YOU CAN REGISTER HERE</NavLink></h2>
            <Auth username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
            <button className="login-button" onClick={login}>login</button>

            {error && <h2 className="incorrect">{error}</h2>}
        </div>
    )
}