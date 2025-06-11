"use client"
import React from "react";
import { useAuthStore } from "@/store/Auth";

function RegisterPage() {
    const { createAccount, login } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // collect form data
        const formData = new FormData(e.currentTarget);
        const fristName = formData.get("fristName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const password = formData.get("password");
        // validate
        if (!fristName || !lastName || !email || !password) {
            setError(() => "All fields are required");
            return
        }
        // call the store
        setIsLoading(true);
        setError("");
        const response = await createAccount(`${fristName} ${lastName}`,
            email?.toString(),
            password?.toString()
        )
        if (response.error) {
            setError(() => response.error!.message);
        } else {
            const loginResponse = await login(email?.toString(), password?.toString())
            if (loginResponse.error) {
                setError(() => loginResponse.error!.message);
            }
        }
        setIsLoading(() => false);

    }
    return (
        <div>
            {error && (<p>{error}</p>)}
            <form onSubmit={handleSubmit}>

            </form>
        </div>
    )
}

export default RegisterPage