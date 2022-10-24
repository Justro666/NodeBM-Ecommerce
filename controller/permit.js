const DB = require("../models/permit");
const Helper = require("../utils/helper");


const all = async (req,res,next) => {
    let dbPermits = await DB.find();
    Helper.fmsg(res,"All Permissions",dbPermits);
}

const add = async (req,res,next) => {
    let dbPermit = await DB.findOne({name : req.body.name});
    if (dbPermit) {
        next (new Error("Permission is already exit"))
    } else {
        let addPermit = await new DB(req.body).save();
    Helper.fmsg(res,"Permission Added",addPermit);
    } 

    // console.log(req.body);
}

const get = async (req,res,next) => {
    let dbPermit = await DB.findById(req.params.id);
    if (dbPermit) {
        Helper.fmsg(res,"Single Permission",dbPermit);
    } else {
        next (new Error("There's No Permission with that ID"))
    }
}

const patch = async (req,res,next) => {
    let dbPermit = await DB.findById(req.params.id);
    if (dbPermit) {
        await DB.findByIdAndUpdate(dbPermit._id,req.body);
        let result = await DB.findById(dbPermit._id)
        Helper.fmsg(res,"Permission Updated",result);
    } else {
        next (new Error("There's No Permission with that ID"))
    }
}

const drop = async (req,res,next) => {
    let dbPermit = await DB.findById(req.params.id);
    if (dbPermit) {
        await DB.findByIdAndDelete(dbPermit._id)
        Helper.fmsg(res,"Permission Deleted",dbPermit);
    } else {
        next (new Error("There's No Permission with that ID"))
    }
}

module.exports ={
    all,
    add,
    get,
    patch,
    drop
}