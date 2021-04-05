const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/auth', require("./routes/jwtauth"));
app.use('/dashboardstudent', require("./routes/dashboardstudent"));
app.use('/dashboardteacher', require("./routes/dashboardteacher"));
app.use('/dashboardadmin', require("./routes/dashboardadmin"));

app.listen(5000, () => {
    console.log("server started on port 5000");
});
