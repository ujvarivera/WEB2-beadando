import Auth from './Auth'
import { NavLink } from "react-router-dom"
import useUserData from "../../hooks/useUserData"

export default function Login() {
    const { login, loginErrorMessage } = useUserData()
    return(
        <div className="input-container">
            <h1 className="login-text">LOGIN</h1>
            <h2><NavLink to="/register">YOU CAN REGISTER HERE</NavLink></h2>
            <Auth />
            <button className="login-button" onClick={login}>login</button>

            {loginErrorMessage && <h2 className="incorrect">{loginErrorMessage}</h2>}
        </div>
    )
}