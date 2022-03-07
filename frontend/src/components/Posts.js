import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"
import NewPost from './NewPost'

export default function Posts() {
    const [myPosts, setMyPosts] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')
    const [postId, setPostId] = useState('')

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
            alert(error.response.data.message)
        }
    }

    const toUpdateMode = (id) => {
        setIsUpdating(true)
        setPostId(id)
    }

    const update = async() => {
        try {
            if (newTitle === "" || newContent === "") {
                alert("title or content is missing")
                return
            }
            const { data } = await axios.put(`/api/posts/${postId}`, {
                title: newTitle,
                content: newContent
            })
            alert(JSON.stringify(data))
            setIsUpdating(false)
            window.location.reload(true)
        } catch (error) {
            alert(error.response.data.message)
            setIsUpdating(false)
        }
    }

    const discard = () => {
        setIsUpdating(false)
        setNewContent("")
        setNewTitle("")
    }

    useEffect(() => {
        getMyPosts()
    }, [])

    return (
        <div className="input-container">
            {isUpdating && 
                <div>
                    <h2>You can update here:</h2>
                    <input 
                        placeholder='set new title'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input
                        placeholder='set new content'
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                    <button onClick={discard}>discard changes</button>
                    <button onClick={update}>finish updating</button>
                
                </div> 
            }
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
                <button onClick={() => toUpdateMode(id)}>update</button>
            </div>
        ))}
        </ul>
        </div>
    )
}