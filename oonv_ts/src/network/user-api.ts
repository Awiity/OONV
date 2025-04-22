import { IUser } from "../interfaces"
async function fetchData(input: string, init: RequestInit) {
    const response = await fetch(input, init)
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        throw Error(errorMessage)
    }
}

export async function createUser(user: IUser) {
    const response = await fetchData(
        "http://localhost:4000/api/users/", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    )
    return response.json()
}
/*
export async function updatePost(postId: string, post: IPost) {
    const response = await fetchData("http://localhost:4000/api/posts/" + postId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
    return response.json();
}
*/
export async function deleteUJser(userId: string) {
    const response = await fetchData("http://localhost:4000/api/users/" + userId, { method: "DELETE" });
    return response
}