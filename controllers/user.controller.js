const User = require("../model/User");
const JWT = require("jsonwebtoken");
const mailConfig = require("../config/mail");
const SMS = require("../config/sms");

const register = async (req, res, next) => {
  const newUser = req.body;
  const header = req.headers.host;
  const { email, password } = req.body;
  // check email is already in use
  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res
      .status(403)
      .json({ error: { message: "Email đã được sử dụng" } });
  // config mail option
  const user = new User(newUser);
  mailConfig.verifyAccount(email, password, header, user);
  await user.save();
  return res
    .status(200)
    .json({ success: true, msg: "Hãy vào email để xác thực tài khoản" });
};

const verify = async (req, res, next) => {
  const foundUser = await User.findOne({ emailToken: req.query.token });
  if (!foundUser) {
    return res
      .status(403)
      .json({ message: "token is not provided or out of date" });
  }
  foundUser.isVerified = true;
  foundUser.emailToken = null;
  foundUser.save();
  return res.status(200).json({
    success: true,
    message: "Bây giờ bạn có thể login vào tài khoản của mình",
  });
};

const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      res
        .status(403)
        .json({ success: false, message: "sai tên tài khoản hoặc mật khẩu" });
    } else {
      if (foundUser.isVerified === false) {
        return res.status(404).json({
          message:
            "Tài khoản của bạn chưa được xác thử hãy kiểm tra email để xác thực tài khoản ",
        });
      } else if (foundUser.comparePassword(req.body.password)) {
        let token = JWT.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: 6048000,
        });
        res.status(200).json({ success: true, token: token });
      } else {
        res
          .status(403)
          .json({ success: false, message: "sai tên tài khoản hoặc mật khẩu" });
      }
    }
  } catch (err) {}
};

const foundUser = async (req, res, next) => {
  let foundUser = await User.findOne({ _id: req.decoded._id });
  if (foundUser) {
    if (foundUser.isVerified === false) {
      return res.status(404).json({
        message:
          "Tài khoản của bạn chưa được xác thử hãy kiểm tra email để xác thực tài khoản ",
      });
    } else {
      res.json({
        success: true,
        user: foundUser,
      });
    }
  }
};

module.exports = {
  register,
  foundUser,
  verify,
  login,
};
