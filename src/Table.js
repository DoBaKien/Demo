import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Table() {
  const [users, setUsers] = useState("");

  useEffect(()=>{axios
    .get("user", {
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res);
      setUsers(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
},[])

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => {
          handleLogOut();
        }}
      >
        Log out
      </button>
      <div>
          {users &&
            users.map((user) => (
              <div key={user._id}>
                <ul>{user._id} </ul>
                <ul>{user.username} </ul>
              </div>
            ))}
        </div>
    </>
  );
}

export default Table;
