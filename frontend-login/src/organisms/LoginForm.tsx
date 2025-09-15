"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import CustomFormInput from "@/atoms/CustomFormInput"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { verifyToken } from "../app/api/utils/utils"
import Cookies from "js-cookie"
import ITryLoginResponse from "@/interfaces/ITryLoginResponse"
import { tryLogin } from "@/services/Services"

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {message: "Password must be at least 6 charactes."})
})

export function LoginForm() {

  const [error, setError] = useState("");
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");

    try {
      const response : ITryLoginResponse = await tryLogin(values);

      if (!response.success) {
        setError("Login failed")
        return
      }

      if (response.data) Cookies.set('token', response.data.token);
      router.push("/profile");
    } catch (error) {
      setError("Network error. Please try again.")
    }
    console.log(values)
  }

  const routeToSigIn = () => {
    router.push("/signup");
  };

  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div
            className="justify-center justify-items-center flex-col"
          >
            <h1 className="font-bold m-3">Login</h1>
            <CustomFormInput
              className="m-5"
              control={form.control}
              field="username"
              label="Username"
              placeHolder="Username"
              size="w-75"

            />
            <CustomFormInput
              className="m-5"
              control={form.control}
              field="password"
              label="Password"
              placeHolder="Password"
              size="w-75"

            />

            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

            <div className="flex-row justify-center-safe row-auto align-middle">
                <Button className="bg-amber-200 hover:bg-amber-300 active:bg-amber-400 rounded-2xl m-2" type="button" onClick={() => routeToSigIn()}>Sign up</Button>
                <Button className="bg-blue-200 hover:bg-blue-300 active:bg-blue-400 rounded-2xl m-2" type="submit">Login</Button>
            </div>
          </div>
        </form>
        </Form>
    </div>
  )
}
