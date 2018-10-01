'use strict';
const User = require('../models/user');
const userController = require('../controllers/users_controller');

//const addedUser = await userController.addUser();
const createUser = async (id,username) =>{ 
    const newUser= await User.create({
        id,
        username})
}

const  deleteUser =  (id) =>{ 
    User.destroy({
        where:{id}})
}
const  findUserById =  async (id) =>{ 
    const userDetails = await User.findAll({
        where: {id},
        raw:true
        })
    return userDetails  
}
const  findAllUsers = async () => { 
    const userList = await User.findAll({
        raw: true
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    return userList
}
const  updateUserDetails = async (id) =>{ 
   const updatedUser = await User.update(
        {userame:'Paul'},
        {where: {id}})
}
module.exports = {
    createUser,
    deleteUser,
    updateUserDetails,
    findUserById,
    findAllUsers
}