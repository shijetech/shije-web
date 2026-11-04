"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { Smartphone, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [debugOtp, setDebugOtp] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await authApi.sendOTP(phone);
      setOtpSent(true);
      if (res.debug_otp) {
        setDebugOtp(res.debug_otp);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await authApi.verifyOTP(phone, otp, studentName);
      localStorage.setItem("shije_token", res.token);
      localStorage.setItem("shije_user", JSON.stringify(res.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid OTP code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-sm text-center">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Enter Shije
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium mb-8">
          One-time password (OTP) verification for NEET Aspirants.
        </p>

        {error && (
          <div className="mb-6 rounded-2xl bg-rose-50 p-3.5 border border-rose-200 text-xs font-semibold text-rose-700 text-left">
            {error}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOTP} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Mobile Number
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Smartphone className="h-5 w-5 text-slate-400" />
                  <span className="ml-1.5 text-xs font-bold text-slate-700">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  className="block w-full pl-20 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-900 font-bold text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl btn-tactile-green text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Get Verification Code"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4 text-left">
            {debugOtp && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demo OTP: <strong>{debugOtp}</strong> (or 123456)</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Rahul Verma"
                className="block w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-900 font-medium text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                className="block w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 text-center tracking-[0.4em] text-2xl font-black text-slate-900 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl btn-tactile-green text-white font-black text-xs uppercase tracking-wider flex items-center justify-center shadow-sm disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Start Learning"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtp(""); }}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Change mobile number
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
