import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Table() {
    
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/')
        } 
    },[])

    const handleLogOut=()=>{
        localStorage.removeItem("token")
        navigate('/login')
    }
    
    return (
        <>
            <button onClick={()=>{handleLogOut() }}>
                Log out</button>
        </>
    );
}

export default Table;