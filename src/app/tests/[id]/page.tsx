"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { assessmentApi } from "@/lib/api";
import { Question, TestResult } from "@/types";
import { Clock, Award, ArrowLeft, CheckCircle2, RotateCcw, AlertTriangle, Zap } from "lucide-react";

export default function CBTTestPlayerPage() {
  const params = useParams();
  const testId = params.id as string;
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { option: string; marked: boolean }>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(180 * 60);
  const [attemptId, setAttemptId] = useState<string>("att-" + Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadTest() {
      try {
        const res = await assessmentApi.getQuestions(testId);
        setQuestions(res.questions || []);
      } catch (err) {
        console.error("Failed to load test questions", err);
      } finally {
        setLoading(false);
      }
    }
    loadTest();
  }, [testId]);

  useEffect(() => {
    if (isSubmitted || loading) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, loading]);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (option: string) => {
    if (!currentQ || isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        option,
        marked: prev[currentQ.id]?.marked || false,
      },
    }));
  };

  const handleToggleMarkReview = () => {
    if (!currentQ || isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        option: prev[currentQ.id]?.option || "",
        marked: !prev[currentQ.id]?.marked,
      },
    }));
  };

  const handleClearResponse = () => {
    if (!currentQ || isSubmitted) return;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = questions.map((q) => ({
        question_id: q.id,
        selected_option: answers[q.id]?.option || "",
        is_marked_for_review: answers[q.id]?.marked || false,
      }));

      const res = await assessmentApi.submitTest(testId, attemptId, formattedAnswers);
      setResult(res);
      setIsSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Failed to submit test");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return <div className="text-center py-24 text-slate-400 font-semibold">Preparing interactive problem workspace...</div>;
  }

  // Brilliant-style Result Summary
  if (isSubmitted && result) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          <div className="inline-flex p-4 rounded-3xl bg-emerald-50 text-emerald-600 mb-6">
            <Award className="w-12 h-12" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Test Completed!</h2>
          <p className="text-slate-600 mt-2 text-sm">
            NTA Scoring Applied: <strong className="text-emerald-600">+4.0</strong> for correct, <strong className="text-rose-600">-1.0</strong> for incorrect.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Score</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{result.total_score}</div>
              <span className="text-[11px] text-slate-500">Marks</span>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4">
              <span className="text-[10px] uppercase font-black text-emerald-600 tracking-wider">Correct</span>
              <div className="text-3xl font-black text-emerald-700 mt-1">{result.total_correct}</div>
              <span className="text-[11px] text-emerald-600">(+4 each)</span>
            </div>
            <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4">
              <span className="text-[10px] uppercase font-black text-rose-600 tracking-wider">Incorrect</span>
              <div className="text-3xl font-black text-rose-700 mt-1">{result.total_incorrect}</div>
              <span className="text-[11px] text-rose-600">(-1 each)</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Accuracy</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{result.accuracy_percentage.toFixed(0)}%</div>
              <span className="text-[11px] text-slate-500">Hit Rate</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/tests")}
              className="px-8 py-3.5 rounded-2xl btn-tactile-green text-white font-black text-xs uppercase tracking-wider"
            >
              Continue Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="bg-slate-900 text-white px-2.5 py-1 rounded-lg text-xs font-black tracking-wider uppercase">
            NEET CBT
          </span>
          <span className="font-bold text-sm text-slate-800">
            Problem {currentIdx + 1} of {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-xl font-mono text-sm font-extrabold text-slate-800 border border-slate-200">
            <Clock className="w-4 h-4 text-slate-500" />
            {formatTimer(timeLeftSeconds)}
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-5 py-2 rounded-xl btn-tactile-green text-white font-extrabold text-xs uppercase tracking-wider transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      </header>

      {/* Main Problem Space */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-7xl mx-auto w-full p-4 sm:p-6 gap-6">
        {/* Left Problem Box */}
        <div className="flex-1 bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          {currentQ ? (
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                <span className="font-extrabold text-slate-400 text-xs uppercase tracking-wider">
                  Question #{currentIdx + 1}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  <span className="text-emerald-600">+4.0</span> / <span className="text-rose-500">-1.0</span>
                </span>
              </div>

              <div className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed mb-8">
                {currentQ.question_text}
              </div>

              {/* Brilliant Tactile Option Cards */}
              <div className="space-y-3.5">
                {[
                  { key: "A", text: currentQ.option_a },
                  { key: "B", text: currentQ.option_b },
                  { key: "C", text: currentQ.option_c },
                  { key: "D", text: currentQ.option_d },
                ].map((opt) => {
                  const isSelected = answers[currentQ.id]?.option === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full text-left p-4 rounded-2xl flex items-center gap-3.5 transition cursor-pointer ${
                        isSelected
                          ? "option-card-brilliant selected"
                          : "option-card-brilliant bg-white"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition ${
                          isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>No questions available.</div>
          )}

          {/* Bottom Control Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkReview}
                className="px-4 py-2 border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl text-xs font-bold transition"
              >
                {answers[currentQ?.id]?.marked ? "Unmark Review" : "Mark Review"}
              </button>
              <button
                onClick={handleClearResponse}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 btn-tactile-white text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-6 py-2 btn-tactile-dark text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Next Problem →
              </button>
            </div>
          </div>
        </div>

        {/* Right Palette */}
        <div className="w-full md:w-72 bg-white rounded-3xl border-2 border-slate-200 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-4">
              Problem Navigator
            </h3>

            <div className="grid grid-cols-4 gap-2 max-h-[50vh] overflow-y-auto">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentIdx;
                let bg = "bg-slate-50 text-slate-600 border-slate-200";

                if (ans?.marked) {
                  bg = "bg-purple-600 text-white border-purple-700";
                } else if (ans?.option) {
                  bg = "bg-emerald-600 text-white border-emerald-700";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-11 rounded-xl border-2 text-xs font-black transition flex items-center justify-center ${bg} ${
                      isCurrent ? "ring-2 ring-slate-900 ring-offset-2" : ""
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl btn-tactile-green text-white font-black text-xs uppercase tracking-wider shadow-sm"
            >
              Submit Entire Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
