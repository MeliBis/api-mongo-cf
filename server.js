require("dotenv").config()
const express= require("express");
const { dbConnection }= require('./database/config')
const app = express();
const mongoose=require("mongoose")
require("./models/course")
const Course=mongoose.model("Course")

const PORT= 3003
dbConnection()

app.get("/",(req, res)=>{
    res.send("hola mundo")
})
//condiciones de busqueda
app.get("/", (req,res)=>{
    Course.find({
        title:"curso de mongoose"
    }).then(collection=>{
        res.json(collection);
    }).catch(err =>{
        res.json(err)
    })
})
app.get("/cursos", (req,res)=>{
    Course.find({}).then(docs =>{
        res.json(docs)
    }).catch(err =>{
        res.json(err)
    })
})
app.get("/cursos/:id", (req, res)=>{
    Course.findById(req.params.id).then(doc => {
        res.json(doc)
    }).catch(err =>{
        res.json(err)
    })
})
app.post("/cursos", (req, res)=>{
    const Course= mongoose.model("Course")
    Course.create({
        title:"curso de mongoose",
        description:"tres ccvb b bb b loremnvbvbvvbvbvbnn.mm m. n. b v v v bbbb n b "
    }).then(doc =>{
        res.json(doc);
    }).catch(err =>{
        console.log(err);
        res.json(err)
    })
})
app.put("/cursos/:id",(req,res)=>{
        //1. actualizar multiples 0 a N
/*     Course.update({numberOfTopics:0},{publishedAt: new Date()},{multi:true}).then(r=>{
        res.json(r)
    }).catch(err => res.json(err)); */

    //2. findOneAndUpdate-->mas utilizada
     Course.findByIdAndUpdate(req.params.id,{
        publishedAt: new Date()
    },{new:true}).then(doc => res.json(doc))
    .catch(err => res.json(err)) 

    //encontras primero el documento y luego guardarlo
    /* Course.findById(req.params.id).then(course =>{
        course.publishedAt= new Date();
        return course.save()
    }).then(saveResponse => res.json(saveResponse))
    .catch(err => res.json(err))  */
})
app.delete("/cursos/:id", (req,res)=>{
    //1.eliminar multiples a la vez
   /*  Course.deleteMany({numberOfTopic:0}).then(r=>{
        res.json(r);
    }).catch(err => res.json(err)) */
    //2.findbyIdAndDelete
   /*  Course.findByIdAndDelete(req.params.id).then(doc => res.json(doc))
    .catch(err => res.json(err)) */
    //3. 
    Course.findById(req.params.id).then(course =>{
        return course.delete();
    }).then(deleteResponse => res.json(deleteResponse))
    .catch(err => res.json(err))
})
app.listen(PORT, (req, res)=>{
    console.log(`Servidor corriendo en puerto: ${PORT}`);
    
})