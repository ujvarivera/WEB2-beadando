export default function Post({ id, title, content, createdAt, createdBy }) {
    /* Return one post */
    const date = new Date(createdAt)

    const hungarianDate = date.toLocaleString('hu-HU', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit' }
    )

    return (
        <div key={id} className = "post-frame">
            <h1>{title}</h1>
            <h2>{content}</h2>
            <h3 className="post-username">user: {createdBy.username}</h3>
            <h4>{hungarianDate}</h4>
        </div>
    )
}