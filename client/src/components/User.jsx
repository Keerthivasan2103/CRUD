// import React, { useState } from "react";

// const User = () => {
//   const [count, setCount] = useState(0);
//   const [person, setPerson] = useState({});

//   const increaseBy5 = () => {
//     for (let i = 0; i < 5; i++) {
//       setCount(prevState => prevState + 1);
//     }
//   }

//   const handlePersonChange = (e) => {
//     const { name, value } = e.target;
//     setPerson((prevPerson) => ({
//       ...prevPerson,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={() => setCount(count + 1)}>
//         Click here
//       </button>
//       <p className="text-center text-gray-700">Current count: <span className="font-semibold">{count}</span></p>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={() => increaseBy5()}>
//         Increase by 5
//       </button>

//       <input
//         type="text"
//         name="firstname"
//         onChange={handlePersonChange}
//         placeholder="First name"
//         className="w-full px-3 py-2 border border-gray-300 rounded-md mt-4"
//       />
//       <input
//         type="text"
//         name="lastname"
//         onChange={handlePersonChange}
//         placeholder="Last name"
//         className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
//       />

//       {/* <div className="bg-gray-100 p-2 rounded mt-4">
//         {JSON.stringify(person, null, 2)}
//       </div> */}

//       <p className="text-gray-700">
//         First name: <span className="font-semibold">{person.firstname}</span>
//       </p>
//       <p className="text-gray-700">
//         Last name: <span className="font-semibold">{person.lastname}</span>
//       </p>
//     </div>
//   );
// }

// export default User

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3001/')
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
        
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Link to="/create" className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 inline-block">
        Add User
      </Link>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2 text-left">Name</th>
              <th className="w-1/4 px-4 py-2 text-left">Email</th>
              <th className="w-1/4 px-4 py-2 text-left">Age</th>
              <th className="w-1/4 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.age}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <Link to={`/update/${user._id}`}>
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      toast.success("User Deleted successfully", { position: "top-center",style: { 
                      } });
                      handleDelete(user._id);
                    }}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   );
};


export default User;