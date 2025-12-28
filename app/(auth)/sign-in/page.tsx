"use client";

import Card, { CardButton, CardHeader, CardInput } from "@/features/auth/components/Card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const { error, setLoading, setError } = useAuth();
    const router = useRouter();

    /**
     * Handles the signin form submission
     * Prevents the default form submission behavior
     * Extracts the email and password from the form data
     * Makes a POST request to the signin endpoint
     * If the response is not okay, sets the error state and returns
     * If the response is okay, sets the loading state to false and redirects to the homepage
     */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const body = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        const res = await fetch("/api/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            setLoading(false);
            setError(data?.message);
            return;
        };

        setLoading(false);
        router.push("/");
    }
    return (
        <main className="flex-1 min-h-[calc(100vh-64px)] flex items-center justify-center">
            <Card>
                <CardHeader title="Sign In" desc="Welcome back to Happy mart, fill in the inputs below to proceed." />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <CardInput name="email" type="email" required placeholder="e.g., sudip@email.com" label="Email" />
                    <CardInput name="password" type="password" required minLength={8} placeholder="******" label="Password" />
                    <p>New to Happy Mart? <Link href="/sign-up" className="text-blue-400 hover:underline">Sign Up</Link></p>
                    {error && <p className="text-red-400">{error}</p>}
                    <CardButton title="Sign Up" type="submit" />
                </form>
            </Card>
        </main>
    )
}
