'use strict';
const util = require('util');
const User = require('../models/user');
const user= require('../helpers/users_helper')

const addUser = (req, res) => {
  const {id,username} = req.swagger.params.userDetails.value
  //console.log(id)
  //console.log(username)
  user.createUser(id,username).then(result=>{
    res.status(200).send(user.findUserById(id))
  })
}

const hello = (req,res) => {
  const name= req.swagger.params.name.value
  const message = util.format('Hello, %s',name)
  res.status(200).send({
    message})
}

const deleteUser =  (req,res) => {
  const id=req.swagger.params.id.value
  //console.log(id)
  user.deleteUser(id)
  console.log('Success')
  const message= util.format("User %s Deleted ",id)
  res.status(200).send({message})
}

const getUser = (req,res) =>{
  const id=req.swagger.params.id.value
  //console.log(id)
  user.findUserById(id).then(result=>{
    res.status(200).send(result);
  });
}

const updateUser =  (req,res) =>{
  const id = req.swagger.params.id.value
  user.updateUserDetails().then(result=>{
    //console.log(result)
    res.status(200).send(result)
  })
}
const getAllUsers = (res) =>{
  user.findAllUsers().then(users =>{
    //console.log(users)
    res.status(200).send(users)
  })
}

module.exports = {
  addUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  hello
};