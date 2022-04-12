const mongose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongose.Schema({
    name:{
        type: String,
        required: [true, "Provide value for name"]
       
    },

    email:{
        type: String,
        required: [true, "Provide value for email"],
        unique: true
    },

    password:{
        type: String,
        required: [true, "Provide value for password"]
      
    },
    
},

{
    timestamps: true
}
)

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
  });

userSchema.methods.comparePassword = async function(password){
     return await bcrypt.compare(password,this.password)   
}

module.exports=mongose.model('Users', userSchema)