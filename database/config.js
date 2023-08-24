
//traer la libreria
const mongoose= require("mongoose");

const dbConnection= ()=>{
    try{
        mongoose.connect(process.env.MONGODB_CONNECTION,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos conectada');
    }catch(error){
        console.log(error);
     throw new Error("Error a la hora de iniciar la base de datos")
    }
};
 
module.exports= {
    dbConnection
} 