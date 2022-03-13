import axios from 'axios'
import { FaEdit, FaTrashAlt } from "react-icons/fa"

export default function MyPost({ id, title, content, createdAt, toUpdateMode }) {
    /* Return one post which is mine, with delete and updating buttons. */
    
    const date = new Date(createdAt)

    const hungarianDate = date.toLocaleString('hu-HU', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit' }
    )

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

    return (
        <div key={id} className = "post-frame">
            <h1>{title}</h1>
            <h2>{content}</h2>
            <h4>{hungarianDate}</h4>
            <button 
                className="delete-button" 
                onClick={() => deleteMyPost(id)}>
                    <FaTrashAlt />
            </button>
            <button 
                className="update-button" 
                onClick={() => toUpdateMode(id)}>
                    <FaEdit />
             </button>
        </div>
    )
}