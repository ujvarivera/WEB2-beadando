import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"
import NewPost from './NewPost'

export default function Posts() {
    const [myPosts, setMyPosts] = useState([])

    const getMyPosts = async() => {
        try {
            const { data: posts } = await axios.get('/api/myposts')
            setMyPosts(posts)
        } catch (error) {
            console.log(error.response.data.message)
        }
  }

    const deleteMyPost = async(id) => {
        try {
            const { data: post } = await axios.delete(`/api/posts/${id}`)
            console.log(post)
            alert("post is deleted")
            window.location.reload(true)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        getMyPosts()
    }, [])

    return (
        <div className="input-container">
            <h1 className='text'>MY POSTS </h1> 
            <h2><NavLink to="/allposts">SEE ALL POSTS</NavLink></h2>
            <NewPost />
        <ul>
        {myPosts.map(({ title,content,createdAt, _id: id }) => (
            <div key={id} className = "post-frame">
                <h1>{title}</h1>
                <h2>{content}</h2>
                <h4>{createdAt.toString()}</h4>
                <button onClick={() => deleteMyPost(id)}>delete</button>
            </div>
        ))}
        </ul>
        </div>
    )
}