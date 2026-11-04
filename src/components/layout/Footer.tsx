export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container mx-auto px-4 text-center text-sm text-slate-500">
        <p className="font-semibold text-slate-700">Shije Education Platform</p>
        <p className="mt-1">High-impact live cohorts and on-demand lecture recordings.</p>
        <p className="mt-4 text-xs text-slate-400">&copy; {new Date().getFullYear()} Shije. All rights reserved.</p>
      </div>
    </footer>
  );
}
