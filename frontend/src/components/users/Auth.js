export default function Auth({username, setUsername, password, setPassword}) {
    return(
        <div className="input-container">
        <h2>Username:</h2>
        <input 
          className="username-input" 
          placeholder="username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} />
        <h2>Password:</h2>
        <input
          className="password-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
    )
}