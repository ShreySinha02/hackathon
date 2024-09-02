const mongoose=require("mongoose")

function connectToDb(Url){
    return mongoose.connect(Url)
}


module.exports=connectToDb;