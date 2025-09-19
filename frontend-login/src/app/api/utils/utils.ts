
import jwt, { Secret } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_KEY as Secret;

export function verifyToken(jwtToken : string | undefined) {
  try {
    if (!jwtToken || !SECRET_KEY) {
      console.log(process.env.JWT_KEY);
      console.log(SECRET_KEY);
      console.log(jwtToken);
      return;
    }
    const resultado = jwt.verify(jwtToken, SECRET_KEY)
    return resultado
  } catch (e) {
    throw e
  }
}