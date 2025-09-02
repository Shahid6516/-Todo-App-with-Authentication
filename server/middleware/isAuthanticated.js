import jwt from "jsonwebtoken";
const isAuthanticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not authanticated",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);


    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthanticated;
