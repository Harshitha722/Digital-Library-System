import { useEffect, useState }
from "react";

import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

import API
from "../services/api";

const Users = () => {

  const [users, setUsers] =
  useState([]);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res =
        await API.get(
          "/users"
        );

        setUsers(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

    fetchUsers();

  }, []);

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="books-container">

          <h2>
            Users
          </h2>

          <table>

            <thead>

              <tr>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {
                users.map(
                  (user) => (

                    <tr
                      key={user._id}
                    >

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.role}
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
};

export default Users;