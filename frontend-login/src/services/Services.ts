import ILoginFields from "@/interfaces/ILogInFields"
import ISigninFields from "@/interfaces/ISignInFields";
import ITryLoginResponse from "@/interfaces/ITryLoginResponse";
import axios from "axios"

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const tryLogin = async (data : ILoginFields) : Promise<ITryLoginResponse> => {

    const response = await api.post("/login", data);

    if (response.status == 200){
        return {success : true, data : response.data}
    }

    return {success : false, data : undefined};
}

export const trySignup = async (data : ISigninFields) : Promise<boolean> => {
    const response = await api.post("/signup", data);

    if (response.status == 201){
        return true;
    }

    return false;
}