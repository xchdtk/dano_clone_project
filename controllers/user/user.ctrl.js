const User = require("../../schemas/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../../secret");

exports.post_register = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    let user_count = 0;
    User.countDocuments({}, function (err, count) {
      user_count = count;
    });

    if (!/^[a-z0-9_]*$/.test(nickname)) {
      res.status(401).send({
        errorMessage: "닉네임은 대소문자와 숫자로만 이루어져야 합니다.",
      });
      return;
    }

    if (nickname.length < 3) {
      res.status(401).send({
        errorMessage: "닉네임을 3자이상 입력해주세요.",
      });
      return;
    }

    let existsnickname = await User.findOne({ nickname });

    if (existsnickname) {
      res.status(401).send({
        errorMessage: "닉네임이 중복됐습니다.",
      });
      return;
    }

    if (!/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/) {
      res.status(401).send({
        errorMessage: "아이디 형식을 지켜주세요",
      });
      return;
    }

    let existsemail = await User.findOne({ email });

    if (existsemail) {
      res.status(401).send({
        errorMessage: "아이디가 중복됐습니다.",
      });
      return;
    }

    if (password.length < 4) {
      res.status(401).send({
        errorMessage: "패스워드는 4자이상 입력해주세요.",
      });
      return;
    }

    const encryption_password = bcrypt.hashSync(password, 10);

    await User.create({
      nickname: nickname,
      email: email,
      password: encryption_password,
      userId: user_count + 1,
    });

    res.status(201).send({
      result: "회원가입에 성공하였습니다.",
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

exports.post_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    user = await User.findOne({ email });
    if (!user) {
      res.status(401).send({
        errorMessage: "아이디 또는 비밀번호가 잘못되었습니다",
      });
      return;
    }

    encoded_password = user.password;
    const same = bcrypt.compareSync(password, encoded_password);

    if (!same) {
      res.status(401).send({
        errorMessage: "아이디 또는 비밀번호가 잘못되었습니다",
      });
      return;
    }
    token = jwt.sign({ userId: user.userId }, secret, { expiresIn: "10h" });
    res.status(201).send({
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};
