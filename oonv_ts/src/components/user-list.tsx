import { useEffect, useState } from "react"
import { IUser } from "../interfaces"
import { Card, Spinner } from "react-bootstrap"
import ph_pic from "../static/woman.jpg"

const UserList = () => {
    const [ users, setUsers ] = useState<IUser[]>([])
    useEffect(() => {
            const fetchUsers = async () => {
                const response = await fetch("http://localhost:4000/api/users", { method: "GET" })
                const json = await response.json()
                //console.log("UseEffect json ", json)
                if (response.ok){
                    setUsers(json)
                }
            }
            fetchUsers();
        }, []);
    return(
        <div className="user-list">
            <h2>Users</h2>
            { users.length > 0 ?  
            
                ( users.map((user: IUser) => (

                    <Card key={user._id} className="user-card">
                        <img src={ph_pic} />
                        <Card.Title>{user.username}</Card.Title>
                    </Card>

                )) )
             : <Spinner animation="border" role="status"></Spinner>}
        </div>
    )
}

export default UserList;