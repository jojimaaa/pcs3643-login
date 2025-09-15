"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import CustomFormInput from "@/atoms/CustomFormInput"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { trySignup } from "@/services/Services"

const signupSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email({message : "Please insert valid email."}),
  password: z.string().min(6, {message: "Password must be at least 6 charactes."})
})

export function SignupForm() {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const response = await trySignup(values);

      if (!response) {
        setError("Registration failed")
        return
      }

      setSuccess(true)
      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } catch (error) {
      setError("Network error. Please try again.")
    }

    console.log(values)
  }

  const router = useRouter();
  
  const routeToLogin = () => {
    router.push("/login");
  };


  const content = () => {
    if (success) {
      return(
      <>
        <div className="justify-center justify-items-center font-stretch-200%">
          Registrado com sucesso. Vá para a página de Login.
        </div>
        <div
          className="justify-items-center flex-row"
        >
            <Button className="bg-amber-200 hover:bg-amber-300 active:bg-amber-400 rounded-2xl m-2" type="button" onClick={() => routeToLogin()}>Login</Button>
        </div>
      </>
      );
    }
    else return (
      <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div
            className="justify-center justify-items-center flex-col"
            >
            <h1 className="font-bold m-3">Sign up</h1>
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
            field="email"
            label="Email"
            placeHolder="Email"
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
            <div
              className="justify-items-center flex-row"
            >
                <Button className="bg-amber-200 hover:bg-amber-300 active:bg-amber-400 rounded-2xl m-2" type="button" onClick={() => routeToLogin()}>Login</Button>
                <Button className="bg-blue-200 hover:bg-blue-300 active:bg-blue-400 rounded-2xl m-2" type="submit">Submit</Button>
            </div>
          </div>
        </form>
        </Form>
      </div>
    );
  }

  return (content());
}
