"use client";

import { useEffect, useState } from "react";
import { catalogueApi } from "@/lib/api";
import { Batch, Product } from "@/types";
import { CheckCircle2, Calendar, Clock, Sparkles, BookOpen, Compass, ArrowRight } from "lucide-react";

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [targetYear, setTargetYear] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [batchRes, prodRes] = await Promise.all([
          catalogueApi.getBatches(targetYear, category),
          catalogueApi.getProducts(),
        ]);
        setBatches(batchRes.batches || []);
        setProducts(prodRes.products || []);
      } catch (err) {
        console.error("Failed to load catalogue:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [targetYear, category]);

  const handleEnroll = async (productId: string) => {
    setOrdering(productId);
    setSuccessMsg(null);
    try {
      await catalogueApi.createOrder(productId);
      setSuccessMsg("Order created! Your entitlement for this batch has been activated.");
    } catch (err: any) {
      alert(err.message || "Please sign in with your mobile OTP to enroll.");
    } finally {
      setOrdering(null);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mb-10 text-left">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Learning Pathways
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Explore NEET Batches
          </h1>
          <p className="mt-3 text-slate-600 text-base">
            Structured curriculum designed for conceptual clarity, daily problem solving (DPPs), and computer-based mock tests.
          </p>
        </div>

        {/* Filter Pills (Brilliant style) */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-slate-100">
          <span className="text-xs font-bold uppercase text-slate-400 mr-2">Target Year:</span>
          <button
            onClick={() => setTargetYear(undefined)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              !targetYear ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Years
          </button>
          <button
            onClick={() => setTargetYear(2026)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              targetYear === 2026 ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            NEET 2026
          </button>
          <button
            onClick={() => setTargetYear(2027)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              targetYear === 2027 ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            NEET 2027
          </button>

          <span className="text-xs font-bold uppercase text-slate-400 ml-4 mr-2">Category:</span>
          <button
            onClick={() => setCategory(undefined)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              !category ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Cohorts
          </button>
          <button
            onClick={() => setCategory("dropper")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              category === "dropper" ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Dropper / Repeater
          </button>
          <button
            onClick={() => setCategory("class_11")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              category === "class_11" ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Class 11
          </button>
        </div>

        {successMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            {successMsg}
          </div>
        )}

        {/* Batches Grid */}
        {loading ? (
          <div className="text-center py-24 text-slate-400 font-semibold">Loading pathways...</div>
        ) : batches.length === 0 ? (
          <div className="text-center py-24 text-slate-400 font-semibold">No batches match your selected criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {batches.map((batch) => {
              const product = products[0];
              return (
                <div
                  key={batch.id}
                  className="bg-white rounded-3xl border-2 border-slate-200 hover:border-slate-300 transition overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-slate-800">
                        NEET {batch.target_year} • {batch.category.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        ● Open for Enrollment
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {batch.name}
                    </h3>

                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-slate-400" /> Start: {batch.start_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-slate-400" /> Session End: {batch.end_date}
                      </span>
                    </div>

                    {/* Subjects */}
                    <div className="mb-6">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                        Complete Subject Modules:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {batch.subjects?.map((sub) => (
                          <span
                            key={sub.id}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        Live Interactive Classes with Real-time Doubt Resolution
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        Full HD Recordings with resume playback & timestamps
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        Daily Practice Problems (DPPs) & Handwritten Faculty Notes
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        NEET Computer-Based Test (CBT) Series with Solution Analysis
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">Tuition Fee</span>
                      <div className="text-3xl font-black text-slate-900">
                        ₹{product?.price || 4999}
                        <span className="text-xs text-slate-500 font-normal ml-1">/ one-time</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnroll(product?.id || "prod-neet-2026-complete")}
                      disabled={ordering === product?.id}
                      className="px-8 py-3.5 rounded-2xl btn-tactile-green text-white font-extrabold text-xs uppercase tracking-wider shadow-sm disabled:opacity-50"
                    >
                      {ordering === product?.id ? "Processing..." : "Enroll in Batch"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
