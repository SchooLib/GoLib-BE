const { succes, notFound } = require("../helper/response")
const { 
    createUser, 
    getOneLogin, 
    getToken, 
    getUserById, 
    getAllUsers,
    updateUser, 
    deleteUsers,
    getOneLoginAdmin
} = require("../services/user")


exports.createUser=async (req,res)=>{
    try{
        const newUser=await createUser(req.body)
        res.status(200).json(succes('user',newUser))
    }catch(error){
        res.status(400).json(notFound(error))
    }
}

exports.createAdmin=async (req,res)=>{
    try{
        const newUser=await createUser(req.body)
        res.status(200).json(succes('user',newUser))
    }catch(error){
        res.status(400).json(notFound(error))
    }
}

exports.loginUserAdmin=async(req,res)=>{
    try{
       let data=req.body
       const getOneUser=await getOneLoginAdmin(data);
       data={...data,id:getOneUser.dataValues?.id}
       const token=await getToken(data,getOneUser.dataValues?.password)
       res.status(200).json({
        meta: {
            status: "success",
            message: `The user has been successfully login`,
            code: 200,
          },
        data:{
            id:getOneUser.dataValues?.id,
            fullName:getOneUser.dataValues?.fullName,
            username:data.username,
        },
        token
       })
    }catch(error){
        res.status(400).json(notFound(error))
    }
}
exports.loginUser=async(req,res)=>{
    try{
       let data=req.body
       const getOneUser=await getOneLogin(data);
       data={...data,id:getOneUser.dataValues?.id}
       const token=await getToken(data,getOneUser.dataValues?.password)
       res.status(200).json({
        meta: {
            status: "success",
            message: `The user has been successfully login`,
            code: 200,
          },
        data:{
            id:getOneUser.dataValues?.id,
            fullName:getOneUser.dataValues?.fullName,
            nisn:data.nisn
        },
        token
       })
    }catch(error){
        res.status(400).json(notFound(error))
    }
}
exports.getUserById=async(req,res)=>{
    try{
        const idUser=req.params.idUser
        const user=await getUserById(idUser)
        res.status(200).json({
            meta: {
                status: "success",
                message: `The user has been successfully login`,
                code: 200,
              },
            data:{
                ...user?.dataValues
            }
        })
    }catch(err){
        res.status(400).json(notFound(err))
    }
}

exports.getAllUser=async(req,res)=>{
    try{
        const users=await getAllUsers()
        const modifiedUsers=users.map((user)=>{
            let data=user.dataValues
            return{
                id:data.id,
                fullName:data.fullName,
                nisn:data.nisn,
                point:data.point,
                isPasswordChange:data.isPasswordChange,
                img:data.img,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }
        })
        res.status(200).json({
            meta: {
              status: "success",
              message: "Books retrieved successfully",
              code: 200,
            },
            data: {
              modifiedUsers
            },
          });
    }catch(error){
        res.status(400).json({
            meta: {
              status: "failed",
              message: error.message,
              code: 400,
            },
            data: {},
          });
    }
}

exports.editUser=async(req,res)=>{
    try{
        const idUser=req.params.idUser
        const userBody=req.body
        const _=await updateUser(idUser,userBody)
        const user=await getUserById(idUser)
        res.status(200).json({
            meta: {
              status: "success",
              message: "Book updated successfully",
              code: 200,
            },
            data: {
              ...user?.dataValues
            },
          });
    }catch(error){
        res.status(400).json({
            meta: {
              status: "failed",
              message: error.message,
              code: 400,
            },
            data: {},
          });
    }
}

exports.deleteUser=async(req,res)=>{
    try{
        const id=req.params.idUser
        const user=await getUserById(id)
        if (!user) {
            res.status(404).json({
              meta: {
                status: "success",
                message: `User with id ${id} not found!`,
                code: 404,
              },
              data: {},
            });
            return;
          }
          
        const deletedUser=await deleteUsers(user)
        res.status(200).json({
            meta: {
              status: "success",
              message: "Book deleted successfully",
              code: 200,
            },
            data: user,
          });
    }catch(error){
        res.status(400).json({
            meta: {
              status: "failed",
              message: error.message,
              code: 400,
            },
            data: {},
          });
    }
}