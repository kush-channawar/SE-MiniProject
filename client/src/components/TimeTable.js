import React, { Fragment, useEffect, useState } from "react";
import "./tt.css"
let dayArr =[];
let p1Arr=[];
let p2Arr=[];
let p3Arr=[];
let p4Arr=[];
let p5Arr=[];
let p6Arr=[];
let p7Arr=[];
let p8Arr=[];
const TimeTable = () => {
  const [days, setDays] = useState([]);
  const [p1,setp1] = useState([]);
  const [p2,setp2] = useState([]);
  const [p3,setp3] = useState([]);
  const [p4,setp4] = useState([]);
  const [p5,setp5] = useState([]);
  const [p7,setp7] = useState([]);
  const [p6,setp6] = useState([]);
  const [p8,setp8] = useState([]);

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
      p8Arr=parseData.p8;

      setDays(dayArr)
      setp1(p1Arr)
      setp2(p2Arr)
      setp3(p3Arr)
      setp4(p4Arr)
      setp5(p5Arr)
      setp6(p6Arr)
      setp7(p7Arr)
      setp8(p8Arr)
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
      
      
      <h2>Welcome, TimeTable for SEM-6</h2>
      <br/>
  
      <br/>
      <br></br>
      <div class="container">
                <div class="timetable-img text-center">
                    <img src="img/content/timetable.png" alt=""/>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr class="bg-light-gray">
                                <th class="text-uppercase">{days[0]}
                                </th>
                                <th class="text-uppercase">{p1[0]}</th>
                                <th class="text-uppercase">{p2[0]}</th>
                                <th class="text-uppercase">{p3[0]}</th>
                                <th class="text-uppercase">{p4[0]}</th>
                                <th class="text-uppercase">{p5[0]}</th>
                                <th class="text-uppercase">{p6[0]}</th>
                                <th class="text-uppercase">{p7[0]}</th>
                                <th class="text-uppercase">{p8[0]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th class="align-middle">{days[1]}</th>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{p1[1]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p2[1]}</span>
                                     
                                      
                                </td>

                                <td>
                                    <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p3[1]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p4[1]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p5[1]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p6[1]}</span>
                                     
                                       
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p7[1]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p8[1]}</span>
                                     
                                      
                                </td>
                            </tr>

                            <tr>
                                <th class="align-middle">{days[2]}</th>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{p1[2]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p2[2]}</span>
                                     
                                      
                                </td>

                                <td>
                                    <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p3[2]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p4[2]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p5[2]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p6[2]}</span>
                                     
                                       
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p7[2]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p8[2]}</span>
                                     
                                      
                                </td>
                            </tr>
							<tr>
                                <th class="align-middle">{days[3]}</th>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{p1[3]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p2[3]}</span>
                                     
                                      
                                </td>

                                <td>
                                    <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p3[3]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p4[3]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p5[3]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p6[3]}</span>
                                     
                                       
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p7[3]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p8[3]}</span>
                                     
                                      
                                </td>
                            </tr>
							<tr>
                                <th class="align-middle">{days[4]}</th>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{p1[4]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p2[4]}</span>
                                     
                                      
                                </td>

                                <td>
                                    <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p3[4]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p4[4]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p5[4]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p6[4]}</span>
                                     
                                       
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p7[4]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p8[4]}</span>
                                     
                                      
                                </td>
                            </tr>
							<tr>
                                <th class="align-middle">{days[5]}</th>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{p1[5]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p2[5]}</span>
                                     
                                      
                                </td>

                                <td>
                                    <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p3[5]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p4[5]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p5[5]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p6[5]}</span>
                                     
                                       
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p7[5]}</span>
                                     
                                      
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{p8[5]}</span>
                                     
                                      
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
     
<form action = "/dashboardstudent"><button className='btn btn-danger btn-block mt-4'> Go Back</button></form>
    </div>
    </Fragment>
  );
};


export default TimeTable;
