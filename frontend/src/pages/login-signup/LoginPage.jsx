import React from "react"
import { Link } from "react-router-dom"
import { LoginForm } from "./LoginForm"

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to *!</h1>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
      <div className="border-b border-gray-500 my-6"></div>
      <div className="mt-4">
        <Link to="/signup" className="text-sm text-500 hover:underline">
          Don’t have an account? <span className="font-semibold">Sign up here</span>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
