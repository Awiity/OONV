import { useEffect, useState } from "react";
import {IPost} from "../interfaces";
import { Button, Card, Spinner } from "react-bootstrap"
import { deletePost } from "../network/post-api";

const PostList = () => {

    const [ posts, setPosts ] = useState<IPost[]>([])

    const handleDelete = async (id: string) => {
        const response = await deletePost(id);
        if(!response.ok){
            alert({error: "Something went wrong"})
            console.log("handleDelete error: ", response)
        } else {
            setPosts((l: IPost[]) => l.filter(item => item._id !== id))
        }

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("http://localhost:4000/api/posts", { method: "GET" })
            const json = await response.json()
            console.log("UseEffect json ", json)
            if (response.ok){
                setPosts(json)
            }
        }
        fetchPosts();
    }, [])
    return(
        <div className="post-list">
            <h2>Posts</h2>
            {posts.length > 0 ? (
                posts.map((post: IPost) => (

                    
                    <Card className="post-card" key={post._id}>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>{post.body}</Card.Text>
                            <Button onClick={() => handleDelete(post._id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                    
                ))
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default PostList;