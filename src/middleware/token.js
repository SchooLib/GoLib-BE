const jwt = require("jsonwebtoken");

const key = "generasigigih";

exports.creataeToken = (data) => {
  const token = jwt.sign(data, key);
  return token;
};

exports.authentificationUser = (req, res, next) => {
  const head = req.headers["authorization"];
  if (!head)
    return res.status(401).json({
      meta: {
        status: "error",
        message: "Access denied. Invalid credentials provided",
        code: 401,
      },
      data: {},
    });
  const authHeader = head.split(" ");

  jwt.verify(authHeader[1], key, (err, data) => {
    if (err || data.id != req.params.idUser)
    // if (err || data.role != "user" || data.id != req.params.idUser)
      return res.status(401).json({
        meta: {
          status: "error",
          message: "Access denied. Invalid credentials provided",
          code: 401,
        },
        data: {},
      });
    req.user = data;
    next();
  });
};

exports.authentificationAdmin = (req, res, next) => {
  const head = req.headers["authorization"];
  if (!head)
    return res.status(401).json({
      meta: {
        status: "error",
        message: "Access denied. Invalid credentials provided",
        code: 401,
      },
      data: {},
    });
  const authHeader = head.split(" ");
  jwt.verify(authHeader[1], key, (err, data) => {
    // console.log({err, head: authHeader[1], key, role : data})
    if (err || data.role != "admin")
      return res.status(401).json({ message: "unauthorized" });
    console.log(data);
    req.user = data;
    next();
  });
};
