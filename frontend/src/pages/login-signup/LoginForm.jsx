"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"

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
  email: z.string().email({ message: "Invalid email" }),
})

export function LoginForm() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data) => {
  // Get registered user from localStorage
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  const user = JSON.parse(storedUser);

  // Check if email and password match
  if (user.email === data.email && user.password === data.password) {
    // Save logged-in user info to localStorage (simulate session)
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/homepage");
  } else {
    alert("Invalid email or password");
  }
};

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
              <FormLabel>
                <span className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                  Password
                </span>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
