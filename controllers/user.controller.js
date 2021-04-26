const User = require("../model/User");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const register = async (req, res, next) => {
  const newUser = req.body;
  const { email, password } = req.body;
  // create account send email to user
  const transporter = nodemailer.createTransport(
    "smtps://alumni.hutech%40@gmail.com:tuan12101991@smtp.gmail.com"
  );
  // check email is already in use
  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res
      .status(403)
      .json({ error: { message: "Email is already in use" } });

  const token = JWT.sign({ email, password }, process.env.SECRET, {
    expiresIn: 6048000,
  });
  // config mail option
  const client_URL = "http://" + req.headers.host;
  const output = `
  <h2>Please click link below</h2>
  <p>${client_URL}/users/verify-email?token=${token}</p>
  `;
  const mailOption = {
    from: '"SaiGonFood" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Account Verification", // Subject line
    text: `Please click link below
          ${client_URL}/users/verify-email?token=${token}`,
    html: output, // html body
  };
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
    }
  });
  const user = new User(newUser)
  await user.save()
  return res
    .status(200)
    .json({ success: true, msg: "hay vao email de xac nhan dang ky" });
};

const foundUser = async (req, res, next) => {
  let foundUser = await User.findOne({ _id: req.decoded._id });
  if (foundUser) {
    res.json({
      success: true,
      user: foundUser,
    });
  }
};

module.exports = {
  register,
  foundUser,
};
