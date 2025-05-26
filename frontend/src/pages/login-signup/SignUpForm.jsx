"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const signupSchema = z.object({
  fName: z.string().min(1, { message: "First name is required" }),
  mName: z.string().optional(),
  lName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }
  ),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => (data.password === data.confirmPassword), {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export function SignUpForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/auth/users")
      .then((response) => {
        console.log("Fetched users:", response.data)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
      })
  }

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fName: "",
      mName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data) => {
    const { confirmPassword, ...signupData } = data
    axios
      .post("http://localhost:3000/auth/signup", signupData)
      .then((res) => {
        toast.success("Sign up successful! Please log in.", { position: 'top-right' })
        navigate("/")
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Sign up failed. Please try again."
        toast.error(errorMsg, { position: 'top-right' })
        console.error("Error signing up:", error)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name (Optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div style={{ position: "relative" }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "0.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      boxShadow: "none",
                      color: "#007bff",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                      fontWeight: "bold",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div style={{ position: "relative" }}>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: "0.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      boxShadow: "none",
                      color: "#007bff",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                      fontWeight: "bold",
                    }}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
