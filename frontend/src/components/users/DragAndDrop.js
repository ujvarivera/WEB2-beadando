import React, { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

const DragAndDrop = () => {
  const [file, setFile] = useState()
  const [progress, setProgress] = useState(0)

  const onDrop = (files) => {
    setFile(files[0])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  })

  const upload = async () => {
    const formData = new FormData()
    setProgress(0)
    formData.append('image', file)
    const { data } = await axios.post('/api/images', formData, {
      onUploadProgress: (e) => {
        if (e.lengthComputable) {
          setProgress((e.loaded / e.total) * 100)
        }
      },
    })
    console.log(data)
    window.location.reload(true)
  }

  return (
    <div>
      <input
        type="file"
        accept="image/png image/jpg"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>upload</button>

      {Math.round(progress)}%
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop it here!</p>
        ) : (
          <p>Drag and drop some files here, or click to select files.</p>
        )}
      </div>
    
      <p>
        {file && 
        <div>
        <h2>Preview your profile pic:</h2>
        <img className="preview" src={URL.createObjectURL(file)} alt="preview" />
        </div>
        }
      </p>
      
    </div>
  )
}

export default DragAndDrop
