import React, { useEffect } from 'react'
import  '../style/feed.scss'
import  Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../../shared/components/Nav'

const Feed = () => {

    const { feed, handleGetFeed, loading, handleLike, handleUnLike } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Feed is Loading</h1></main>)
    }



  return (
    <main className='feed-page'>
        <Nav />                   {/* nav section add krne ke liya ke liye yha likh dia us compnonent ko  */}
        <div className="feed">
            <div className="posts">
                {feed.map(post => {
                    return <Post key={post._id} users={post.users} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />
                })}
            </div>
        </div>
    </main>
  )
}

export default Feed
