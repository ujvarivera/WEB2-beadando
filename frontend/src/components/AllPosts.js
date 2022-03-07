import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"

export default function Posts() {
    const [myPosts, setMyPosts] = useState([])

    const getMyPosts = async() => {
        try {
            const { data: posts } = await axios.get('/api/posts')
            setMyPosts(posts)
        } catch (error) {
            console.log(error.response.data.message)
        }
  }

    useEffect(() => {
        getMyPosts()
    }, [])

    return(
        <div className="input-container">
            <h1 className="text">ALL POSTS </h1> 
            <h2 className="back-to-my-posts"><NavLink to="/posts">BACK TO MY POSTS</NavLink></h2>
        <ul>
        {myPosts.map(({ title,content,createdAt, _id: id }) => (
            <div key={id} className = "post-frame">
                <h1>{title}</h1>
                <h2>{content}</h2>
                <h4>{createdAt.toString()}</h4>
            </div>
        ))}
        </ul>
        </div>
    )
}