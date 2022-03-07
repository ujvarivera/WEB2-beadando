
export default function Profile({username}) {

    const logout = async() => {
        window.localStorage.removeItem('jwt')
        window.localStorage.removeItem('username')
        window.location.reload(true)
      }

    return(
        <div className="input-container">
            <h1 className='text'>Hello {username}</h1>
            <button className="logout-button" onClick={logout}>logout</button>
        </div>
    )
}