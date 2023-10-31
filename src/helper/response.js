exports.succes=(name,data)=>{
    return{
        meta: {
            status: "success",
            message: `The ${name} has been successfully added to the database.`,
            code: 200,
          },
        data:{
            ...data?.dataValues
        },
    }
}

exports.notFound=(err)=>{
    return{
        meta: {
            status: "failed",
            message: err.message,
            code: 400,
          },
          data: {},
    }
}