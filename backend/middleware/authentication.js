import Jwt from "jsonwebtoken";
import "dotenv/config";

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const { userId } = await Jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      }
    );
    req.userId = userId;
    console.log("fetchuser", userId);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchUser;
