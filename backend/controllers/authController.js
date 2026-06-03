const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken =
require("../utils/generateToken");

exports.registerUser =
async(req,res)=>{

    const {
        name,
        email,
        password
    } = req.body;

    const userExists =
    await User.findOne({email});

    if(userExists){
        return res.status(400).json({
            message:"User already exists"
        });
    }

    const hashedPassword =
    await bcrypt.hash(password,10);

    const user =
    await User.create({
        name,
        email,
        password:hashedPassword
    });

    res.status(201).json({
        _id:user._id,
        token:generateToken(user._id)
    });
};

exports.loginUser =
async(req,res)=>{

    const {
        email,
        password
    } = req.body;

    const user =
    await User.findOne({email});

    if(
        user &&
        await bcrypt.compare(
            password,
            user.password
        )
    ){

        return res.json({
            _id:user._id,
            name:user.name,
            role:user.role,
            token:
            generateToken(user._id)
        });
    }

    res.status(401).json({
        message:"Invalid Credentials"
    });
};

exports.getProfile =
async(req,res)=>{

    res.json(req.user);
};