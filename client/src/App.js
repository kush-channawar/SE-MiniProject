import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { toast } from "react-toastify";

//components

import LoginStudent from "./components/LoginStudent";
import LoginTeacher from "./components/LoginTeacher";
import LoginAdmin from "./components/LoginAdmin";
import Register from "./components/Register";
import UploadStudent from "./components/UploadStudent"
import UploadTeacher from "./components/UploadTeacher"
import DashboardStudent from "./components/DashboardStudent";
import DashboardTeacher from "./components/DashboardTeacher";
import DashboardAdmin from "./components/DashboardAdmin";
import Header from "../src/Header"
import UploadAttendance from"./components/UploadAttendance";
import TimeTable from "./components/TimeTable"
import UploadTimeTable from "./components/UploadTimeTable"
import Confirm from "./components/ConfirmCourse";
import Faq from "./components/FAQ"
import Enrolled from './components/Enrolled'
import CheckAtt from "./components/CheckAtt"
import SendReminder from "./components/SendReminder";
toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          
          <Switch>
          <Route
              exact
              path="/dashboardstudent/checkatt"
              render={props =>
                !isAuthenticated ? (
                  <CheckAtt {...props} />
                ) : (
                  <CheckAtt/>
                )
              }
            />
             <Route
              exact
              path="/dashboardstudent/sendemailoptions"
              render={props =>
                !isAuthenticated ? (
                  <SendReminder {...props} />
                ) : (
                  <SendReminder/>
                )
              }
            />
          <Route
              exact
              path="/timetable"
              render={props =>
                !isAuthenticated ? (
                  <TimeTable {...props} setAuth={setAuth} />
                ) : (
                  <TimeTable/>
                )
              }
            />
            <Route
              exact
              path="/dashboardadmin/uploadtimetable"
              render={props =>
                !isAuthenticated ? (
                  <UploadTimeTable {...props} setAuth={setAuth} />
                ) : (
                  <UploadTimeTable/>
                )
              }
            />
            <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Header {...props} />
                ) : (
                  <Header/>
                )
              }
            />
            <Route
              exact
              path="/loginstudent"
              render={props =>
                !isAuthenticated ? (
                  <LoginStudent {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboardstudent" />
                )
              }
            />
            
            <Route
              exact
              path="/loginteacher"
              render={props =>
                !isAuthenticated ? (
                  <LoginTeacher {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboardteacher" />
                )
              }
            />
            <Route
              exact
              path="/loginadministrator"
              render={props =>
                !isAuthenticated ? (
                  <LoginAdmin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboardadmin" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboardadmin" />
                )
              }
            />
           
            <Route
              exact
              path="/dashboardstudent"
              render={props =>
                isAuthenticated ? (
                  <DashboardStudent {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/loginstudent" />
                )
              }
            />
            <Route
              exact
              path="/dashboardteacher"
              render={props =>
                isAuthenticated ? (
                  <DashboardTeacher {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/loginteacher" />
                )
              }
            />
            <Route
              exact
              path="/dashboardadmin"
              render={props =>
                isAuthenticated ? (
                  <DashboardAdmin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/loginadministrator" />
                )
              }
            />
            <Route
              exact
              path="/dashboardadmin/uploadteacher"
              render={props =>
                isAuthenticated ? (
                  <UploadTeacher  setAuth={setAuth} />
                ) : (
                  <UploadTeacher/>
                )
              }
            />
            <Route
              exact
              path="/dashboardadmin/uploadstudent"
              render={props =>
                isAuthenticated ? (
                  <UploadStudent  setAuth={setAuth} />
                ) : (
                  <UploadStudent/>
                )
              }
            />
            <Route
              exact
              path="/dashboardteacher/uploadstudent"
              render={props =>
                isAuthenticated ? (
                  <UploadAttendance  setAuth={setAuth} />
                ) : (
                  <UploadAttendance/>
                )
              }
            />
            <Route
              exact
              path="/dashboardteacher/confirmcourse"
              render={props =>
                isAuthenticated ? (
                  <Confirm  setAuth={setAuth} />
                ) : (
                  <Confirm/>
                )
              }
            />
            <Route
              exact
              path="/faq"
              render={props =>
                isAuthenticated ? (
                  <Faq/>
                ) : (
                  <Faq/>
                )
              }
            />
            <Route
              exact
              path="/enrolledcourses"
              render={props =>
                isAuthenticated ? (
                  <Enrolled/>
                ) : (
                  <Enrolled/>
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;