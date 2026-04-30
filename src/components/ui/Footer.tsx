import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="border-t border-slate-100 px-6 py-6">
                <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">
                            Study<span className="text-blue-600">Sync</span>
                        </span>
                    </div>
                    <p className="text-xs text-slate-400">© 2026 StudySync · Built with React + .NET Core</p>
                    <p className="text-xs text-slate-400">Made for Filipino students 🇵🇭</p>
                </div>
            </footer>
        </div>
    )
}
