export default function Post({ id, title, content, createdAt }) {
    /* Return one post */
    return (
        <div key={id} className = "post-frame">
            <h1>{title}</h1>
            <h2>{content}</h2>
            <h4>{createdAt}</h4>
        </div>
    )
}