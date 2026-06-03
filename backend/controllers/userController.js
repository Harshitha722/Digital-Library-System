const User =
require("../models/User");

const {
 getUsers,
 addLibrarian,
 updateUserRole,
 deleteUser
}
=
require(
 "../controllers/userController"
);

const bcrypt =
require("bcryptjs");
 //change user roleapi
exports.updateUserRole =
async(req,res)=>{

  const { role } =
  req.body;

  const user =
  await User.findById(
    req.params.id
  );

  if(!user){

    return res.status(404)
    .json({
      message:"User not found"
    });
  }

  if(
    user.role === "admin"
  ){

    return res.status(400)
    .json({
      message:
      "Admin role cannot be changed"
    });
  }

  user.role = role;

  await user.save();

  res.json({
    message:
    "Role updated successfully"
  });

};

//delete user api
exports.deleteUser =
async(req,res)=>{

  const user =
  await User.findById(
    req.params.id
  );

  if(!user){

    return res.status(404)
    .json({
      message:
      "User not found"
    });
  }

  if(
    user.role === "admin"
  ){

    return res.status(400)
    .json({
      message:
      "Admin cannot be deleted"
    });
  }

  await User.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:
    "User deleted successfully"
  });

};

exports.addLibrarian =
async(req,res)=>{

const {
name,
email,
password
}
=
req.body;

const hashedPassword =
await bcrypt.hash(
password,
10
);

const librarian =
await User.create({

name,

email,

password:
hashedPassword,

role:
"librarian"

});

res.status(201)
.json(librarian);

};

exports.getUsers =
async(req,res)=>{

    const users =
    await User.find()
    .select("-password");

    res.json(users);
};