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
var macs = new Array();
var names=new Array();
var present=new Array();
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



      let csvStream = csv.parseFile(`${reqPath}/client/public/uploads/student/${file.name}`, { headers: true,ignoreEmpty:true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 100)
        {
            let id = record.MIS;
            let name = record.Name;
            let email = record.Email;
            let password = record.Password;
            let mac = record.MAC;
            pool.query("INSERT INTO student(user_id, user_name, user_email, user_password,user_mac) VALUES($1, $2, $3, $4,$5)", [id, name, email,password,mac], function(err){
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
        console.log(macs)
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

  async function fetchmac(){
    try{
      mac_id = await pool.query("SELECT * FROM student")
      //console.log(mac_id.rows[0])
      for(let i =0;i<mac_id.rows.length;i++){
        macs.push((mac_id.rows[i].user_mac).toString());
        names.push((mac_id.rows[i].user_name).toString());
      }
      console.log(macs,names)
    }
      catch(err){
        console.log(err)
      }
  }
  
  app.post('/dashboardteacher/uploadstudent', async (req, res) => {
    try{
     await fetchmac()
     
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
  
      res.json({ fileName: file.name, filePath: `/uploads/student/${file.name}`});


      
      let csvStream = csv.parseFile(`${reqPath}/client/public/uploads/student/${file.name}`, { headers: ['name','mac'] })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 100)
        {
          let mac = record.mac
          //console.log(typeof(mac))
          //console.log(typeof(macs))
          //console.log(devname,mac)
          for(let i=0;i<macs.length;i++){
            if(macs[i]==mac){
              console.log(names[i], "is present")
              present.push(names[i])
            }
          }
          
            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
    
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });
    });
  }catch(err) {
    console.error(err.message);
  }
  });
  
  app.post('/dashboardteacher/attended',(req,res)=>{
    res.json(present)
    console.log(present)
    present.length=0;
    macs.length=0;
    names.length=0;
    console.log(present);
  })

  app.post('/timetable',async(req,res)=>{
    try{
      const data = await pool.query("select * from timetable")
      //console.log(data.rows);
      var days = new Array();
      var p1 = new Array();
      var p2 = new Array();
      var p3 = new Array();
      var p4 = new Array();
      var p5 = new Array();
      var p6 = new Array();
      var p7 = new Array();

      for(let i=0;i<data.rows.length;i++){
        days.push(data.rows[i].day)
        p1.push(data.rows[i].p1)
        p2.push(data.rows[i].p2)
        p3.push(data.rows[i].p3)
        p4.push(data.rows[i].p4)
        p5.push(data.rows[i].p5)
        p6.push(data.rows[i].p6)
        p7.push(data.rows[i].p7)

      }
      console.log(days.toString())
      res.json({day :days,p1:p1,p2:p2,p3:p3,p4:p4,p5:p5,p6:p6,p7:p7})
    }
    catch(err){
        console.log(err);
    }
})
app.use('/auth', require("./routes/jwtauth"));
app.use('/dashboardstudent', require("./routes/dashboardstudent"));
app.use('/dashboardteacher', require("./routes/dashboardteacher"));


app.use('/dashboardadmin', require("./routes/dashboardadmin"));

app.listen(5000, () => {
    console.log("server started on port 5000");
});
