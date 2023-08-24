const mongoose= require("mongoose");
const isEmail= require("validator").isEmail
let courseSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true,
       /*  validate:{
            validator: function(value){
                return true
            },
            message:(props)=>`el valor: ${props.value} no fue valido`
        } */
        //validate:[isEmail, 'el email no es valida'],
    },
    description: {
        type:String,
        //enum:["Bueno", "malo"],
        minlength:[50,'no se cumple la longitud minima'],
        maxlength:300,
    },
    numberOfTopics:{
        type:Number,
        default:0,
        min:0,
        max:100
    },
    publishedAt:Date,

})
courseSchema.virtual('info')
.get(()=>{
    return `${this.description}. Temas: ${this.numberOfTopics}. Fecha de lanzamiento: ${this.publishedAt}`});

//definir el modelo
mongoose.model("Course", courseSchema)