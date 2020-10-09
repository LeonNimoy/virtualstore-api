export default {
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  },
};
