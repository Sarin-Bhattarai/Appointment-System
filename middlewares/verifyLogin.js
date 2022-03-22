const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyLogin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.json({
        status: "fail",
        data: {
          login:
            "Cannot access the content that you are looking for! Please login to Continue",
        },
      });
    }

    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const result = await User.findById(user._id);
    req.user = result;
    next();
  } catch (ex) {
    console.log(ex);
    return res.json({ status: "error", message: "Access Denied" });
  }
};

module.exports = { verifyLogin };
