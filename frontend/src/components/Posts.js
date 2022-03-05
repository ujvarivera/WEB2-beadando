import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Posts() {
    const [myPosts, setMyPosts] = useState([])

    const getMyPosts = async() => {
        try {
            const { data: posts } = await axios.get('/api/posts')
            setMyPosts(posts)
            console.log(posts)
        } catch (error) {
            console.log(error.response.data.message)
        }
  }

    useEffect(() => {
        getMyPosts()
    }, [])

    return(
        <div className="input-container">
            <h1 className='text'>My posts: </h1> 
        <ul>
        {myPosts.map(({ title,content, _id: id }) => (
            <div>
                <h1>{title}</h1>
                <h2>{content}</h2>
            </div>
        ))}
        </ul>
        </div>
    )
}