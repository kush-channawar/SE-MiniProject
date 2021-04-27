const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
let cour =[]

router.post("/courses", authorize, async (req, res) => {
  try {
  
    const user = await pool.query(
      "SELECT c.name FROM student a,course_enroll b,courses c  WHERE a.sid = $1 and a.sid= b.sid and b.cid=c.cid",
      [req.user.id] 
    );
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
    
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;