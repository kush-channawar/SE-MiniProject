import React, { Fragment, useState ,useEffect} from "react";

import { toast } from "react-toastify";




const Enrolled = ({ setAuth }) => {


    const [leng,setLeng]=useState(0)
    const [corse,setCorse] = useState([]);
    const [inputs, setInputs] = useState({
        course: ""
  });

  const { course } = inputs;


  const getCourses = async ()=>{
    try {
      const res = await fetch("http://localhost:5000/dashboardstudent/courses", {
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
        "http://localhost:5000/dashboardstudent/confirmcourses",
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
      <h1 className="mt-5 text-center">Courses You Are Currently Enrolled In : </h1>
      <form onSubmit={onSubmitForm}>
      
          <select name = "course" id="course" onChange ={e=> onChange(e)}>
          <option name= "choose course" value = "null" >Choose Your Course  </option>
              <option name= {corse[0]} value = {corse[0]} >{corse[0]}  </option>
              {leng>1 ? (
            <option name = {corse[1]} value = {corse[1]} > {corse[1]}</option>
      ) : null}
      {leng>2 ? (
            <option name = {corse[2]} value = {corse[2]} > {corse[2]}</option>
      ) : null}
      {leng>3 ? (
            <option name = {corse[3]} value = {corse[3]} > {corse[3]}</option>
      ) : null}
      {leng>4 ? (
            <option name = {corse[4]} value = {corse[4]} > {corse[4]}</option>
      ) : null}
      {leng>5 ? (
            <option name = {corse[5]} value = {corse[5]} > {corse[5]}</option>
      ) : null}
      {leng>6 ? (
            <option name = {corse[6]} value = {corse[6]} > {corse[6]}</option>
      ) : null}
      {leng>7 ? (
            <option name = {corse[7]} value = {corse[7]} > {corse[7]}</option>
      ) : null}
      {leng>8 ? (
            <option name = {corse[8]} value = {corse[8]} > {corse[8]}</option>
      ) : null}
      {leng>9 ? (
            <option name = {corse[9]} value = {corse[9]} > {corse[9]}</option>
      ) : null}
      {leng>10 ? (
            <option name = {corse[10]} value = {corse[10]} > {corse[10]}</option>
      ) : null}
      {leng>11 ? (
            <option name = {corse[11]} value = {corse[11]} > {corse[11]}</option>
      ) : null}
      {leng>12 ? (
            <option name = {corse[12]} value = {corse[12]} > {corse[12]}</option>
      ) : null}
          </select>
        <button class="btn btn-success btn-block">Validate</button>
      </form>
      <br/>
      <br></br>
    </Fragment>
  );
};

export default Enrolled;