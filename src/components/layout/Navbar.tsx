"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { Flame, Compass, BookOpen, Target, LogOut, Sparkles } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("shije_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shije_token");
    localStorage.removeItem("shije_user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition">
              SHIJE
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-bold text-slate-700">
            <Link
              href="/batches"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-slate-500" /> Explore Batches
            </Link>
            <Link
              href="/tests"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" /> Interactive CBT Tests
            </Link>
            <Link
              href="/dashboard"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-slate-500" /> Live Classroom
            </Link>
          </nav>
        </div>

        {/* Right Section (Streak & Profile / Sign In) */}
        <div className="flex items-center gap-3">
          {/* Brilliant Style Streak Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold shadow-sm">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>3 Day Streak</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>NEET 2026</span>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl btn-tactile-dark text-white text-xs font-bold uppercase tracking-wider"
              >
                My Learning
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-600 transition rounded-xl hover:bg-slate-100"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl btn-tactile-white text-slate-700 text-xs font-bold"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl btn-tactile-green text-white text-xs font-extrabold uppercase tracking-wider shadow-sm"
              >
                Start Solving
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
