var fs = require('fs');
var csv = require('fast-csv');
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')
const pool = require('./db');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

pool.connect(function(err){
  if(err)
  {
      console.log(err);
  }
});

let counter = 0; 

app.post('/dashboardadmin/uploadstudent', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    let reqPath = path.join(__dirname, '../')
    file.mv(`${reqPath}/client/public/uploads/student/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/student/${file.name}` });



      let csvStream = csv.parseFile(`${reqPath}/client/public/uploads/student/${file.name}`, { headers: true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 100)
        {
            let id = record.MIS;
            let name = record.Name;
            let email = record.Email;
            let password = record.Password;
            pool.query("INSERT INTO student(user_id, user_name, user_email, user_password) VALUES($1, $2, $3, $4)", [id, name, email,password], function(err){
                if(err)
                {
                    console.log(err);
                }
            });
            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });
    });
  });
  
  app.post('/dashboardadmin/uploadteacher',(req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    let reqPath = path.join(__dirname, '../')
    file.mv(`${reqPath}/client/public/uploads/teacher/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/teacher/${file.name}` });
      let csvStream = csv.parseFile(`${reqPath}/client/public/uploads/teacher/${file.name}`, { headers: true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 100)
        {
            let id = record.MIS;
            let name = record.Name;
            let email = record.Email;
            let password = record.Password;
            pool.query("INSERT INTO teacher(user_id, user_name, user_email, user_password) VALUES($1, $2, $3, $4)", [id, name, email,password], function(err){
                if(err)
                {
                    console.log(err);
                }
            });
            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });
    });
  });
  
app.use('/auth', require("./routes/jwtauth"));
app.use('/dashboardstudent', require("./routes/dashboardstudent"));
app.use('/dashboardteacher', require("./routes/dashboardteacher"));


// Upload Endpoint

app.use('/dashboardadmin', require("./routes/dashboardadmin"));

app.listen(5000, () => {
    console.log("server started on port 5000");
});
