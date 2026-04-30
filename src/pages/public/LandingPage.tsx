import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { X, User, School, Mail, Lock } from "lucide-react";

// API and UI Imports
import api from "@/api/axios";
import Footer from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema, RegisterSchema } from "@/schema/formSchema";
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage 
} from "@/components/ui/form";

// Helpers
import { 
    NAV_ITEMS, 
    MOCK_TASKS, 
    STATS, 
    FEATURES, 
    GRADES, 
    TESTIMONIALS 
} from "@/components/ui/forms/landing-page-helpers";

// ── Hook: scroll reveal ───────────────────────────────────────────────────────
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return { ref, visible };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white border-b border-blue-100 shadow-sm" : "bg-white/90"}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">Study<span className="text-blue-600">Sync</span></span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.label} href={item.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">{item.label}</a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button onClick={onLoginClick} className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg">Log in</button>
                    <button onClick={onLoginClick} className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-sm">Get started free</button>
                </div>
            </div>
        </nav>
    );
}

function LoginModal({ onClose }: { onClose: () => void }) {
    const [tab, setTab] = useState<"login" | "register">("login");
    const [serverError, setServerError] = useState<string | null>(null);
    const navigate = useNavigate();

    const loginForm = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
    });

    const registerForm = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "", school: "" },
    });

    const onLoginSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setServerError(null);
        try {
            const response = await api.post("/auth/login", data);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/subjects");
            }
        } catch (err: any) {
            setServerError(err.response?.data?.message || "Login failed.");
        }
    };

    const onRegisterSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setServerError(null);
        try {
            const response = await api.post("/auth/register", {
                name: data.name,
                email: data.email,
                password: data.password,
                school: data.school,
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (err: any) {
            setServerError(err.response?.data?.message || "Registration failed.");
        }
    };

    const inputClass = "pl-10 h-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-600 rounded-lg";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 relative animate-modal" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <span className="font-bold text-slate-900">Study<span className="text-blue-600">Sync</span></span>
                </div>

                <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
                    {(["login", "register"] as const).map((t) => (
                        <button key={t} onClick={() => { setTab(t); setServerError(null); }} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{t === "login" ? "Log in" : "Sign up"}</button>
                    ))}
                </div>

                {serverError && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4 text-center">{serverError}</p>}

                <div className="space-y-4">
                    {tab === "login" ? (
                        <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                                <FormField control={loginForm.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium text-slate-600">Email address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input placeholder="juan@email.com" className={inputClass} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={loginForm.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium text-slate-600">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input type="password" placeholder="••••••••" className={inputClass} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm" disabled={loginForm.formState.isSubmitting}>
                                    {loginForm.formState.isSubmitting ? "Signing in..." : "Log in to StudySync"}
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Form {...registerForm}>
                            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                                <FormField control={registerForm.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium text-slate-600">Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input placeholder="Juan dela Cruz" className={inputClass} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={registerForm.control} name="school" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium text-slate-600">School</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input placeholder="Your School" className={inputClass} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={registerForm.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium text-slate-600">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input placeholder="juan@email.com" className={inputClass} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={registerForm.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium text-slate-600">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input type="password" placeholder="••••••••" className={inputClass} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={registerForm.control} name="confirmPassword" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium text-slate-600">Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input type="password" placeholder="••••••••" className={inputClass} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm" disabled={registerForm.formState.isSubmitting}>
                                    {registerForm.formState.isSubmitting ? "Creating account..." : "Create free account"}
                                </Button>
                            </form>
                        </Form>
                    )}
                </div>
                <p className="text-center text-xs text-slate-400 mt-4">
                    {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button className="text-blue-600 font-medium hover:underline" onClick={() => setTab(tab === "login" ? "register" : "login")}>
                        {tab === "login" ? "Sign up free" : "Log in"}
                    </button>
                </p>
            </div>
        </div>
    );
}

function AppMockup() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden transition-transform duration-500 hover:-translate-y-1">
            <div className="bg-slate-50 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-5 bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Good morning,</p>
                        <p className="text-sm font-bold text-slate-800">Kurt 👋</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full">Thu, Apr 30</span>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100 mb-3">
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-500 font-medium">Weekly progress</span>
                        <span className="text-blue-600 font-semibold">7 / 10 tasks</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-blue-500 rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {MOCK_TASKS.map((task, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-slate-100">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${task.done ? "bg-blue-500 border-blue-500 text-white" : "border-slate-300"}`}>
                                {task.done && "✓"}
                            </div>
                            <p className={`text-xs font-medium truncate flex-1 ${task.done ? "line-through text-slate-400" : "text-slate-700"}`}>{task.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function RevealSection({ children }: { children: React.ReactNode }) {
    const { ref, visible } = useScrollReveal();
    return <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{children}</div>;
}

export default function LandingPage() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="bg-white min-h-screen text-slate-900">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
                body { font-family: 'Sora', sans-serif; }
                .font-display { font-family: 'DM Serif Display', serif; }
                @keyframes modal-in { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                .animate-modal { animation: modal-in 0.2s ease both; }
            `}</style>
            
            <Navbar onLoginClick={() => setShowModal(true)} />
            {showModal && <LoginModal onClose={() => setShowModal(false)} />}

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-blue-100">
                            Built for Filipino students 🇵🇭
                        </div>
                        <h1 className="font-display text-5xl md:text-6xl leading-tight text-slate-900 mb-5">
                            Track every task, <span className="italic text-blue-600">every grade.</span>
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md font-light">
                            StudySync helps you manage assignments, monitor deadlines, and keep an eye on your GWA — all in one clean dashboard designed for how students actually study.[cite: 1]
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-sm">Get started free →</button>
                        </div>
                    </div>
                    <AppMockup />
                </div>
            </section>

            {/* ── FEATURES ─────────────────────────────────────────── */}
            <RevealSection>
                <section id="features" className="bg-blue-600 py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-4xl md:text-5xl text-white mb-3">
                                Everything you need to <span className="italic">stay ahead.</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {FEATURES.map(f => (
                                <div key={f.title} className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-all">
                                    <div className="text-2xl mb-4">{f.icon}</div>
                                    <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                                    <p className="text-blue-100 text-sm font-light">{f.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </RevealSection>

            {/* ── HOW IT WORKS ─────────────────────────────────────── */}
            <section id="how-it-works" className="py-20 px-6 bg-slate-50">
                <RevealSection>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-display text-4xl text-slate-900 mb-3">
                            Up and running in <span className="italic text-blue-600">3 steps.</span>
                        </h2>
                        <p className="text-slate-500 mb-14 font-light">No setup. No complexity. Just open and start.[cite: 1]</p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { step: "01", title: "Create your account", desc: "Sign up for free in under 30 seconds. No credit card needed.[cite: 1]" },
                                { step: "02", title: "Add your subjects", desc: "Set up this semester's subjects and their grading components.[cite: 1]" },
                                { step: "03", title: "Track & achieve", desc: "Log tasks, input grades, and watch your academic progress unfold.[cite: 1]" },
                            ].map((item) => (
                                <div key={item.step} className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-sm">{item.step}</div>
                                    <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealSection>
            </section>

            {/* ── GRADES ───────────────────────────────────────────── */}
            <section id="grades" className="py-20 px-6">
                <RevealSection>
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mb-4">
                                Know exactly where you <span className="italic text-blue-600">stand.</span>
                            </h2>
                            <p className="text-slate-500 leading-relaxed mb-6 font-light max-w-md">
                                Stop guessing what grade you need on the finals. StudySync computes your weighted average per subject as you go — no surprises at end of semester.[cite: 1]
                            </p>
                            <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-sm">Track my grades →</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {GRADES.map((g) => (
                                <div key={g.subject} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all">
                                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${g.color}`}>
                                        <span className={`font-display text-sm ${g.textColor}`}>{g.grade}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800">{g.subject}</p>
                                        <p className="text-xs text-slate-400">{g.gwa}</p>
                                        <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                            <div className={`h-full ${g.barColor}`} style={{ width: `${g.pct}%` }} />
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{g.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealSection>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────────────── */}
            <section id="reviews" className="py-20 px-6 bg-blue-50">
                <RevealSection>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-display text-4xl text-center text-slate-900 mb-12">
                            What students are <span className="italic text-blue-600">saying.</span>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-5">
                            {TESTIMONIALS.map((t) => (
                                <div key={t.name} className="bg-white rounded-2xl p-6 border border-blue-100 hover:-translate-y-1 transition-all">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm italic mb-5 font-light">"{t.quote}"[cite: 1]</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{t.initials}</div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                                            <p className="text-xs text-slate-400">{t.school}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealSection>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────────── */}
            <RevealSection>
                <section className="py-24 px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-display text-5xl text-slate-900 mb-4">
                            Your best semester <span className="italic text-blue-600">starts today.</span>
                        </h2>
                        <p className="text-slate-500 mb-8 font-light text-lg">
                            Free to use. No credit card. Built for students, by a student.[cite: 1]
                        </p>
                        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-2xl shadow-md">Create your free account →</button>
                    </div>
                </section>
            </RevealSection>
            
            <Footer />
        </div>
    );
}