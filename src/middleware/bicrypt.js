const bcrypt=require('bcrypt')

exports.Encription=(password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const salt=await bcrypt.genSalt(10);
            const hash=await bcrypt.hash(password,salt);
            resolve(hash);
        }catch(error){
            reject(error)
        }
    })
}

exports.Decript=async(passwordUser,passwordDB)=>{
    try{
        const isMatch=await bcrypt.compare(passwordUser,passwordDB)
        return isMatch
    }catch(err){
        throw err;
    }
}