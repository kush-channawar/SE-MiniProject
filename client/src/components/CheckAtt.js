import React, { useEffect, useState } from "react";


const CheckAtt = () => {
  const [count, setCount] = useState(0);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboardstudent/getcount", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setCount(parseData);
      console.log(parseData)
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
      <h2> Your Attendance Count for the Subject is {count}</h2>
      <form action = "/dashboardstudent"><button className='btn btn-danger btn-block mt-4'> Go Back</button></form>
    </div>
  );
};

export default CheckAtt;