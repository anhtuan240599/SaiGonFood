const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const User = require("../model/User");

const verifyAccount = (email,password,header,user,req,res,next) => {
    const token = JWT.sign({ email, password }, process.env.SECRET, {
        expiresIn: 6048000,
      });
    user.emailToken = token
    const transporter = nodemailer.createTransport(
    "smtps://alumni.hutech%40@gmail.com:tuan12101991@smtp.gmail.com"
    )
    const client_URL = "http://" + header
    const output = `
    <h2>Please click link below</h2>
    <p>${client_URL}/users/verify-email?token=${token}</p>
    `
    const mailOption = {
    from: '"SaiGonFood" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Account Verification", // Subject line
    text: `Please click link below
            ${client_URL}/users/verify-email?token=${token}`,
    html: output, // html body
    }
    transporter.sendMail(
        mailOption,
        (error, info) => {
          if (error) {
            console.log(error);
          } else {
          }
        }
    );
}

module.exports = {
    verifyAccount
}
