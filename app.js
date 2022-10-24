require("dotenv").config();
const express = require("express"),
    app = express(),
    mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use(express.json());

const permitRout = require("./routes/permit")

app.use("/permits",permitRout);



app.use((err, req, res, next) => {
  err.status = err.status || 500 ;
  res.status(err.status).json({ con : false , msg : err.message})
})

app.listen(process.env.PORT, console.log(`Server is running at ${process.env.PORT}`))
