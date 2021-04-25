const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  image: Object,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

UserSchema.methods.isValidPassword = async function(newPassword) {
  try{
      console.log(newPassword,this.password)
      return await bcrypt.compare(newPassword, this.password)
     
  } catch (error) {
      throw new Error(error)
  }
}

UserSchema.methods.comparePassword = function (password,next) {
  let user = this;
  return bcrypt.compareSync(password, user.password)
  
}

UserSchema.pre('save', async function (next) {
  try {
      if(this.authType !== 'local') next()

      if(this.password.length > 50) next()
      
      const salt = await bcrypt.genSalt(10)

      const passwordHashed = await bcrypt.hash(this.password, salt)

      this.password = passwordHashed

      next()
  } catch (error) {
      next(error)
  }
  
})