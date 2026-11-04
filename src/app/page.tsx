"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Brain, Zap, Target, Award, Compass } from "lucide-react";

export default function Home() {
  // Interactive Brilliant-style widget on landing page
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const sampleQuestion = {
    subject: "Physics • Mechanics & Gravitation",
    question:
      "A satellite is in an elliptical orbit around the Earth. As it travels from apogee (farthest point) to perigee (closest point), what happens to its angular momentum and kinetic energy?",
    options: [
      { id: "A", text: "Angular momentum remains constant, Kinetic energy increases", correct: true },
      { id: "B", text: "Both angular momentum and kinetic energy remain constant", correct: false },
      { id: "C", text: "Angular momentum increases, Kinetic energy remains constant", correct: false },
      { id: "D", text: "Both angular momentum and kinetic energy decrease", correct: false },
    ],
    explanation:
      "Because gravitational torque about the Earth's center is zero (τ = 0), angular momentum is strictly conserved (constant). As the satellite approaches perigee, gravitational potential energy converts into kinetic energy, causing its speed and KE to increase!",
  };

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    setShowExplanation(true);
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Interactive Learning For NEET UG 2026 / 2027</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
                Master NEET concepts. <br className="hidden sm:inline" />
                <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
                  Visually & Actively.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Passive video lectures don't build problem-solving intuition. Shije replaces rote memorization with guided interactive discovery in Physics, Chemistry, and Biology.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/batches"
                  className="px-8 py-4 rounded-2xl btn-tactile-green text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  Explore Batches <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tests"
                  className="px-8 py-4 rounded-2xl btn-tactile-white text-slate-800 font-bold text-sm flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-emerald-600" />
                  Try NEET CBT Tests
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-6 flex items-center gap-6 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> NTA Pattern Standard (+4 / -1)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Doctor & Master Faculty
                </span>
              </div>
            </div>

            {/* Right Interactive Brilliant-style Problem Widget */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                    {sampleQuestion.subject}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Sample Problem</span>
                </div>

                <p className="text-base font-bold text-slate-900 leading-snug mb-6">
                  {sampleQuestion.question}
                </p>

                {/* Option Buttons */}
                <div className="space-y-3">
                  {sampleQuestion.options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const isCorrect = opt.correct;
                    let styleClass = "option-card-brilliant bg-white";

                    if (isSelected) {
                      styleClass = isCorrect
                        ? "option-card-brilliant correct"
                        : "border-2 border-rose-300 bg-rose-50 border-b-4 border-b-rose-500";
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition cursor-pointer ${styleClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-slate-100 font-extrabold text-xs flex items-center justify-center text-slate-700">
                            {opt.id}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800">
                            {opt.text}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-xs font-bold">
                            {isCorrect ? "✓ Correct!" : "✕ Try Again"}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Immediate Explanation Drawer */}
                {showExplanation && (
                  <div className="mt-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1.5 animate-fadeIn">
                    <div className="font-extrabold flex items-center gap-1.5 text-emerald-800">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      Step-by-step Physics Logic:
                    </div>
                    <p className="leading-relaxed">{sampleQuestion.explanation}</p>
                    <button
                      onClick={() => { setSelectedOption(null); setShowExplanation(false); }}
                      className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 pt-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Question
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brilliant-style 3 Learning Pillars */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 mb-2 block">
              The Shije Way
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Designed for conceptual mastery.
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Every topic is engineered into bite-sized visual problems so you understand first principles instead of memorizing blindly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Visual Problem Solving</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Interact with physics simulations, dynamic chemical equilibrium curves, and biological cycles directly on screen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">NEET CBT Simulation</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Practice in official NTA examination conditions with countdown timers, sectional palettes, and accurate negative score penalties.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Daily Streaks & Consistency</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Stay accountable with daily problem quotas, streak tracking, and personalized weakness analytics from actual answer patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to start CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 inline-flex items-center justify-center mb-6">
            <Award className="w-6 h-6" />
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Ready to crack NEET 2026 / 2027?
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto mt-4 mb-8">
            Join the cohort today. Start solving interactive problems in Physics, Chemistry, Botany, and Zoology.
          </p>
          <Link
            href="/batches"
            className="inline-flex px-10 py-4 rounded-2xl btn-tactile-green text-white font-black text-sm uppercase tracking-wider shadow-lg"
          >
            Explore All Batches
          </Link>
        </div>
      </section>
    </div>
  );
}
