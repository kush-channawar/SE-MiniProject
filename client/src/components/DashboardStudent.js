import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboardstudent/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.name);
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
      <h1 className="mt-5">Dashboard Student</h1>
      <h2>Welcome {name}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
      

      <form action="/timetable">
      <button className="btn btn-success">View TimeTable</button>
      </form>
      <form action="/enrolledcourses">
      <button className="btn btn-success">View Enrolled Courses</button>
      </form>
    </div>
  );
};

export default Dashboard;