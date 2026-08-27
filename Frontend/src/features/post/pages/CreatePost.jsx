import React,{useState, useRef} from 'react'
import "../style/createPost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {

  const [caption, setcaption] = useState("")
  const postImageInputFieldRef = useRef(null)

  const navigate = useNavigate()

  const { loading, handleCreatePost } = usePost()

  async function handleSubmit(e){
    e.preventDefault()

    const file = postImageInputFieldRef.current.files[0]

    await handleCreatePost(file,caption) //this part is after making createpost function in hook

    navigate('/')   //post create hone ke bdd wapis home page pr bhej denge
  }

  if(loading){
    return (
        <main>
            <h1>creating post</h1>
        </main>
    )
  }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create post</h1>
            <form onSubmit={handleSubmit} >
                <label className='post-image-label' htmlFor="postImage">Select image</label>
                <input ref={postImageInputFieldRef} hidden type="file" name='postImage' id='postImage' />
                <input 
                value={caption}
                onChange={(e)=>{setcaption(e.target.value)}}
                type="text" name='caption' id='caption' placeholder='Enter Caption' />
                <button className='button primary-button'> create post </button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
