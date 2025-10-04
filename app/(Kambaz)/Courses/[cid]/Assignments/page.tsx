"use client";
import { use } from "react";
import Link from "next/link";
import { FaRegFileAlt, FaSearch } from "react-icons/fa";

export default function Assignments({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = use(params);

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
        {[
          { slug: "0", title: "A0", meta: "Due Sep 5 at 11:59pm  |  100 pts" },
          { slug: "1", title: "A1", meta: "Due Sep 12 at 11:59pm  |  100 pts" },
          { slug: "2", title: "A2", meta: "Due Sep 19 at 11:59pm  |  100 pts" },
          { slug: "3", title: "A3", meta: "Due Sep 26 at 11:59pm  |  100 pts" },
          { slug: "4", title: "A4 ", meta: "Due Oct 3 at 11:59pm  |  100 pts" },
        ].map((a) => (
          <li
            key={a.slug}
            className="wd-assignment-list-item list-group-item d-flex align-items-start gap-3 rounded-0 border-0 border-start border-3 border-success"
          >
            <div className="text-secondary mt-1">
              <FaRegFileAlt />
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold">
                <Link
                  href={`/Courses/${cid}/Assignments/${a.slug}`}
                  className="wd-assignment-link text-decoration-none"
                >
                  {a.title}
                </Link>
              </div>
              <div className="text-muted small">{a.meta}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* ===== Quizzes group ===== */}
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

      {/* ===== Exams group ===== */}
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

      {/* ===== Project group ===== */}
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
