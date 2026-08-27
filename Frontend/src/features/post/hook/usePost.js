import { useContext } from 'react'
import {getFeed} from '../services/post.api'
import { PostContext } from '../post.context'


export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)                 //state ko manage kra 
        const data = await getFeed()     // api wale part ko bhi thoda manage kra
        setFeed(data.posts)
        setLoading(false)
    }

    return { loading, feed, post, handleGetFeed }

}