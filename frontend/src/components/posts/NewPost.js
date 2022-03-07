import React, { useState } from 'react'
import axios from 'axios'

export default function Posts() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const post = async() => {
        try {
            if (title === "") {
                alert("title missing")
                return
            } else if (content === "") {
                alert("content is missing")
                return
            }
            const { data } = await axios.post('/api/posts', {
              title,
              content
            })
            window.location.reload(true)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="new-post-text">
            <h2>New Post:</h2>
            <p>
            <input
                className="title-input" 
                placeholder="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </p>
            <p>
            <input 
                className="content-input"
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            </p>
            <button 
                className="post-button" 
                onClick={post}>
                    Post
            </button>
        </div>
    )
}