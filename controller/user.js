const DB = require("../models/user");
const roleDB = require("../models/role")
const permitDB = require("../models/permit")
const Helper = require("../utils/helper");

const allUsers = async (req, res, next) => {
    let dbUsers = await DB.find().populate("permits roles", "-__v").select("-__v");
    Helper.fmsg(res, "All Users", dbUsers)
}

const register = async (req, res, next) => {
    let dbEmail = await DB.findOne({ email: req.body.email });
    if (dbEmail) {
        next(new Error("Email is already Exit"));
        return;
    }

    let dbPhone = await DB.findOne({ email: req.body.phone });
    if (dbPhone) {
        next(new Error("Phone is already Exit"));
        return;
    }

    req.body.password = Helper.encode(req.body.password);
    let result = await new DB(req.body).save();
    Helper.fmsg(res, "Register Successful", result)
}


const login = async (req, res, next) => {
    let dbPhone = await DB.findOne({ phone: req.body.phone }).populate("permits roles", "-__v").select("-__v");
    if (dbPhone) {
        if (Helper.comparePass(req.body.password, dbPhone.password)) {
            user = dbPhone.toObject();
            delete dbPhone.password;
            user.token = Helper.generateToken(user)
            Helper.set(dbPhone._id, user);
            Helper.fmsg(res, "Login Successful", user)
        } else {
            next(new Error(" Wrong Creditial"))
        }
    } else {
        next(new Error(" Wrong Creditial"))
    }
}

const addRole = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    let getRole = await roleDB.findById(req.body.roleId);

    let checkRole = dbUser.roles.find(ro => ro.equals(getRole._id));

    if (dbUser && getRole) {
        if (checkRole) {
            next(new Error("Role is already exit in user"))
        } else {
            await DB.findByIdAndUpdate(dbUser._id, { $push: { roles: getRole._id } });
            let result = await DB.findById(dbUser._id);
            Helper.fmsg(res, "Role Updated", result)
        }
    } else {
        next(new Error("User or role is wrong"))
    }
}

const removeRole = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    let getRole = await roleDB.findById(req.body.roleId);

    let checkRole = dbUser.roles.find(ro => ro.equals(getRole._id));


    if (dbUser && getRole) {
        if (checkRole) {

            await DB.findByIdAndUpdate(dbUser._id, { $pull: { roles: getRole._id } });
            let result = await DB.findById(dbUser._id);
            Helper.fmsg(res, "Role Updated", result)
        } else {
            next(new Error("User dont have role"))
        }
    } else {
        next(new Error("User or Role is wrong"))
    }
}


const addPermit = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    let dbPermit = await permitDB.findById(req.body.permitId)


    if (dbUser && dbPermit) {
        let hasPermit = dbUser.permits.find(per => per.equals(dbPermit._id));
        if (hasPermit) {
            next(new Error("Permission is already exit"))
        } else {
            await DB.findByIdAndUpdate(dbUser._id, { $push: { permits: dbPermit._id } })
            let result = await DB.findById(dbUser._id)
            Helper.fmsg(res, "Permit Added", result)
        }
    } else {
        next(new Error("User or Permit is wrong"))
    }
}

const removePermit = async (req, res, next) => {
    let dbUser = await DB.findById(req.body.userId);
    let dbPermit = await permitDB.findById(req.body.permitId)

    if (dbUser && dbPermit) {
        let hasPermit = dbUser.permits.find(per => per.equals(dbPermit._id));
        if (hasPermit) {
            await DB.findByIdAndUpdate(dbUser._id, { $pull: { permits: dbPermit._id } })
            let result = await DB.findById(dbUser._id)
            Helper.fmsg(res, "Permit Added", result)
        } else {
            next(new Error("Permission is not exit"))
        }
    } else {
        next(new Error("User or Permit is wrong"))
    }
}

module.exports = {
    allUsers,
    login,
    register,
    addRole,
    removeRole,
    addPermit,
    removePermit
}