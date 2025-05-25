import React from "react"
import { Link } from "react-router-dom"
import { LoginForm } from "./LoginForm"
import { SignUpForm } from "./SignUpForm"

function SignUpPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-3xl font-bold mb-6">Create An Account</h1>
            <div className="w-full max-w-sm">
                <SignUpForm />
            </div>
            <div className="border-b border-gray-500 my-6"></div>
            <div className="mt-4">
                <Link to="/" className="text-sm text-500 hover:underline">
                    Already have an account? <span className="font-semibold">Log in</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUpPage
