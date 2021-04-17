const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
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
