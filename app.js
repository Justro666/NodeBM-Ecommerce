require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

const { validateToken, validateHasRoles } = require("./utils/validator")

app.use(express.json());

const permitRout = require("./routes/permit")
const roleRout = require("./routes/role")
const userRoute = require("./routes/user")

app.use("/permits", permitRout);
app.use("/roles", validateToken(), validateHasRoles(["Owner", "Manager", "Supervisor"]), roleRout);
app.use("/users", userRoute);

const defaultUser = async () => {
  let migrate = require("./migration/migrator");
  // await migrate.migrate()
  // await migrate.backup()
  // await migrate.rpMigrate()
  // await migrate.addOwnerRole()
}

// defaultUser();

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({ con: false, msg: err.message })
})

app.listen(process.env.PORT, console.log(`Server is running at ${process.env.PORT}`))
