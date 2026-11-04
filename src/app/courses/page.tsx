import Link from "next/link";

const SAMPLE_COURSES = [
  {
    id: "1",
    title: "Full-Stack System Design Cohort",
    description: "Master distributed systems, databases, and microservices with live architecture reviews.",
    liveClassesCount: 16,
    recordingsCount: 32,
    instructorName: "Sarah Chen",
    slug: "system-design",
  },
  {
    id: "2",
    title: "Advanced Go & Cloud-Native Engineering",
    description: "Write high-throughput backend services in Go with gRPC, Docker, and Kubernetes.",
    liveClassesCount: 12,
    recordingsCount: 24,
    instructorName: "Marcus Vance",
    slug: "advanced-go",
  },
];

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Featured Courses</h1>
      <p className="mt-2 text-slate-600">Choose a course with live mentoring and full recording access.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_COURSES.map((course) => (
          <div key={course.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow transition">
            <h2 className="text-xl font-bold text-slate-900">{course.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{course.description}</p>
            <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">🔴 {course.liveClassesCount} Live Sessions</span>
              <span className="flex items-center gap-1">📹 {course.recordingsCount} Recordings</span>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs font-medium text-slate-500">Instructor: {course.instructorName}</span>
              <Link
                href={`/courses/${course.slug}`}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
