import Auth from './Auth'
import { NavLink } from "react-router-dom"

export default function Login({username, setUsername, password, setPassword, register, error}) {
    return(
        <div className="input-container">
          <h1 className="register-text">REGISTER</h1>
          <h2><NavLink to="/login">I HAVE AN ACCOUNT, BACK TO LOGIN</NavLink></h2>
          <Auth username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
          <button className="register-button" onClick={register}>register</button>

          {error && <h2 className="incorrect">{error}</h2>}
        </div>
    )
}