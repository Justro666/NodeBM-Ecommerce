const DB = require("../models/user");
const roleDB = require("../models/role");
const permitDB = require("../models/permit")
const Helper = require("../utils/helper")
const fs = require("fs");

const migrate = () => {
    let file = fs.readFileSync("./migration/user.json")
    let datas = JSON.parse(file);

    datas.forEach(async (data) => {
        data.password = Helper.encode(data.password);
        let result = await new DB(data).save();
        console.log(result);
    });
}

const rpMigrate = () => {
    let file = fs.readFileSync("./migration/rp.json");
    let datas = JSON.parse(file);
    console.log(datas);
    datas.roles.forEach(async (data) => {
        let result = await new roleDB(data).save();
        console.log(result);
    });
    datas.permits.forEach(async (data) => {
        let result = await new permitDB(data).save();
        console.log(result);
    });
}

const addOwnerRole = async () => {
    let owner = await DB.findOne({ name: "Owner" });
    let role = await roleDB.findOne({ name: "Owner" });

    await DB.findByIdAndUpdate(owner._id, { $push: { roles: role._id } });
}

const backup = async () => {
    let users = await DB.find();
    fs.writeFileSync("./migration/backups/users.json", JSON.stringify(users));
    console.log("USER BACKED");
}



module.exports = {
    migrate,
    backup,
    rpMigrate,
    addOwnerRole
}