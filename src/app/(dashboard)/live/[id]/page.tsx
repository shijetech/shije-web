import LiveStreamPlayer from "@/components/classroom/LiveStreamPlayer";
import LiveChat from "@/components/classroom/LiveChat";

export default function LiveClassPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">Distributed Caching with Redis & Go</h1>
        <p className="text-sm text-slate-500">Live Cohort Session #{params.id} • Instructor: Marcus Vance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[650px]">
        <div className="lg:col-span-3 flex flex-col">
          <LiveStreamPlayer
            isLive={true}
            title="Distributed Caching with Redis & Go"
          />
        </div>
        <div className="lg:col-span-1 h-[650px]">
          <LiveChat classId={params.id} />
        </div>
      </div>
    </div>
  );
}
