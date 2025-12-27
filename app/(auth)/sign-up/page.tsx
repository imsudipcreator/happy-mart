"use client";

import Card, { CardButton, CardHeader, CardInput } from "@/features/auth/components/Card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const { setLoading, setError, error } = useAuth();
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);


        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            setError(data?.message ?? "Signup failed");
            setLoading(false);
            return;
        };

        setLoading(false);
        router.push("/");
    }
    return (
        <main className="flex-1 min-h-[calc(100vh-64px)] flex items-center justify-center">
            <Card>
                <CardHeader title="Sign Up" desc="Welcome to Happy mart, fill in the inputs below to proceed." />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <CardInput name="name" type="text" required minLength={2} placeholder="e.g., sudip mahata" label="Full Name" />
                    <CardInput name="email" type="email" required placeholder="e.g., sudip@email.com" label="Email" />
                    <CardInput name="password" type="password" required minLength={8} placeholder="******" label="Password" />
                    <p>Already have an account? <Link href="/sign-in" className="text-blue-400">Sign In</Link></p>
                    {error && <p className="text-red-400">{error}</p>}
                    <CardButton title="Sign Up" type="submit" />
                </form>
            </Card>
        </main>
    )
}
