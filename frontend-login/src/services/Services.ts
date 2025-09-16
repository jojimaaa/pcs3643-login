import { verifyToken } from "@/app/api/utils/utils";
import ILoginFields from "@/interfaces/ILogInFields"
import ILoginResponseBody from "@/interfaces/ILoginResponseBody";
import ISigninFields from "@/interfaces/ISignInFields";
import ITryLoginResponse from "@/interfaces/ITryLoginResponse";
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const tryLogin = async (data : ILoginFields) : Promise<ITryLoginResponse> => {
    const response = await api.post("/login", data);
    
    
    const valores : ITryLoginResponse = {success : false, data : undefined}
    if (response.status == 200){
      const data = response.data;


      const verification = await fetch("/api/verifyToken", {
        method : "POST",
        body: JSON.stringify({
          token : data?.token
        })
      });

      if (!verification.ok) return valores;

      const verifData = await verification.json();

      if (verifData.valid) {
        valores.success = verifData.valid;
        valores.data = data;
      }
    }
    return valores;
}

export const trySignup = async (data : ISigninFields) : Promise<boolean> => {
    const response = await api.post("/signup", data);
    if (response.status == 201){
        return true;
    }

    return false;
}