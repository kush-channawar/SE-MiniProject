const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
let nodemailer = require('nodemailer');
let cour =[]
var courseNameStudent=""
var studentID = []
var studentEmail =""

router.post('/getcount', async (req,res)=>{

  const count = await pool.query("Select Sum(Present) from student_attend where sid=$1 and cid=$2 ",[studentID,courseNameStudent]);
  console.log(count.rows[0].sum)
  res.json(count.rows[0].sum)
  
})

router.post('/sendemail',(req,res)=>{
  const { details, coursename } = req.body;
  let mailOptions = {
    from: 'kvcalt1707@gmail.com',
    to: studentEmail,
    subject: 'Your Reminder! for : ' + coursename,
    text: details
};

// e-mail transport configuration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kvcalt1707@gmail.com',
      pass: 'Kvc17*WAR'
    }
});


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});

})

router.post('/confirmcourses',async(req,res)=>{

  const {course} = req.body
  try {
    const user = await pool.query("select * from courses where name = $1",[course])
    courseNameStudent = user.rows[0].cid    
    console.log(courseNameStudent)
  }
  catch(err) {
    console.log(err.message)

  }
})

router.post("/courses", authorize, async (req, res) => {
  try {
  
    const user = await pool.query(
      "SELECT c.name FROM student a,course_enroll b,courses c  WHERE a.sid = $1 and a.sid= b.sid and b.cid=c.cid",
      [req.user.id] 
    );
    studentID=req.user.id;
    console.log(studentID);
    for (let i =0;i<user.rows.length;i++){
      cour[i]=user.rows[i].name;
    }

    
    
    res.json(cour);
    cour.length=0;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT name FROM student WHERE sid = $1",
      [req.user.id] 
    ); 
    const user1 = await pool.query(
      "SELECT email FROM student WHERE sid = $1",
      [req.user.id] 
    ); 
    studentEmail=user1.rows[0].email
    console.log(studentEmail)
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;