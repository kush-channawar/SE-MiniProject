import React, { Fragment, useState ,useEffect} from "react";

import { toast } from "react-toastify";




const Confirm = ({ setAuth }) => {


    const [leng,setLeng]=useState(0)
    const [corse,setCorse] = useState([]);
    const [inputs, setInputs] = useState({
        course: ""
  });

  const { course } = inputs;


  const getCourses = async ()=>{
    try {
      const res = await fetch("http://localhost:5000/dashboardteacher/courses", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setCorse(parseData);
      setLeng(parseData.length)
    } catch (err) {
      console.error(err.message);
    }
  }

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { course };
      toast.success('Validated successfully')
      await fetch(
        "http://localhost:5000/dashboardteacher/confirmcourses",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      


      
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Login Teacher</h1>
      <form onSubmit={onSubmitForm}>
      
          <select name = "course" id="course" onChange ={e=> onChange(e)}>
          <option name= "choose course" value = "null" >Choose Your Course  </option>
              <option name= {corse[0]} value = {corse[0]} >{corse[0]}  </option>
              {leng>1 ? (
            <option name = {corse[1]} value = {corse[1]} > {corse[1]}</option>
      ) : null}
          </select>
        <button class="btn btn-success btn-block">Validate</button>
      </form>
      <br/>
      <br></br>
      <form action="/dashboardteacher/uploadstudent">
      <button className="btn btn-secondary">Upload Student Attendance csv</button>
      
      </form>
    </Fragment>
  );
};

export default Confirm;