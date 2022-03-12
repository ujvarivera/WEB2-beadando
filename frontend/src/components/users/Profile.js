import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DragAndDrop from './DragAndDrop'

export default function Profile() {
    const [data, setData] = useState('')

    const logout = () => {
        window.localStorage.removeItem('jwt')
        window.localStorage.removeItem('username')
        window.location.reload(true)
      }

    const getImageURL = async() => {
        axios.defaults.headers.authorization = `Bearer ${window.localStorage.getItem('jwt')}`
        try {
            const { data } = await axios.get('/api/images')
            setData(data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const deleteAvatar = async(id) => {
        try {
            const data = await axios.delete(`/api/images/${id}`)
            getImageURL()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getImageURL()
    }, [])

    return(
        <div className="input-container">
            <h1 className='text'>Hello {window.localStorage.getItem('username')}</h1>
            <button className="logout-button" onClick={logout}>logout</button>
            { 
            data ?
            <div>
                <img className="profile-pic" src={data.avatar} alt='my avatar'/>
                <button onClick= { () => deleteAvatar(data._id) }>Delete my avatar</button>
            </div> :
            <DragAndDrop />
            }
            
        </div>
    )
}