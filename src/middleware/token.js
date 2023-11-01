const jwt=require('jsonwebtoken')

const key="generasigigih"

exports.creataeToken=(data)=>{
    const token=jwt.sign(data,key)
    return token
}

exports.authentificationUser=(req,res,next)=>{
    const head=req.headers['authorization']
    if(!head) return res.sendStatus(401)
    const authHeader=head.split(" ")
    
    jwt.verify(authHeader[1],key,(err,data)=>{
        if (err||data.role!="user"||data.id!=req.params.idUser) return res.sendStatus(401)
        req.user=data
        next()
    })
}

exports.authentificationAdmin=(req,res,next)=>{
    const head=req.headers['authorization']
    if(!head) return res.sendStatus(401)
    const authHeader=head.split(" ")
    jwt.verify(authHeader[1],key,(err,data)=>{
        if (err||data.role!="admin") return res.status(401).json({message:"unauthorized"})
        console.log(data)
        req.user=data
        next()
    })
}