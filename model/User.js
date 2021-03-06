const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: String,
  password: String,
  userName: String,
  image: Object,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  isVerified : false,
  emailToken: String
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    console.log(newPassword, this.password);
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.methods.comparePassword = function (password, next) {
  let user = this;
  return bcrypt.compareSync(password, user.password);
};

UserSchema.pre("save", async function (next) {
  try {
    if (this.password.length > 50) next();

    const salt = await bcrypt.genSalt(10);

    const passwordHashed = await bcrypt.hash(this.password, salt);

    this.password = passwordHashed;

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
