const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

let cour =[]

router.post("/courses", authorize, async (req, res) => {
  try {
  
    const user = await pool.query(
      "SELECT b.name FROM teacher a,courses b  WHERE a.tid = $1 and a.tid= b.tid ",
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
      "SELECT name FROM teacher WHERE tid = $1",
      [req.user.id] 
    ); 

    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});




module.exports = router;