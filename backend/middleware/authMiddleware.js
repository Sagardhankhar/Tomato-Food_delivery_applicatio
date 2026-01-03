import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.token; // 👈 fallback

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized, token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not authorized" });
  }
};

export default authMiddleware;
