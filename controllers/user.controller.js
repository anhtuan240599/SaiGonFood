const User = require("../model/User");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res
      .status(403)
      .json({ error: { message: "Email is already in use" } });

  const newUser = new User({ email, password });

  await newUser.save();

  //Encode token
  const token = JWT.sign(newUser.toJSON(), process.env.SECRET, {
    expiresIn: 6048000,
  });

  return res.status(200).json({ success: true, token: token });
};
