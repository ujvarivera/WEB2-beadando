import {FaCheck, FaBackspace} from "react-icons/fa";

export default function UpdatingPost({ newTitle, setNewTitle, newContent, setNewContent, discard, update }) {
    /* Updating form of a post */

    return (
        <div>
        <h2>You can update here:</h2>
        <p>
        <input 
            className='new-title-input'
            placeholder='set new title'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
        />
        </p>
        <p>
        <input
            className='new-content-input'
            placeholder='set new content'
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
        />
        </p>
        <p>
        <button 
            className='discard-button' 
            onClick={discard}>
                <b>Discard</b> <FaBackspace />
        </button>
        </p>
        <p>
        <button 
            className='finish-updating-button' 
            onClick={update}>
                <b>Finish</b> <FaCheck />
        </button>
        </p>
    </div>         
    )
}