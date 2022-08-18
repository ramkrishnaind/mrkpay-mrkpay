import React, { useEffect, useState } from "react";
import axios from "axios";
import UserReport from "./UserReport/UserReport";
function Reports() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/users";
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {users.length == 0 ? (
        <h1>Fetching Users</h1>
      ) : (
        <UserReport users={users} />
      )}
    </div>
  );
}

export default Reports;
