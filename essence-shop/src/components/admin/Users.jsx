import axios from "axios";
import { useEffect, useState } from "react";
import backendRoutes from "../../routes/backendROutes";
import Loader from "../Loader";
import AdminSessionExpired from "./AdminSessionExpired";

const Users = () => {

  const [loading, setLoading] = useState(true);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [userData, setUserData] = useState([]);


  const fetchUsers = async () => {
    try {
        console.log("Fetching Users");
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(
          backendRoutes.admin.getUsers,
          {headers: {
            Authorization: `Bearer ${token}`
          }}
        )

        if(!response.data) {
          console.log("Error Fetching Data");
          return
        }

        const {data} = response.data;
        setUserData(data);

    } catch (error) {

      const {response} = error;
      if(response.status === 401) {
        setIsSessionExpired(true);
        return
      }
      console.error("Error Fecthing Users Data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers();
  },[])

  
  const buttons = [
    "Id",
    "FirstName",
    "LastName",
    'Address',
    "Gender",
    "Birthday",
    "MobileNumber",
    "Email",
    "Rating",
    "TotalRating",
    "ProductCount",
    "Actions"
  ]

  if(loading) {
    return <Loader/>
  }

  return (
    <div className="users">
      {isSessionExpired && <AdminSessionExpired/>}
        <table>
          <thead>
            <tr>
              {buttons.map((button, index) => (
                <th key={index}>{button}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
               <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address ?? 'No Address Added'}</td>
                  <td>{user.gender}</td>
                  <td>{new Date(user.birthday).toLocaleDateString()}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.rating}</td>
                  <td>{user.totalRating}</td>
                  <td>{user.productCount}</td>
                  <td>
                    <div className="actions">
                      <button>BLOCK</button>
                      <button>UPDATE</button>
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Users
