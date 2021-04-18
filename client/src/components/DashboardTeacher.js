import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboardteacher/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Dashboard Teacher</h1>
      <h2>Welcome {name}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
      <br/>
      <br></br>
      <form action="/dashboardteacher/uploadstudent">
      <button className="btn btn-secondary"> Upload Student csv</button>
      </form>
    </div>
  );
};

export default Dashboard;