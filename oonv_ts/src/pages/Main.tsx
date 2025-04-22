import { Container } from "react-bootstrap";
import PostList from "../components/post-list";
import UserList from "../components/user-list";
import FormFactory from "../components/form-factory";
const Main = () => {
    
    return(
    <>
    <Container className="main-container">
            
            <PostList />
            <UserList />
    </Container>
    </>);
}
export default Main;