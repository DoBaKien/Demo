import { createContext, useState, useEffect } from "react";

const UserContext = createContext()

export const UserProvider =({children})=>{
    const [users, setUsers] = useState('')
    const [members, setMembers] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/users')
            const responseJSON = await response.json()
            setUsers(responseJSON)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/members')
            const responseJSON = await response.json()
            setMembers(responseJSON)
        }
        fetchData()
    }, [])

    const createUser = async({name, userName, email, password})=>{
        const response= await fetch('http://localhost:3001/users',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, userName, email, password})
        })

        const data = response.json()
        setUsers([data,...users])
    }

    const createMember = async({name, userName, email, phone})=>{
        const response= await fetch('http://localhost:3001/members',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, userName, email, phone})
        })

        const data = response.json()
        setUsers([data,...users])
    }

    const deleteMember = async(id)=>{
        await fetch(`http://localhost:3001/members/${id}`, {method: 'DELETE'})
        setMembers(members.filter((member)=> member.id !== id))
    } 

    return(
        <UserContext.Provider value={{users, createUser, members, createMember, deleteMember}}  >
            {children}
        </UserContext.Provider>
    )
}
export default UserContext