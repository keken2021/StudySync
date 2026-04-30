import type { NavItem, Stat, Feature, GradeItem, Testimonial } from "@/types/LandingTypes";

export const NAV_ITEMS: NavItem[] = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Grades", href: "#grades" },
    { label: "Reviews", href: "#reviews" },
];

export const STATS: Stat[] = [
    { value: "2,400+", label: "Active students" },
    { value: "18k", label: "Tasks completed" },
    { value: "4.9 ★", label: "Student rating" },
];

export const FEATURES: Feature[] = [
    {
        icon: "📋",
        title: "Task Tracking",
        description:
            "Add assignments, exams, quizzes, and projects. Filter by subject or due date. Never miss a deadline again.",
    },
    {
        icon: "📊",
        title: "Grade Monitoring",
        description:
            "Input scores per component with weights. See your running weighted average and projected final grade instantly.",
    },
    {
        icon: "🗂️",
        title: "Subject Dashboard",
        description:
            "Organize everything by subject and semester. Each subject gets its own space for tasks, grades, and progress.",
    },
    {
        icon: "⏰",
        title: "Upcoming Alerts",
        description:
            "A smart 7-day view surfaces what's due next so you always know what to prioritize today.",
    },
    {
        icon: "✅",
        title: "One-tap Completion",
        description:
            "Mark tasks done in one click. Watch your weekly progress bar climb. Small wins drive big momentum.",
    },
    {
        icon: "🔒",
        title: "Secure & Private",
        description:
            "Your academic data belongs to you. JWT-secured login means only you can access your tasks and grades.",
    },
];

export const GRADES: GradeItem[] = [
    {
        subject: "Mathematics 101",
        grade: "1.25",
        gwa: "Excellent",
        pct: 92,
        color: "bg-blue-50",
        textColor: "text-blue-700",
        barColor: "bg-blue-500",
    },
    {
        subject: "Application Development",
        grade: "1.75",
        gwa: "Very Good",
        pct: 78,
        color: "bg-blue-50",
        textColor: "text-blue-600",
        barColor: "bg-blue-400",
    },
    {
        subject: "Rizal Course",
        grade: "2.25",
        gwa: "Good",
        pct: 65,
        color: "bg-slate-50",
        textColor: "text-slate-600",
        barColor: "bg-slate-400",
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        initials: "MR",
        name: "Maria Reyes",
        school: "BS Nursing, UST",
        quote:
            "Before StudySync I kept missing quizzes. Now I open the app every morning and my day is already planned. It changed how I study completely.",
    },
    {
        initials: "JV",
        name: "Joshua Villanueva",
        school: "BSIT, Mapúa",
        quote:
            "The grade tracker is my favorite part. I input my scores after every quiz and it tells me exactly what I need to pass. Super helpful during finals.",
    },
    {
        initials: "AC",
        name: "Ana Cruz",
        school: "BSBA, PLM",
        quote:
            "As a working student, time is everything. StudySync helps me balance shifts and schoolwork without feeling overwhelmed.",
    },
];

export const MOCK_TASKS = [
    { done: true, title: "Lab report — Chemistry", sub: "Submitted", badge: "Homework", badgeCls: "bg-blue-100 text-blue-700" },
    { done: false, title: "Long exam — Math 101", sub: "Due tomorrow", badge: "Exam", badgeCls: "bg-red-100 text-red-700" },
    { done: false, title: "Capstone proposal draft", sub: "Due in 3 days", badge: "Project", badgeCls: "bg-violet-100 text-violet-700" },
    { done: false, title: "Reading quiz — Rizal", sub: "Due in 5 days", badge: "Quiz", badgeCls: "bg-amber-100 text-amber-700" },
];