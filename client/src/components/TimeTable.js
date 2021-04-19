import React, { Fragment, useEffect, useState } from "react";
let dayArr =[];
let p1Arr=[];
let p2Arr=[];
let p3Arr=[];
let p4Arr=[];
let p5Arr=[];
let p6Arr=[];
let p7Arr=[];
const TimeTable = () => {
  const [days, setDays] = useState([]);
  const [p1,setp1] = useState([]);
  const [p2,setp2] = useState([]);
  const [p3,setp3] = useState([]);
  const [p4,setp4] = useState([]);
  const [p5,setp5] = useState([]);
  const [p7,setp7] = useState([]);
  const [p6,setp6] = useState([]);


  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/timetable", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      dayArr = parseData.day;
      p1Arr=parseData.p1;
      p2Arr=parseData.p2;
      p3Arr=parseData.p3;
      p4Arr=parseData.p4;
      p5Arr=parseData.p5;
      p6Arr=parseData.p6;
      p7Arr=parseData.p7;

      setDays(dayArr)
      setp1(p1Arr)
      setp2(p2Arr)
      setp3(p3Arr)
      setp4(p4Arr)
      setp5(p5Arr)
      setp6(p6Arr)
      setp7(p7Arr)
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      
    <div>
      <h1 classdays="mt-5">Dashboard Student</h1>
      <h2>Welcome ,Heres the TimeTable</h2>
      <br/>
  
      <br/>
      <br></br>
      <table id="myTABLE">
  <tr>
    <td>DAY</td>
    <td>P1</td>
    <td>P2</td>
    <td>P3</td>
    <td>P4</td>
    <td>P5</td>
    <td>P6</td>
    <td>P7</td>
  </tr>
  <tr>
  <td>{days[0]}</td>
    <td>{p1[0]}</td>
    <td>{p2[0]}</td>
    <td>{p3[0]}</td>
    <td>{p4[0]}</td>
    <td>{p5[0]}</td>
    <td>{p6[0]}</td>
    <td>{p7[0]}</td>
  </tr>
  <tr>
  <td>{days[1]}</td>
    <td>{p1[1]}</td>
    <td>{p2[1]}</td>
    <td>{p3[1]}</td>
    <td>{p4[1]}</td>
    <td>{p5[1]}</td>
    <td>{p6[1]}</td>
    <td>{p7[1]}</td>
  </tr>
  <tr>
  <td>{days[2]}</td>
    <td>{p1[2]}</td>
    <td>{p2[2]}</td>
    <td>{p3[2]}</td>
    <td>{p4[2]}</td>
    <td>{p5[2]}</td>
    <td>{p6[2]}</td>
    <td>{p7[2]}</td>
  </tr>
  <tr>
  <td>{days[3]}</td>
    <td>{p1[3]}</td>
    <td>{p2[3]}</td>
    <td>{p3[3]}</td>
    <td>{p4[3]}</td>
    <td>{p5[3]}</td>
    <td>{p6[3]}</td>
    <td>{p7[3]}</td>
  </tr>
  <tr>
  <td>{days[4]}</td>
    <td>{p1[4]}</td>
    <td>{p2[4]}</td>
    <td>{p3[4]}</td>
    <td>{p4[4]}</td>
    <td>{p5[4]}</td>
    <td>{p6[4]}</td>
    <td>{p7[4]}</td>
  </tr>
  
</table>
     
    
    </div>
    </Fragment>
  );
};


export default TimeTable;
