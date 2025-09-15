
import jwt, { Secret } from 'jsonwebtoken';
import Cookies from 'js-cookie';
import Router from 'next/router';

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

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export async function getAppCookies(req : any) {
  const parsedItems : any = {}
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split('; ')
    cookiesItems.forEach((cookies : any) => {
      const parsedItem = cookies.split('=')
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1])
    })
  }
  return parsedItems
}