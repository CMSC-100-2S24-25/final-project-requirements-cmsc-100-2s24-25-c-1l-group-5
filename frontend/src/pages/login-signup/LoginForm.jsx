"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { useAuth } from "@/context/AuthContext";

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
import { Mail, Lock } from "lucide-react"

// Validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
})



export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {  
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        console.log("Fetched users:", response.data)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
      })
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/login", data)
      .then((res) => {
        login(res.data.token, res.data.userType);
        toast.success("Login successful!", { position: 'top-right' })
        if (res.data.userType === "merchant") {
          navigate("/admin/products");
        } else if (res.data.userType === "customer") {
          navigate("/homepage");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Login failed. Please try again."
        toast.error(errorMsg, { position: 'top-right' })
        console.error("Error logging in:", error)
      }) 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                  Email
                </span>
                </FormLabel>
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

        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </Form>
  )
}
