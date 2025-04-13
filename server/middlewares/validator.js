import jwt from "jsonwebtoken";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: err.errors[0].message });
  }
};

export const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    next()
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: "Invalid or expired token."})
  }
};
