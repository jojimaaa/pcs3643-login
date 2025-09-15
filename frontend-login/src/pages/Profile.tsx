"use client"

import BaseHeader from "@/organisms/BaseHeader"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {jwtDecode } from "jwt-decode"
import jwt from "jsonwebtoken"
import { Button } from "@/components/ui/button"
import { verifyToken } from "../app/api/utils/utils"
import { useRouter } from "next/navigation"

interface TokenPayload {
  username: string
  email: string
  exp: number
  iat: number
}

export default function Profile() {
  const getToken = () => Cookies.get("token");
  const [errorMessage, setError] = useState("");
  const [thisToken, setToken] = useState(getToken())
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const router = useRouter();

  const logout=(e:any) => {
    e.preventDefault()
    Cookies.remove('token')
    router.push('/login')
  }

  useEffect(() => {
    async function verifyTokenAsync(token : string) {
      const verification = await fetch("/api/verifyToken", {
        method : "POST",
        body: JSON.stringify({
          token : token
        })
      });

      if (!verification.ok) return;

      const verifData = await verification.json();
      if (verifData.valid) {
        setToken(token);
        const decoded = jwtDecode <TokenPayload>(token);
        console.log("Payload do JWT:", decoded);
        setUsername(decoded.username);
        setEmail(decoded.email);

        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expirado")
          Cookies.remove("token")
          setToken(undefined)
        }
      }
      else setToken(undefined);
    };

    if (thisToken) {
      try {
        verifyTokenAsync(thisToken);
      } catch (err) {
        console.error("Erro ao decodificar token:", err)
        setToken(undefined)
      }
    }
  }, [thisToken]);


  const content = () => {
    if (thisToken) {
      return (
        <div className="flex-col justify-items-center">
          <BaseHeader />
          <div className="m-3">Username : {username}</div>
          <div className="m-3">Email : {email}</div>
          <div className="m-3">Token : {thisToken}</div>
          <div className="flex-row justify-center-safe row-auto align-middle">
            <Button 
              className="bg-red-200 hover:bg-red-300 active:bg-red-400 rounded-2xl m-2" 
              type="button" 
              onClick={(e) => logout(e)}
            >
              Logout
            </Button>
        </div>
        </div>
      )
    } else return (
      <div className="flex-col justify-items-center">
        <BaseHeader />
        <div className="m-3">Token inválido ou nulo, faça Login para continuar</div>
        <div className="flex-row justify-center-safe row-auto align-middle">
          <Button 
            className="bg-red-200 hover:bg-red-300 active:bg-red-400 rounded-2xl m-2" 
            type="button" 
            onClick={(e) => logout(e)}
          >
            Logout
          </Button>
        </div>
      </div>
    )
  }

  return (content());
}
