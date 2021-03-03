const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/auth', require("./routes/jwtauth"));
app.use('/dashboard', require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("server started on port 5000");
});
