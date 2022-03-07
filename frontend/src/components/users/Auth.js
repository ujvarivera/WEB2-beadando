import useUserData from "../../hooks/useUserData"

export default function Auth() {
  const {username, setUsername, password, setPassword } = useUserData()
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