import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}
export default function Button({ title, className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "bg-amber-400 hover:bg-amber-500 px-8 py-6 text-xl font-medium cursor-pointer",
                className
            )}
            {...props}
        >
            {title}
        </button>
    )
}
