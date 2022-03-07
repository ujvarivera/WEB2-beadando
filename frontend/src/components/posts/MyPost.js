import axios from 'axios'

export default function MyPost({ id, title, content, createdAt, toUpdateMode }) {
    /* Return one post which is mine, with delete and updating buttons. */
    
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
            <h4>{createdAt}</h4>
            <button 
                className="delete-button" 
                onClick={() => deleteMyPost(id)}>
                    delete
            </button>
            <button 
                className="update-button" 
                onClick={() => toUpdateMode(id)}>
                    update
             </button>
        </div>
    )
}