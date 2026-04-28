import { getCurrentUser } from '@/api/authApi';
import type { UserResponseDTO } from '@/types/AuthTypes';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ClipboardList, BarChart2, TrendingUp } from 'lucide-react';
import { Main } from './Main';

export default function DashboardPage() {
    const [user, setUser] = useState<UserResponseDTO | null>(null);

    useEffect(() => {
        getCurrentUser().then(data => {
            if (data) setUser(data);
        });
    }, []);

    if (!user) {
        return (
            <Main>
                <div className="flex items-center justify-center h-full min-h-screen">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                        Loading…
                    </div>
                </div>
            </Main>
        );
    }

    const stats = [
        { label: "Subjects Enrolled", value: "—", icon: BookOpen, note: "this semester" },
        { label: "Pending Tasks", value: "—", icon: ClipboardList, note: "due soon" },
        { label: "Completed Tasks", value: "—", icon: TrendingUp, note: "all time" },
        { label: "Current GPA", value: "—", icon: BarChart2, note: "estimated" },
    ];

    return (
        <Main>
            <div className="px-8 py-8 max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Overview</p>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Good day, {user.name.split(" ")[0]} 👋
                    </h1>
                    <p className="text-slate-500 text-sm">{user.school}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map(({ label, value, icon: Icon, note }) => (
                        <Card key={label} className="bg-white border border-slate-200 shadow-none rounded-xl">
                            <CardContent className="p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500">{label}</span>
                                    <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <Icon className="h-3.5 w-3.5 text-slate-600" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{note}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Profile Card */}
                <Card className="bg-white border border-slate-200 shadow-none rounded-xl">
                    <CardContent className="p-6">
                        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">Account</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { label: "Full Name", value: user.name },
                                { label: "Email", value: user.email },
                                { label: "School", value: user.school },
                            ].map(({ label, value }) => (
                                <div key={label} className="space-y-1">
                                    <p className="text-xs text-slate-400 font-medium">{label}</p>
                                    <p className="text-sm font-semibold text-slate-800">{value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </Main>
    );
}