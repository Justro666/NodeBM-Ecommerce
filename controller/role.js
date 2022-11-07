const DB = require ("../models/role");
const permitDB = require ("../models/permit")
const Helper = require("../utils/helper");

const all = async (req,res,next) => {
    let dbRoles = await DB.find().populate("permits" ,"-__v").select("-__v");
    Helper.fmsg(res,"All Roles",dbRoles)
}

const add = async (req,res,next) => {
    let dbRoles = await DB.findOne({name : req.body.name});
    if (dbRoles) {
        next (new Error ("Role is already exit"))
    } else {
        let result = await new DB(req.body).save();
        Helper.fmsg(res,"Roles Added" , result);
    }
}

const patch = async (req,res,next) => {
    let dbRoles = await DB.findById(req.params.id);
    if (dbRoles) {
        await DB.findByIdAndUpdate(dbRoles._id,req.body);
        let result = await DB.findById(dbRoles._id)
        Helper.fmsg(res,"Roles Updated" , result);
    } else {
        next (new Error ("Role is not exit"))
    }
}

const get = async (req,res,next) => {
    let dbRoles = await DB.findById(req.params.id);
    if (dbRoles) {
        Helper.fmsg(res,"Single Role",dbRoles)
    } else {
        next (new Error ("Role is not exit"))
    }
    
}

const drop = async (req,res,next) => {
    let dbRoles = await DB.findById(req.params.id);
    if (dbRoles) {
        await DB.findOneAndDelete(dbRoles._id);
        Helper.fmsg(res,"Roles Deleted");
    } else {
        next (new Error ("Role is not exit"))
    }
}

const addPermit = async(req,res,next) =>{
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await permitDB.findById(req.body.permitId);
    if (dbRole && dbPermit) {
        await DB.findByIdAndUpdate(dbRole._id,{$push : {permits : dbPermit._id}})
        let result = await DB.findById(dbRole._id).populate("permits" , "-__v");
        Helper.fmsg(res,"Permit Added to Role", result)
    } else {
        next (new Error ("Role or permit is not exit"))
    }
}

const removePermit = async(req,res,next) =>{
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await permitDB.findById(req.body.permitId);
    if (dbRole && dbPermit) {
        await DB.findByIdAndUpdate(dbRole._id,{$pull : {permits : dbPermit._id}})
        let result = await DB.findById(dbRole._id).populate("permits" , "-__v");
        Helper.fmsg(res,"Permit Added to Role", result)
    } else {
        next (new Error ("Role or permit is not exit"))
    }
}

module.exports = {
    all,
    add,
    patch,
    get,
    drop,
    addPermit,
    removePermit
}