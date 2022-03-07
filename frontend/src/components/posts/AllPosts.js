import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"
import Post from './Post'

export default function AllPosts() {
    /* Return every posts */
    
    const [allPosts, setAllPosts] = useState([])

    const getAllPosts = async() => {
        try {
            const { data: posts } = await axios.get('/api/posts')
            setAllPosts(posts)
        } catch (error) {
            console.log(error.response.data.message)
        }
  }

    useEffect(() => {
        getAllPosts()
    }, [])

    return(
        <div className="input-container">
            <h1 className="text">ALL POSTS </h1> 
            <h2 className="back-to-my-posts"><NavLink to="/posts">BACK TO MY POSTS</NavLink></h2>
        <ul>
        {allPosts.map(({ title, content, createdAt, _id: id }) => (
            <Post title={title} content={content} createdAt={createdAt} id={id}/>
        ))}
        </ul>
        </div>
    )
}