import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { IPost, IUser } from "../interfaces";
import { createUser } from "../network/user-api";
import { createPost } from "../network/post-api";

const FormFactory = () => {
    const [ selected, setSelected ] = useState<string>("User");
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    //const [ submitError, setSubmitError ] = useState<string>("");
    const [ post, setPost ] = useState<IPost>({ title: "", body: "" });
    const [ user, setUser ] = useState<IUser>({ username: "", email: "" });

    const handleSubmitUser = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        const response = await createUser(user);
        if (!response.ok){
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }
    const handleSubmitPost = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        const response = await createPost(post);
        if (!response.ok){
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    return(
        <div className="form-factory">
            <Form.Select className="mb-3" value={selected} onChange={(e) => setSelected(e.target.value)}><option value="User">User</option><option value="Post">Post</option></Form.Select>
            
                { selected === "User" ? ( 
                <Form onSubmit={handleSubmitUser}><FormGroup className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={e => setUser({...user, username: e.target.value})} placeholder="Username"/>
                </FormGroup>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => setUser({...user, email: e.target.value})} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                { isLoading ? <Spinner /> : <p>Submit</p> }
                </Button></Form>) : (
                    <Form onSubmit={handleSubmitPost}>
                        <FormGroup className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={e => setPost({...post, title: e.target.value})} placeholder="Title"/>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label>Body</Form.Label>
                            <Form.Control onChange={e => setPost({...post, body: e.target.value})} placeholder="Enter text here..."></Form.Control>
                            <Form.Text className="text-muted">Content of your Post</Form.Text>
                        </FormGroup>
                        <Button variant="primary" type="submit" disabled={isLoading}>{ isLoading ? <Spinner /> : <p>Submit</p> }</Button>
                    </Form>)
                    }
            
        </div>
    );
}

export default FormFactory;