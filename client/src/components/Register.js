import React, { Fragment, useState } from "react";

import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    id:"",
    email: "",
    password: "",
    name: "",
  });

  const { id,email, password, name} = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {id, email, password, name };
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
      <input
          type="text"
          name="id"
          
          value={id}
          placeholder="ID"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          pattern="(?=.*\d)(?=.*[a-z]).{8,}"
          title="Must contain at least one number and lowercase letter, and at least 8 or more characters"
          required='true'
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          pattern="(?=.*[a-z])(?=.[A-Z])"
          title="Must contain lowercase letter Or Caps Only"

          value={name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <form action="/loginadministrator">
        
        <button class= "btn btn-warning btn-block"> Login</button></form>
        <br>
        </br>
    </Fragment>
  );
};

export default Register;