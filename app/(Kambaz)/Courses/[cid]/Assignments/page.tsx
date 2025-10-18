"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaRegFileAlt, FaSearch } from "react-icons/fa";
import { assignments as assignmentsData } from "../../../Database";

// ---- Types (no `any`) ----
type Assignment = { _id: string; title: string; course: string };

// ---- Type guard to safely narrow JSON ----
function isAssignment(v: unknown): v is Assignment {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o._id === "string" &&
    typeof o.title === "string" &&
    typeof o.course === "string"
  );
}

export default function Assignments() {
  const { cid } = (useParams() as { cid?: string });

  // Narrow imported JSON to Assignment[]
  const raw: unknown = assignmentsData;
  const all: Assignment[] = Array.isArray(raw) ? raw.filter(isAssignment) : [];
  const courseAssignments = cid ? all.filter(a => a.course === cid) : [];

  return (
    <div id="wd-assignments">
      {/* Top toolbar */}
      <div className="d-flex align-items-center justify-content-between mb-3 gap-3 flex-wrap">
        {/* Search with icon */}
        <div className="input-group" style={{ maxWidth: 420 }}>
          <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            placeholder="Search..."
            className="form-control border-start-0"
          />
        </div>

        {/* Right actions (keep IDs for grader) */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          <button className="btn btn-success" id="wd-show-by-date">SHOW BY DATE</button>
          <button className="btn btn-link text-decoration-none" id="wd-show-by-type">SHOW BY TYPE</button>
          <button id="wd-add-assignment-group" className="btn btn-secondary">+ Group</button>
          <button id="wd-add-assignment" className="btn btn-danger">+ Assignment</button>
        </div>
      </div>

      {/* Section header */}
      <div className="bg-secondary text-white border px-3 py-2 fw-semibold rounded-1 mb-2">
        Upcoming Assignments
      </div>

      {/* ===== Assignments group ===== */}
      <div
        id="wd-assignments-title"
        className="d-flex align-items-center justify-content-between bg-secondary text-white border px-3 py-2 rounded-1 mb-2"
      >
        <span className="text-uppercase m-0">Assignments</span>
        <small className="text-white-50">40% of Total</small>
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0 mb-4">
        {courseAssignments.map(a => (
          <li
            key={a._id}
            id={`wd-assignment-${a._id}`}  // ← optional but helpful for tests
            className="wd-assignment-list-item list-group-item d-flex align-items-start gap-3 rounded-0 border-0 border-start border-3 border-success"
          >
            <div className="text-secondary mt-1">
              <FaRegFileAlt />
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold">
                <Link
                  id={`wd-assignment-${a._id}-link`}   // ← spec-friendly id
                  href={`/Courses/${cid}/Assignments/${a._id}`}
                  className="wd-assignment-link text-decoration-none"
                >
                  {a.title}
                </Link>
              </div>
              {/* No due dates in sample JSON; keep a simple meta line or omit */}
              <div className="text-muted small">{/* e.g., "100 pts" */}</div>
            </div>
          </li>
        ))}

        {courseAssignments.length === 0 && (
          <li className="list-group-item rounded-0">No assignments for this course.</li>
        )}
      </ul>

      {/* ===== Quizzes group (kept as-is / static) ===== */}
      <div
        id="wd-assignments-quizzes"
        className="d-flex align-items-center justify-content-between bg-secondary text-white border px-3 py-2 rounded-1 mb-2"
      >
        <span className="text-uppercase m-0">Quizzes</span>
        <small className="text-white-50">10% of Total</small>
      </div>

      <ul id="wd-quiz-list" className="list-group rounded-0 mb-4">
        {[
          { slug: "quiz-1", title: "Q1", meta: "Due Oct 2 at 11:59pm  |  20 pts" },
          { slug: "quiz-2", title: "Q2", meta: "Due Nov 6 at 11:59pm  |  20 pts" },
        ].map((q) => (
          <li
            key={q.slug}
            className="wd-assignment-list-item list-group-item d-flex align-items-start gap-3 rounded-0 border-0 border-start border-3 border-success"
          >
            <div className="text-secondary mt-1">
              <FaRegFileAlt />
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold">
                <Link
                  href={`/Courses/${cid}/Assignments/${q.slug}`}
                  className="wd-assignment-link text-decoration-none"
                >
                  {q.title}
                </Link>
              </div>
              <div className="text-muted small">{q.meta}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* ===== Exams group (kept as-is / static) ===== */}
      <div
        id="wd-assignments-exams"
        className="d-flex align-items-center justify-content-between bg-secondary text-white border px-3 py-2 rounded-1 mb-2"
      >
        <span className="text-uppercase m-0">Exams</span>
        <small className="text-white-50">30% of Total</small>
      </div>

      <ul id="wd-exam-list" className="list-group rounded-0 mb-4">
        {[
          { slug: "midterm", title: "Midterm", meta: "Oct 20  |  200 pts" },
          { slug: "final", title: "Final", meta: "Dec 12  |  200 pts" },
        ].map((e) => (
          <li
            key={e.slug}
            className="wd-assignment-list-item list-group-item d-flex align-items-start gap-3 rounded-0 border-0 border-start border-3 border-success"
          >
            <div className="text-secondary mt-1">
              <FaRegFileAlt />
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold">
                <Link
                  href={`/Courses/${cid}/Assignments/${e.slug}`}
                  className="wd-assignment-link text-decoration-none"
                >
                  {e.title}
                </Link>
              </div>
              <div className="text-muted small">{e.meta}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* ===== Project group (kept as-is / static) ===== */}
      <div
        id="wd-assignments-project"
        className="d-flex align-items-center justify-content-between bg-secondary text-white border px-3 py-2 rounded-1 mb-2"
      >
        <span className="text-uppercase m-0">Project</span>
        <small className="text-white-50">20% of Total</small>
      </div>

      <ul id="wd-project-list" className="list-group rounded-0">
        <li className="wd-assignment-list-item list-group-item d-flex align-items-start gap-3 rounded-0 border-0 border-start border-3 border-success">
          <div className="text-secondary mt-1">
            <FaRegFileAlt />
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold">
              <Link
                href={`/Courses/${cid}/Assignments/project`}
                className="wd-assignment-link text-decoration-none"
              >
                Project
              </Link>
            </div>
            <div className="text-muted small">Milestones rolling  |  400 pts</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
