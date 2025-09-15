"use client"

import BaseHeader from "@/organisms/BaseHeader"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {jwtDecode } from "jwt-decode"
import jwt from "jsonwebtoken"
import { Button } from "@/components/ui/button"

const SECRET = process.env.JWT_KEY as string;

interface TokenPayload {
  username: string
  email: string
  exp: number
  iat: number
}

export default function Profile() {
  const getToken = () => Cookies.get("token")
  const [errorMessage, setError] = useState("");
  const [token, setToken] = useState(getToken())
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode <TokenPayload>(token)
        console.log("Payload do JWT:", decoded)
        setUsername(decoded.username)
        setEmail(decoded.email)

        // Checar expiração
        if (decoded.exp * 1000 < Date.now()) {
            console.log("Token expirado")
            Cookies.remove("token")
            setToken(undefined)
        }
      } catch (err) {
        console.error("Erro ao decodificar token:", err)
        setToken(undefined)
      }
    }
  }, [token])



  return (
    <div className="flex-col justify-items-center">
      <BaseHeader />
        <div className="m-3">Username : {username}</div>
      <div className="m-3">Email : {email}</div>
      <div className="m-3">Token : {token}</div>
      <Button>Logout</Button>
    </div>
  )
}
