import Auth from './Auth'

export default function Login({username, setUsername, password, setPassword, register, error}) {
    return(
        <div className="input-container">
          <h1 className="register-text">REGISTER</h1>
          <Auth username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
          <button className="register-button" onClick={register}>register</button>

          {error && <h2 className="incorrect">{error}</h2>}
        </div>
    )
}