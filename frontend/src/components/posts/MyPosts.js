import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"
import NewPost from './NewPost'
import MyPost from './MyPost'
import UpdatingPost from './UpdatingPost'

export default function MyPosts() {
    /* Return all of my posts */
    
    const [myPosts, setMyPosts] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')
    const [postId, setPostId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const getMyPosts = async() => {
        try {
            const { data: posts } = await axios.get('/api/myposts')
            setMyPosts(posts)
        } catch (error) {
            console.log(error.response.data.message)
        }
  }

    const update = async() => {
        try {
            if (newTitle === "" || newContent === "") {
                setErrorMessage("title and/or content is missing")
                return
            }
            const { data } = await axios.put(`/api/posts/${postId}`, {
                title: newTitle,
                content: newContent
            })
            alert(JSON.stringify(data))
            setIsUpdating(false)
            setErrorMessage("")
            window.location.reload(true)
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setIsUpdating(false)
        }
    }
    
    const toUpdateMode = (id) => {
        setIsUpdating(true)
        setPostId(id)
    }

    const discard = () => {
        setIsUpdating(false)
        setNewContent("")
        setNewTitle("")
        setErrorMessage("")
    }

    useEffect(() => {
        getMyPosts()
    }, [])

    return (
        <div className="input-container">
            {isUpdating && 
                <UpdatingPost 
                    newTitle={newTitle}
                    setNewTitle={setNewTitle} 
                    newContent = {newContent} 
                    setNewContent = {setNewContent} 
                    discard= {discard} 
                    update = {update}/>
            }
            {
                errorMessage && <h2 className="incorrect">{errorMessage}</h2>
            }
            <h1 className='text'>MY POSTS </h1> 
            <h2><NavLink to="/allposts">SEE ALL POSTS</NavLink></h2>
            <NewPost />
        <ul>
        {myPosts.map(({ title,content,createdAt, _id: id }) => (
            <MyPost key={id} title={title} content={content} createdAt={createdAt} id={id} toUpdateMode={toUpdateMode}/> 
        ))}
        </ul>
        </div>
    )
}