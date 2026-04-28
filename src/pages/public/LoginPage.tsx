import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { User, Lock } from "lucide-react";
import { LoginSchema } from "@/schema/formSchema";
import { Link, useNavigate } from "react-router-dom";
import api from "@/api/axios";

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
    const navigate = useNavigate();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
    });

    const handleLogin = async (data: LoginFormValues) => {
        try {
            const response = await api.post("/auth/login", {
                email: data.email,
                password: data.password,
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/subjects");
            }
        } catch (err: any) {
            console.error(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Left Panel */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 flex-col justify-between p-12">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-600 rounded-md" />
                    <span className="text-white font-semibold text-lg tracking-tight">StudySync</span>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white leading-tight">
                        Your academic life,<br />organized.
                    </h1>
                    <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                        Track subjects, deadlines, and grades — all in one place built for Filipino students.
                    </p>
                </div>
                <p className="text-slate-600 text-sm">© 2025 StudySync</p>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm space-y-8">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="w-6 h-6 bg-blue-600 rounded-md" />
                        <span className="text-slate-900 font-semibold text-base tracking-tight">StudySync</span>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                        <p className="text-slate-500 text-sm">Sign in to your account to continue.</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700 text-sm font-medium">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    placeholder="you@example.com"
                                                    className="pl-10 h-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-lg"
                                                    {...field}
                                                />
                                            </div>
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
                                        <FormLabel className="text-slate-700 text-sm font-medium">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    type="password"
                                                    className="pl-10 h-10 bg-white border-slate-200 text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-lg"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
                            </Button>
                        </form>
                    </Form>

                    <p className="text-sm text-slate-500 text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 font-medium hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;