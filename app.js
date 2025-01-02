import "dotenv/config"; // Method .config() looks for file .env, reads it and add to process.env keys with values.
import jwt from "jsonwebtoken";

// const port = process.env.PORT || 3000;
const { SECRET_KEY = "" } = process.env;

// As payload usually used users id ("_id" in MongoDB)
const payload = { id: "67765f1b21b8debb7ed21cb6" };
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
console.log("token:::", token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzY1ZjFiMjFiOGRlYmI3ZWQyMWNiNiIsImlhdCI6MTczNTgxMjA5NiwiZXhwIjoxNzM1ODk0ODk2fQ.7e15SOnx2D9qJBpxGeMh-S7nszOKYTPzWpRmXkwmcUo
// first part - it is coded headers,
// second part - it is coded payload,
// last part - it is encrypted headers&payload by secret key

const decodedToken = jwt.decode(token);
console.log("decodedToken:::", decodedToken);

//^ Method verify()
// If token valid the verify() returns payload
// If token not valid the verify() not returns "false", but throw error. Therefore you must wrap it to try-catch
try {
  const result1 = jwt.verify(token, SECRET_KEY); // Checks: 1) whether incoming token was encrypted using SECRET_KEY, 2) whether the token has expired
  console.log("result1:::", result1); // result1::: { id: '67765f1b21b8debb7ed21cb6', iat: 1735814617, exp: 1735897417 }

  const result2 = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzY1ZjFiMjFiOGRlYmI3ZWQyMWNiNiIsImlhdCI6MTczNTgxMjA5NiwiZXhwIjoxNzM1ODk0ODk2fQ.7e15SOnx2D9qJBpxGeMh-S7nszOKYTPzWpRmXkwmcUO",
    SECRET_KEY,
  ); // Will throw error "invalid signature"

  // If the token has expired the 401 error must be thrown
} catch (error) {
  console.log(error.message);
}
