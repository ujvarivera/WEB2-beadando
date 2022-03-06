import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Posts() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const post = async() => {
        try {
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
        <div className="new-post">
            <h2>New Post:</h2>
            <p>
            <input 
                placeholder="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </p>
            <p>
            <input 
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            </p>
            <button onClick={post}>Post</button>
        </div>
    )
}