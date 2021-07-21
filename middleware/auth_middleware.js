const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

const secret = require("../secret");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokentype, auth_token] = authorization.split(" ");

  if (!authorization || tokentype != "Bearer") {
    res.status(400).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(auth_token, secret);
    user = await User.findOne({ userId: userId });
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }
};
