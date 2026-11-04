"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { assessmentApi } from "@/lib/api";
import { Test } from "@/types";
import { Award, Clock, Sparkles, ArrowRight, Target } from "lucide-react";

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTests() {
      try {
        const res = await assessmentApi.getTests();
        setTests(res.tests || []);
      } catch (err) {
        console.error("Failed to load tests", err);
      } finally {
        setLoading(false);
      }
    }
    loadTests();
  }, []);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="max-w-3xl mb-10 text-left">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Official NTA CBT Standard
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Interactive NEET CBT Tests
          </h1>
          <p className="mt-3 text-slate-600 text-base">
            Official NEET pattern: <strong className="text-emerald-700">+4.0 Marks</strong> for correct, <strong className="text-rose-600">-1.0 Mark</strong> for incorrect, and 0 for unattempted.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-24 text-slate-400 font-semibold">Loading practice challenges...</div>
        ) : tests.length === 0 ? (
          <div className="text-center py-24 text-slate-400 font-semibold">No active tests found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-white border-2 border-slate-200 hover:border-slate-300 rounded-3xl p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-800">
                      {test.test_type.replace("_", " ").toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      ● Active Window
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {test.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400" /> {test.duration_minutes} Mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-500" /> {test.total_marks} Marks
                    </span>
                    <span>{test.question_count} Questions</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-slate-900">
                      <Target className="w-3.5 h-3.5 text-emerald-600" /> Scoring Policy
                    </div>
                    <p className="text-slate-600">
                      +4.0 for correct responses, -1.0 negative penalty for incorrect. Detailed step-by-step logic unlocked upon submission.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    Auto-save on network drop
                  </span>
                  <Link
                    href={`/tests/${test.id}`}
                    className="px-6 py-3 rounded-2xl btn-tactile-green text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
                  >
                    Solve Test <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
