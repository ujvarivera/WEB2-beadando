import Auth from './Auth'
import { NavLink } from "react-router-dom"
import useUserData from "../../hooks/useUserData"

export default function Login() {
    const { register, registerErrorMessage } = useUserData()

    return(
        <div className="input-container">
          <h1 className="register-text">REGISTER</h1>
          <h2><NavLink to="/login">I HAVE AN ACCOUNT, BACK TO LOGIN</NavLink></h2>
          <Auth />
          <button className="register-button" onClick={register}>register</button>

          {registerErrorMessage && <h2 className="incorrect">{registerErrorMessage}</h2>}
        </div>
    )
}