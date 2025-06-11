"use client"
import React from "react";
import { useAuthStore } from "@/store/Auth";

function Loginpage() {
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // collect form data
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        // validate
        if (!email || !password) {
            setError(() => "All fields are required");
            return
        }
        // call the store
        setIsLoading(() => true);
        setError(() => "");
        const response = await login(email?.toString(), password?.toString())
        if (response.error) {
            setError(() => response.error!.message);
        }
        setIsLoading(() => false);
    }
    return (
        <div>login</div>
    )
}

export default Loginpage