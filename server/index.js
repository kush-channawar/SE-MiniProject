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
let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

 let d = date + "-" + month + "-" + year
var sids=new Array();
var present=new Array();
var courseName = ""
var courseNameStud =""
pool.connect(function(err){
  if(err)
  {
      console.log(err);
  }
});

let counter = 0; 
//upload student details
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
            let password = record.Password;
            let mac = record.MAC;
            let email = record.Email;
            pool.query("INSERT INTO student(sid, name, password,mac_add,email) VALUES($1, $2, $3, $4,$5)", [id, name,password,mac,email], function(err){
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
  // upload teacher details
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
  
      res.json({ fileName: file.name, filePath: `/uploads/teacher/${file.name}`});
      let csvStream = csv.parseFile(`${reqPath}/client/public/uploads/teacher/${file.name}`, { headers: true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 15)
        {
            let id = record.ID;
            let name = record.Name;
            let email = record.Email;
            let password = record.Password;
            pool.query("INSERT INTO teacher(tid, name, email, password) VALUES($1, $2, $3, $4)", [id, name, email,password], function(err){
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
  // get mac ids from attendance csv
  async function fetchmac(){
    try{
      mac_id = await pool.query("SELECT a.mac_add,a.sid FROM student a,course_enroll b ,courses c where a.sid = b.sid and b.cid = c.cid and c.cid = $1",[courseName]);
      //console.log(mac_id.rows[0].mac_add)
      for(let i =0;i<mac_id.rows.length;i++){
        macs.push((mac_id.rows[i].mac_add).toString());
        sids.push((mac_id.rows[i].sid).toString());
      }
      console.log(macs,sids)
    }
      catch(err){
        console.log(err)
      }
  }
  //confirm course 
  app.post('/dashboardteacher/confirmcourses',async(req,res)=>{

    const {course} = req.body
    try {
      const user = await pool.query("select * from courses where name = $1",[course])
      console.log(user.rows[0].cid)
      courseName = user.rows[0].cid    

    }
    catch(err) {
      console.log(err.message)

    }
  })

  app.post('/dashboardstudent/confirmcourses',async(req,res)=>{

    const {course} = req.body
    try {
      const user = await pool.query("select * from courses where name = $1",[course])
      console.log(course)
      courseNameStudent = course    

    }
    catch(err) {
      console.log(err.message)

    }
  })
  //upload student attendance
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
              console.log(sids[i], "is present")
              present.push(sids[i])
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
  // respond with the array of attendees
  app.post('/dashboardteacher/attended',(req,res)=>{
    res.json(present)
    console.log(sids)
    console.log(present)
    for(let i =0 ;i<sids.length;i++){
        for (let j=0;j<present.length;j++){
          if(sids[i]===present[j]){
              pool.query("insert into student_attend values ($1,$2,$3,1)",[sids[i],courseName,d])
              break
          }
          else{
            pool.query("insert into student_attend values ($1,$2,$3,0)",[sids[i],courseName,d])
            break
          }
        }
    }
    present.length=0;
    macs.length=0;
    sids.length=0;
  })

  // view timetable csv in table format
  app.post('/timetable',async(req,res)=>{
    try{
      const data = await pool.query("SELECT * FROM\
      timetable\
 ORDER BY \
      CASE\
           WHEN Day = 'Day' THEN 1\
           WHEN Day = 'Monday' THEN 2\
           WHEN Day = 'Tuesday' THEN 3\
           WHEN Day = 'Wednesday' THEN 4\
           WHEN Day = 'Thursday' THEN 5\
           WHEN Day = 'Friday' THEN 6\
      END ASC")
      //console.log(data.rows);
      var days = new Array();
      var p1 = new Array();
      var p2 = new Array();
      var p3 = new Array();
      var p4 = new Array();
      var p5 = new Array();
      var p6 = new Array();
      var p7 = new Array();
      var p8 = new Array();

      for(let i=0;i<data.rows.length;i++){
        days.push(data.rows[i].day)
        p1.push(data.rows[i].p1)
        p2.push(data.rows[i].p2)
        p3.push(data.rows[i].p3)
        p4.push(data.rows[i].p4)
        p5.push(data.rows[i].p5)
        p6.push(data.rows[i].p6)
        p7.push(data.rows[i].p7)
        p8.push(data.rows[i].p8)

      }
      console.log(days.toString())
      res.json({day :days,p1:p1,p2:p2,p3:p3,p4:p4,p5:p5,p6:p6,p7:p7,p8:p8})
    }
    catch(err){
        console.log(err);
    }
})
  // upload timetable csv
app.post('/dashboardadmin/uploadtimetable',(req,res)=>{
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
    counter = 0;


    let csvStream = csv.parseFile(`${reqPath}/client/public/uploads/student/${file.name}`, {skipLines:false, headers: ['a','b','c','d','e','f','g','h','i']})
  .on("data", function(record){
      csvStream.pause();
      
      if(counter < 6)
      {
          let day = record.a;
          let p1 = record.b;
          let p2 = record.c;
          let p3 = record.d;
          let p4 = record.e;
          let p5 = record.f;
          let p6 = record.g;
          let p7 = record.h;
          let p8 = record.i;
         
             pool.query("INSERT INTO timetable(day, p1,p2,p3,p4,p5,p6,p7,p8) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9)", [day,p1,p2,p3,p4,p5,p6,p7,p8], function(err){
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

})



app.use('/auth', require("./routes/jwtauth"));
app.use('/dashboardstudent', require("./routes/dashboardstudent"));
app.use('/dashboardteacher', require("./routes/dashboardteacher"));


app.use('/dashboardadmin', require("./routes/dashboardadmin"));

app.listen(5000, () => {
  console.log(d);
    console.log("server started on port 5000");
});
