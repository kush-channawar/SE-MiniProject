import React, { Fragment, useState } from "react";
import Header from "../Header"

import { toast } from "react-toastify";

const SendReminder = () => {
  const [inputs, setInputs] = useState({
    details: "",
    coursename: ""
  });

  const { details, coursename } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        toast.success("Reminder Set! Check email")
      const body = { details, coursename };
      const response = await fetch(
        "http://localhost:5000/dashboardstudent/sendemail",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }

       
      );
      console.log("sent")


      
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Header/>
      <h1 className="mt-5 text-center"></h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="details"
          value={details}
          placeholder="details"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="coursename"
          value={coursename}
          placeholder="coursename"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button class="btn btn-success btn-block">Send Email Reminder</button>
      </form>
      <form action = "/dashboardstudent"><button className='btn btn-danger btn-block mt-4'> Go Back</button></form>
    
    </Fragment>
  );
};

export default SendReminder;